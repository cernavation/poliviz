import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9222;
const APP_URL = "http://localhost:3005";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.callbacks = new Map();

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
  }

  async ready() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    return new Promise((resolve) => {
      this.ws.onopen = () => resolve();
    });
  }

  async send(method, params = {}) {
    await this.ready();
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function main() {
  console.log("🚀 Launching Headless Chrome...");

  const userDataDir = path.resolve("./.chrome-profile-cdp");
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  const chrome = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      "--disable-gpu",
      "--no-sandbox",
      `--user-data-dir=${userDataDir}`,
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  let versionData = null;
  for (let i = 0; i < 25; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        versionData = await res.json();
        break;
      }
    } catch {
      await sleep(250);
    }
  }

  if (!versionData) {
    chrome.kill();
    throw new Error("Could not connect to Chrome debugging port");
  }

  console.log("Connected to Chrome:", versionData.Browser);

  const listRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const targets = await listRes.json();
  const pageTarget = targets.find((t) => t.type === "page") || targets[0];
  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);

  try {
    await client.ready();
    console.log("CDP WebSocket connected");

    await client.send("Page.enable");
    await client.send("DOM.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // 1. Initial Riddle Screen
    console.log("Navigating to page with ?intro=1...");
    await client.send("Page.navigate", { url: `${APP_URL}/?intro=1` });
    await sleep(2000);

    console.log("Capturing 1: Riddle screen...");
    const riddleScreenshot = await client.send("Page.captureScreenshot", {
      format: "png",
    });
    fs.writeFileSync(
      "screenshot-riddle.png",
      Buffer.from(riddleScreenshot.data, "base64")
    );
    console.log("Saved screenshot-riddle.png");

    // 2. Submit wrong answers to show hints 1 and 2
    console.log("Submitting wrong answers to test hints...");
    await client.send("Runtime.evaluate", {
      expression: `
        function triggerInput(val) {
          const input = document.querySelector('input[placeholder="Введите ответ..."]');
          const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeSetter.call(input, val);
          input.dispatchEvent(new Event('input', { bubbles: true }));
          const btn = document.querySelector('button[type="submit"]');
          btn.click();
        }
        for (let i = 0; i < 6; i++) {
          triggerInput("ошибка " + i);
        }
      `,
    });
    await sleep(1000);

    const hintsScreenshot = await client.send("Page.captureScreenshot", {
      format: "png",
    });
    fs.writeFileSync(
      "screenshot-hints.png",
      Buffer.from(hintsScreenshot.data, "base64")
    );
    console.log("Saved screenshot-hints.png with hints 1 and 2");

    // 3. Enter correct answer: "алексей церна"
    console.log("Entering correct answer: 'алексей церна'...");
    await client.send("Runtime.evaluate", {
      expression: `
        const input = document.querySelector('input[placeholder="Введите ответ..."]');
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeSetter.call(input, "алексей церна");
        input.dispatchEvent(new Event('input', { bubbles: true }));
        const btn = document.querySelector('button[type="submit"]');
        btn.click();
      `,
    });
    await sleep(1500);

    // Capture Success / Fireworks Screen
    console.log("Capturing 2: Success & fireworks screen...");
    const successScreenshot = await client.send("Page.captureScreenshot", {
      format: "png",
    });
    fs.writeFileSync(
      "screenshot-success.png",
      Buffer.from(successScreenshot.data, "base64")
    );
    console.log("Saved screenshot-success.png");

    // 4. Test clicking "Заценить результат!"
    console.log("Clicking 'Заценить результат!'...");
    await client.send("Runtime.evaluate", {
      expression: `
        const btn = document.evaluate("//button[contains(., 'Заценить результат')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (btn) btn.click();
      `,
    });
    await sleep(1000);

    // Capture Video Stage
    const videoScreenshot = await client.send("Page.captureScreenshot", {
      format: "png",
    });
    fs.writeFileSync(
      "screenshot-video.png",
      Buffer.from(videoScreenshot.data, "base64")
    );
    console.log("Saved screenshot-video.png");

    // 5. Complete intro and inspect Header at 1440px
    console.log("Completing intro to inspect header...");
    await client.send("Runtime.evaluate", {
      expression: `
        sessionStorage.setItem("poliviz_birthday_completed", "true");
        location.href = "${APP_URL}";
      `,
    });
    await sleep(2500);

    // Capture Header at 1440px
    console.log("Capturing Header at 1440px...");
    const headerScreenshot = await client.send("Page.captureScreenshot", {
      format: "png",
      clip: {
        x: 0,
        y: 0,
        width: 1440,
        height: 250,
        scale: 1,
      },
    });
    fs.writeFileSync(
      "screenshot-header.png",
      Buffer.from(headerScreenshot.data, "base64")
    );
    console.log("Saved screenshot-header.png");
  } finally {
    client.close();
    chrome.kill();
  }

  console.log("🎉 All visual captures completed successfully!");
}

main().catch((err) => {
  console.error("Error running visual captures:", err);
  process.exit(1);
});
