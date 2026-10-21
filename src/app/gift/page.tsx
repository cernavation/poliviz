"use client";

import React, { useState, useEffect, useRef } from "react";

interface ProjectItem {
  id: number;
  title: string;
  date: string;
  completed: boolean;
}

const STORAGE_KEY = "cernavation_gift_certificate_v1";

const DEFAULT_PROJECTS: ProjectItem[] = [
  { id: 1, title: "Редизайн каталога продукции Poliviz", date: "", completed: false },
  { id: 2, title: "Фирменная упаковка для премиальной серии", date: "", completed: false },
  { id: 3, title: "Серия рекламных плакатов и выставочных баннеров", date: "", completed: false },
  { id: 4, title: "Праздничный мерч и сувенирная полиграфия", date: "", completed: false },
  { id: 5, title: "Новый корпоративный буклет о компании", date: "", completed: false },
  { id: 6, title: "Концепт нового продукта (свободная тема)", date: "", completed: false },
  { id: 7, title: "Дизайн календарей и ежедневников на следующий год", date: "", completed: false },
  { id: 8, title: "Оформление нового офиса / шоурума", date: "", completed: false },
  { id: 9, title: "Дизайн-проект по личному выбору папы", date: "", completed: false },
  { id: 10, title: "Супер-секретный спецпроект №10", date: "", completed: false },
];

export default function GiftCertificatePage() {
  const [projects, setProjects] = useState<ProjectItem[]>(DEFAULT_PROJECTS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Sound generator using Web Audio API for authentic Win95 chime
  const playWin95Chime = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Authentic Win95 chord / cheerful chime: C5, E5, G5, C6
      const notes = [
        { freq: 523.25, time: 0.0, dur: 0.16 }, // C5
        { freq: 659.25, time: 0.08, dur: 0.18 }, // E5
        { freq: 783.99, time: 0.16, dur: 0.22 }, // G5
        { freq: 1046.5, time: 0.24, dur: 0.45 }, // C6
      ];

      notes.forEach(({ freq, time, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.exponentialRampToValueAtTime(0.2, now + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + time);
        osc.stop(now + time + dur);
      });
    } catch {
      // AudioContext unavailable or blocked — ignore silently
    }
  };

  // Click beep for checkboxes & button presses
  const playTickSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // ignore
    }
  };

  // Complete isolation: Hide main site Header & Footer while on /gift
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "cernavation_gift_certificate.exe — Сертификат Папе";

    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const prevHeaderDisplay = header?.style.display;
    const prevFooterDisplay = footer?.style.display;

    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";

    return () => {
      document.title = originalTitle;
      if (header) header.style.display = prevHeaderDisplay ?? "";
      if (footer) footer.style.display = prevFooterDisplay ?? "";
    };
  }, []);

  // Real-time clock for Win95 taskbar
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(
        d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load saved projects from localStorage on mount (hydration-safe)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const loadedProjects = DEFAULT_PROJECTS.map((def, idx) => {
            const item = parsed[idx];
            if (!item) return def;
            return {
              id: def.id,
              title: typeof item.title === "string" ? item.title : def.title,
              date: typeof item.date === "string" ? item.date : "",
              completed: Boolean(item.completed),
            };
          });
          setProjects(loadedProjects);
        }
      }
    } catch (e) {
      console.warn("Could not load certificate projects from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  // Update a single project and auto-save immediately to localStorage
  const updateProject = (index: number, patch: Partial<ProjectItem>) => {
    setProjects((prev) => {
      const next = prev.map((item, i) => (i === index ? { ...item, ...patch } : item));
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (e) {
          console.warn("Could not auto-save to localStorage", e);
        }
      }
      return next;
    });
  };

  // Auto-sync to localStorage whenever projects change (after initial hydration load)
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.warn("Could not sync projects to localStorage", e);
    }
  }, [projects, isLoaded]);

  // Manual save handler for the 3D button
  const handleSaveCertificate = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      const now = new Date();
      setLastSavedTime(
        now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
    playWin95Chime();
    setShowSuccessModal(true);
  };

  // Reset to default 10 projects
  const handleReset = () => {
    if (window.confirm("Вернуть 10 исходных шаблонов проектов? Все изменения будут сброшены.")) {
      setProjects(DEFAULT_PROJECTS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      } catch (e) {
        console.warn("Reset error:", e);
      }
      playTickSound();
    }
  };

  // Print certificate
  const handlePrint = () => {
    window.print();
  };

  const completedCount = projects.filter((p) => p.completed).length;
  const progressPercent = Math.round((completedCount / 10) * 100);

  return (
    <div
      id="gift-standalone-root"
      className="min-h-screen w-full overflow-y-auto pb-20 select-none bg-[#008080] flex flex-col font-sans text-[#121212] relative z-[99999]"
      style={{
        imageRendering: "pixelated",
      }}
      onClick={() => {
        if (startMenuOpen) setStartMenuOpen(false);
      }}
    >
      {/* ─── DESKTOP WORKSPACE (Natural scroll on all screens) ─── */}
      <div className="w-full p-3 md:p-6 lg:p-8 flex flex-col items-center justify-start relative">
        {/* Decorative Desktop Icons (Win95 style, top-left) */}
        <div className="absolute top-4 left-4 hidden xl:flex flex-col gap-6 z-0 pointer-events-auto">
          {/* My Computer */}
          <button
            type="button"
            onClick={() => setInfoModalOpen(true)}
            className="group flex flex-col items-center w-20 text-center cursor-pointer p-1 rounded-none hover:bg-[#000080]/30 focus:bg-[#000080] focus:text-white"
          >
            <div className="w-10 h-10 mb-1 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-8 h-8 drop-shadow">
                <rect x="3" y="3" width="26" height="20" fill="#dfdfdf" stroke="#121212" strokeWidth="2" />
                <rect x="6" y="6" width="20" height="14" fill="#008080" />
                <rect x="12" y="23" width="8" height="4" fill="#dfdfdf" stroke="#121212" strokeWidth="1.5" />
                <rect x="8" y="27" width="16" height="2" fill="#dfdfdf" stroke="#121212" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="text-white text-xs font-mono drop-shadow-[1px_1px_1px_rgba(0,0,0,0.9)] px-1 leading-tight">
              Мой компьютер
            </span>
          </button>

          {/* Network */}
          <button
            type="button"
            onClick={() => setInfoModalOpen(true)}
            className="group flex flex-col items-center w-20 text-center cursor-pointer p-1 rounded-none hover:bg-[#000080]/30 focus:bg-[#000080] focus:text-white"
          >
            <div className="w-10 h-10 mb-1 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-8 h-8 drop-shadow">
                <rect x="4" y="4" width="14" height="10" fill="#dfdfdf" stroke="#121212" strokeWidth="1.5" />
                <rect x="14" y="16" width="14" height="10" fill="#dfdfdf" stroke="#121212" strokeWidth="1.5" />
                <line x1="11" y1="14" x2="11" y2="21" stroke="#121212" strokeWidth="2" />
                <line x1="11" y1="21" x2="21" y2="21" stroke="#121212" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-white text-xs font-mono drop-shadow-[1px_1px_1px_rgba(0,0,0,0.9)] px-1 leading-tight">
              Сетевое окружение
            </span>
          </button>

          {/* Trash */}
          <button
            type="button"
            onClick={handleReset}
            className="group flex flex-col items-center w-20 text-center cursor-pointer p-1 rounded-none hover:bg-[#000080]/30 focus:bg-[#000080] focus:text-white"
            title="Очистить и сбросить сертификат к исходным"
          >
            <div className="w-10 h-10 mb-1 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-8 h-8 drop-shadow">
                <path d="M7 9 L10 27 L22 27 L25 9 Z" fill="#dfdfdf" stroke="#121212" strokeWidth="1.5" />
                <line x1="5" y1="9" x2="27" y2="9" stroke="#121212" strokeWidth="2" />
                <line x1="12" y1="6" x2="20" y2="6" stroke="#121212" strokeWidth="2" />
                <line x1="12" y1="13" x2="12" y2="23" stroke="#808080" strokeWidth="1.5" />
                <line x1="16" y1="13" x2="16" y2="23" stroke="#808080" strokeWidth="1.5" />
                <line x1="20" y1="13" x2="20" y2="23" stroke="#808080" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="text-white text-xs font-mono drop-shadow-[1px_1px_1px_rgba(0,0,0,0.9)] px-1 leading-tight">
              Корзина
            </span>
          </button>

          {/* Poliviz typography link */}
          <a
            href="/"
            className="group flex flex-col items-center w-20 text-center cursor-pointer p-1 rounded-none hover:bg-[#000080]/30 focus:bg-[#000080] focus:text-white"
          >
            <div className="w-10 h-10 mb-1 flex items-center justify-center bg-[#D6307F] border-2 border-t-white border-l-white border-b-[#8a1a4f] border-r-[#8a1a4f] text-white font-bold text-xs">
              PVZ
            </div>
            <span className="text-white text-xs font-mono drop-shadow-[1px_1px_1px_rgba(0,0,0,0.9)] px-1 leading-tight">
              Poliviz.md
            </span>
          </a>
        </div>

        {/* ─── AUTHENTIC WIN95 SYSTEM WINDOW ─── */}
        {!isMinimized && (
          <div
            className={`relative z-10 w-full transition-all duration-150 my-auto ${
              isMaximized ? "max-w-none w-full" : "max-w-4xl"
            } bg-[#dfdfdf] border-2 border-t-white border-l-white border-b-[#000000] border-r-[#000000] shadow-[3px_3px_0px_rgba(0,0,0,0.5)]`}
          >
            {/* ── WINDOW TITLE BAR ── */}
            <div className="bg-[#121212] border-b-2 border-[#D6307F] px-2.5 py-1.5 flex items-center justify-between select-none">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                {/* Certificate Icon */}
                <span className="w-4 h-4 bg-[#D6307F] border border-white/50 flex-shrink-0 flex items-center justify-center text-[10px] text-white font-bold leading-none">
                  ★
                </span>
                <span className="text-white font-mono font-bold text-xs sm:text-sm tracking-wide truncate">
                  cernavation_gift_certificate.exe
                </span>
              </div>

              {/* Control Buttons [_][□][X] */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  aria-label="Свернуть"
                  className="w-5 h-5 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white text-black text-xs font-bold flex items-center justify-center leading-none active:translate-y-[1px]"
                  title="Свернуть в панель задач"
                >
                  _
                </button>

                {/* Maximize / Restore Button */}
                <button
                  type="button"
                  onClick={() => setIsMaximized(!isMaximized)}
                  aria-label="Развернуть"
                  className="w-5 h-5 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white text-black text-xs font-bold flex items-center justify-center leading-none active:translate-y-[1px]"
                  title={isMaximized ? "Восстановить размер" : "Развернуть на весь экран"}
                >
                  □
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Закрыть сертификат и перейти на главный сайт типографии?")) {
                      window.location.href = "/";
                    }
                  }}
                  aria-label="Закрыть"
                  className="w-5 h-5 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white text-black text-xs font-bold flex items-center justify-center leading-none active:translate-y-[1px]"
                  title="Выход"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ── WINDOW MENU BAR (Classic Win95 File/Edit/Help) ── */}
            <div className="bg-[#dfdfdf] border-b border-[#808080] px-2 py-0.5 flex gap-4 text-xs font-mono text-[#121212] select-none">
              <span className="hover:bg-[#000080] hover:text-white px-1.5 py-0.5 cursor-pointer" onClick={handleSaveCertificate}>
                <span className="underline">Ф</span>айл (Сохранить)
              </span>
              <span className="hover:bg-[#000080] hover:text-white px-1.5 py-0.5 cursor-pointer" onClick={handlePrint}>
                <span className="underline">П</span>ечать
              </span>
              <span className="hover:bg-[#000080] hover:text-white px-1.5 py-0.5 cursor-pointer" onClick={handleReset}>
                <span className="underline">С</span>брос
              </span>
              <span className="hover:bg-[#000080] hover:text-white px-1.5 py-0.5 cursor-pointer" onClick={() => setInfoModalOpen(true)}>
                <span className="underline">С</span>правка
              </span>
            </div>

            {/* ── WINDOW BODY / CERTIFICATE DOCUMENT (Warm Paper Substrate #E6E2D8) ── */}
            <div className="p-3 sm:p-5 md:p-8 bg-[#E6E2D8] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white select-text relative">
              {/* Corner Registration Crosshairs (Print Press aesthetic) */}
              <div className="absolute top-2 left-2 text-[#808080] font-mono text-[10px] pointer-events-none select-none">
                ⊕ CZ-001
              </div>
              <div className="absolute top-2 right-2 text-[#808080] font-mono text-[10px] pointer-events-none select-none">
                CMYK ⊕
              </div>

              {/* ── CERTIFICATE HEADER ── */}
              <div className="text-center pb-5 mb-5 border-b-2 border-dashed border-[#808080] relative">
                {/* Official Series Badge */}
                <div className="inline-flex items-center gap-1.5 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] px-3 py-1 mb-3 text-[11px] font-mono font-bold text-[#121212]">
                  <span className="w-2 h-2 rounded-full bg-[#D6307F] inline-block animate-pulse" />
                  <span>СЕРИЯ: CZ-2026-VIP</span>
                  <span className="text-[#808080]">|</span>
                  <span>БЕССРОЧНЫЙ</span>
                  <span className="text-[#808080]">|</span>
                  <span>ЭКЗЕМПЛЯР #001</span>
                </div>

                {/* Main Large Retro Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#121212] tracking-tight uppercase leading-none font-sans drop-shadow-[1px_1px_0px_#fff]">
                  С ДНЁМ РОЖДЕНИЯ, ПАП!
                </h1>

                {/* Subtitle / Signature */}
                <p className="mt-2 text-sm sm:text-base md:text-lg font-bold text-[#D6307F] font-mono tracking-tight max-w-2xl mx-auto">
                  Официальный именной сертификат на 10 дизайнерских проектов от Лехи Церна
                </p>

                {/* Short commemorative memo */}
                <p className="mt-2 text-xs sm:text-sm text-[#4a4a4a] max-w-xl mx-auto leading-relaxed">
                  Предъявитель сего документа имеет безусловное право на реализацию любых 10 дизайнерских
                  и полиграфических задач. Без ограничений по срокам, правкам и сложности.
                </p>

                {/* CMYK Color Check Bar */}
                <div className="flex h-1.5 w-36 mx-auto mt-3 overflow-hidden border border-[#808080]">
                  <span className="flex-1 bg-[#00A3E0]" title="Cyan" />
                  <span className="flex-1 bg-[#D6307F]" title="Magenta" />
                  <span className="flex-1 bg-[#FFD400]" title="Yellow" />
                  <span className="flex-1 bg-[#121212]" title="Black" />
                </div>
              </div>

              {/* ── PROGRESS & COUNTER BAR (Win95 Segmented Block Progress) ── */}
              <div className="mb-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] p-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#121212]">
                  <span>ПРОГРЕСС ВЫПОЛНЕНИЯ:</span>
                  <span className="bg-white px-2 py-0.5 border border-t-[#808080] border-l-[#808080] border-b-white border-r-white text-[#D6307F]">
                    {completedCount} из 10 ({progressPercent}%)
                  </span>
                </div>

                {/* Segmented Progress Blocks */}
                <div className="flex gap-[3px] bg-white border border-t-[#808080] border-l-[#808080] border-b-white border-r-white p-1 w-full sm:w-64 h-6">
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const isDone = idx < completedCount;
                    return (
                      <div
                        key={idx}
                        className={`flex-1 transition-all ${
                          isDone
                            ? "bg-[#000080] border-r border-[#808080]"
                            : "bg-[#e8e8e8]"
                        }`}
                        title={`Проект #${idx + 1}: ${isDone ? "Выполнено" : "В работе"}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* ── MAIN PART: TABLE OF EXACTLY 10 INTERACTIVE ROWS ── */}
              <div className="space-y-2.5">
                {/* Table Header (Visible on tablets and desktops) */}
                <div className="hidden md:grid grid-cols-[48px_1fr_170px_160px] gap-2 px-2 py-1 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[11px] font-mono font-bold text-[#121212]">
                  <div className="text-center">№</div>
                  <div>НАЗВАНИЕ ПРОЕКТА / ИДЕЯ ПАПЫ</div>
                  <div className="text-center">ДАТА РЕАЛИЗАЦИИ</div>
                  <div className="text-center">СТАТУС ГОТОВНОСТИ</div>
                </div>

                {/* 10 Rows */}
                {projects.map((project, index) => {
                  const numStr = String(project.id).padStart(2, "0");
                  const isDone = project.completed;

                  return (
                    <div
                      key={project.id}
                      className={`grid grid-cols-1 md:grid-cols-[48px_1fr_170px_160px] items-center gap-2 p-2 sm:p-2.5 border transition-colors ${
                        isDone
                          ? "bg-[#f0f4ee] border-[#a0c0a0]"
                          : "bg-[#ffffff]/60 border-[#c5c0b5] hover:bg-[#ffffff]/90"
                      }`}
                    >
                      {/* 1. NUMBER (01 to 10) */}
                      <div className="flex md:justify-center items-center justify-between">
                        <span className="font-mono font-extrabold text-sm sm:text-base text-[#121212] bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] px-2 py-0.5 text-center min-w-[36px]">
                          {numStr}
                        </span>

                        {/* Mobile Status Badge on right */}
                        <div className="md:hidden flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              playTickSound();
                              updateProject(index, { completed: !project.completed });
                            }}
                            className="w-6 h-6 bg-white border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white flex items-center justify-center cursor-pointer select-none active:bg-[#dfdfdf]"
                            aria-label={`Отметить проект ${numStr}`}
                          >
                            {isDone && (
                              <span className="text-[#121212] font-black text-sm leading-none">
                                ✔
                              </span>
                            )}
                          </button>
                          <span
                            onClick={() => {
                              playTickSound();
                              updateProject(index, { completed: !project.completed });
                            }}
                            className={`text-[11px] font-mono font-bold px-2 py-0.5 border cursor-pointer select-none ${
                              isDone
                                ? "text-[#006000] bg-[#c8e6c9] border-[#2e7d32]"
                                : "text-[#805000] bg-[#fff3cd] border-[#d39e00]"
                            }`}
                          >
                            {isDone ? "ВЫПОЛНЕНО" : "В РАБОТЕ"}
                          </span>
                        </div>
                      </div>

                      {/* 2. TEXT INPUT (Sunken Win95 input for project name) */}
                      <div className="w-full">
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(index, { title: e.target.value })}
                          placeholder={`Проект #${numStr}: Впиши идею...`}
                          className={`w-full bg-white text-[#121212] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-3 py-1.5 text-xs sm:text-sm font-sans outline-none focus:bg-[#fffffa] focus:ring-1 focus:ring-[#D6307F] ${
                            isDone ? "line-through text-[#666666]" : "font-medium"
                          }`}
                        />
                      </div>

                      {/* 3. DATE FIELD */}
                      <div className="w-full">
                        <div className="flex items-center gap-1">
                          <span className="md:hidden text-[10px] font-mono text-[#808080] font-bold">
                            Срок:
                          </span>
                          <input
                            type="date"
                            value={project.date}
                            onChange={(e) => updateProject(index, { date: e.target.value })}
                            className="w-full bg-white text-[#121212] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-2 py-1 text-xs font-mono outline-none focus:ring-1 focus:ring-[#D6307F]"
                            title="Дата реализации"
                          />
                        </div>
                      </div>

                      {/* 4. STATUS CHECKBOX & BADGE (Desktop view) */}
                      <div className="hidden md:flex items-center justify-center gap-2">
                        {/* Authentic Win95 Checkbox */}
                        <button
                          type="button"
                          onClick={() => {
                            playTickSound();
                            updateProject(index, { completed: !project.completed });
                          }}
                          className="w-6 h-6 bg-white border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white flex items-center justify-center cursor-pointer select-none flex-shrink-0 active:bg-[#dfdfdf] transition-transform active:scale-95"
                          role="checkbox"
                          aria-checked={isDone}
                          aria-label={`Переключить статус проекта ${numStr}`}
                          title="Нажмите, чтобы изменить статус (Выполнено / В работе)"
                        >
                          {isDone && (
                            <span className="text-[#121212] font-black text-sm leading-none select-none">
                              ✔
                            </span>
                          )}
                        </button>

                        {/* Status Label */}
                        <span
                          onClick={() => {
                            playTickSound();
                            updateProject(index, { completed: !project.completed });
                          }}
                          className={`text-xs font-mono font-bold px-2 py-0.5 border cursor-pointer select-none whitespace-nowrap min-w-[95px] text-center ${
                            isDone
                              ? "text-[#006000] bg-[#c8e6c9] border-[#2e7d32]"
                              : "text-[#805000] bg-[#fff3cd] border-[#d39e00]"
                          }`}
                        >
                          {isDone ? "ВЫПОЛНЕНО" : "В РАБОТЕ"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── BOTTOM SECTION: BUTTONS & OFFICIAL COMPANY STAMP ── */}
              <div className="mt-8 pt-6 border-t-2 border-[#808080] flex flex-col md:flex-row items-center justify-between gap-6 relative">
                {/* Left: 3D Save Button & Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  {/* Convex 3D Win95 Button "Сохранить сертификат" */}
                  <button
                    type="button"
                    onClick={handleSaveCertificate}
                    className="w-full sm:w-auto bg-[#dfdfdf] text-[#121212] font-mono font-bold text-sm md:text-base border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px] px-6 py-2.5 shadow-[2px_2px_0px_#000000] cursor-pointer select-none flex items-center justify-center gap-2 hover:bg-[#eaeaea]"
                  >
                    <span className="text-base">💾</span>
                    <span>Сохранить сертификат</span>
                  </button>

                  {/* Print Button */}
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="w-full sm:w-auto bg-[#dfdfdf] text-[#121212] font-mono font-bold text-xs sm:text-sm border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px] px-4 py-2.5 shadow-[1px_1px_0px_#000000] cursor-pointer select-none flex items-center justify-center gap-1.5"
                    title="Распечатать бумажную версию"
                  >
                    <span>🖨️</span>
                    <span>Печать</span>
                  </button>

                  {/* Reset Button */}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto bg-[#dfdfdf] text-[#555] font-mono text-xs border border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:translate-y-[1px] px-3 py-2 cursor-pointer select-none"
                    title="Сбросить все строки к исходным значениям"
                  >
                    Сброс
                  </button>
                </div>

                {/* Status indicator on the left/middle */}
                {lastSavedTime && (
                  <div className="text-[11px] font-mono text-[#006000] font-bold">
                    ✓ Сохранено в {lastSavedTime}
                  </div>
                )}

                {/* Right: Authentic Official Company Stamp "CERNAVATION" */}
                <div className="flex-shrink-0 self-center md:self-end mt-2 md:mt-0">
                  <div
                    className="relative select-none pointer-events-none transform -rotate-6 hover:rotate-0 transition-transform duration-300"
                    title="Официальная печать CERNAVATION"
                  >
                    <svg
                      viewBox="0 0 200 200"
                      className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 text-[#D6307F] opacity-90 drop-shadow-[1px_1px_0px_rgba(255,255,255,0.7)]"
                    >
                      <defs>
                        {/* Circular path for top arc */}
                        <path
                          id="stamp-arc-top"
                          d="M 28,100 A 72,72 0 0,1 172,100"
                          fill="none"
                        />
                        {/* Circular path for bottom arc */}
                        <path
                          id="stamp-arc-bottom"
                          d="M 172,100 A 72,72 0 0,1 28,100"
                          fill="none"
                        />
                      </defs>

                      {/* Outer double dashed and solid borders */}
                      <circle
                        cx="100"
                        cy="100"
                        r="94"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeDasharray="8,4"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="86"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="64"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3,2"
                      />

                      {/* Top curved text */}
                      <text
                        fill="currentColor"
                        fontSize="10"
                        fontWeight="900"
                        fontFamily="monospace"
                        letterSpacing="2.5px"
                      >
                        <textPath href="#stamp-arc-top" startOffset="50%" textAnchor="middle">
                          ★ ОФИЦИАЛЬНО УТВЕРЖДЕНО ★
                        </textPath>
                      </text>

                      {/* Bottom curved text */}
                      <text
                        fill="currentColor"
                        fontSize="9"
                        fontWeight="900"
                        fontFamily="monospace"
                        letterSpacing="2px"
                      >
                        <textPath href="#stamp-arc-bottom" startOffset="50%" textAnchor="middle">
                          ★ 100% БЕССРОЧНО · КИШИНЁВ ★
                        </textPath>
                      </text>

                      {/* Center Badge Plate */}
                      <rect
                        x="18"
                        y="84"
                        width="164"
                        height="32"
                        fill="currentColor"
                        rx="2"
                      />

                      {/* Prominent Center Text: CERNAVATION */}
                      <text
                        x="100"
                        y="106"
                        fill="#E6E2D8"
                        fontSize="17"
                        fontWeight="900"
                        fontFamily="system-ui, sans-serif"
                        letterSpacing="3px"
                        textAnchor="middle"
                      >
                        CERNAVATION
                      </text>

                      {/* Stars above center plate */}
                      <text
                        x="100"
                        y="77"
                        fill="currentColor"
                        fontSize="13"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        ★★★
                      </text>

                      {/* Bottom Subtitle inside stamp */}
                      <text
                        x="100"
                        y="132"
                        fill="currentColor"
                        fontSize="8"
                        fontWeight="bold"
                        fontFamily="monospace"
                        letterSpacing="1px"
                        textAnchor="middle"
                      >
                        СЕРТИФИКАТ №001 / 2026
                      </text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Guarantee Footer Line */}
              <div className="mt-6 pt-3 border-t border-[#c5c0b5] text-center text-[10px] sm:text-xs font-mono text-[#666666]">
                Подпись исполнителя: <span className="font-bold text-[#121212]">Леха Церна</span> ·
                Подпись заказчика: <span className="font-bold text-[#121212]">Папа (Алексей Церна)</span> ·
                Действительно при любых обстоятельствах 🤝
              </div>
            </div>

            {/* Window Status Bar */}
            <div className="bg-[#dfdfdf] border-t border-white px-3 py-1 flex items-center justify-between text-[11px] font-mono text-[#444] select-none">
              <div className="flex items-center gap-3">
                <span className="border-r border-[#808080] pr-2">Режим: АВТОНОМНЫЙ</span>
                <span>Статус: 10 проектов в реестре</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#008000] inline-block" />
                <span>LOCAL_STORAGE: OK</span>
              </div>
            </div>
          </div>
        )}

        {/* Minimized Window Placeholder icon if window is minimized */}
        {isMinimized && (
          <div className="my-auto text-center bg-[#dfdfdf] border-2 border-t-white border-l-white border-b-[#000] border-r-[#000] p-6 shadow-2xl max-w-sm">
            <p className="font-mono text-sm mb-4 font-bold">Окно свернуто в панель задач</p>
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="bg-[#dfdfdf] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:translate-y-[1px] px-4 py-2 font-mono font-bold text-xs"
            >
              Развернуть окно сертификата
            </button>
          </div>
        )}
      </div>

      {/* ─── WIN95 SYSTEM POPUP / VICTORY MODAL ─── */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-[100000] bg-black/40 flex items-center justify-center p-4 backdrop-blur-[1px]"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="w-full max-w-md bg-[#dfdfdf] border-2 border-t-white border-l-white border-b-[#000000] border-r-[#000000] shadow-[4px_4px_0px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in-95 duration-100"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Title Bar */}
            <div className="bg-[#121212] border-b-2 border-[#D6307F] px-2.5 py-1 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#D6307F] flex items-center justify-center text-[10px] text-white font-bold">
                  i
                </span>
                <span className="text-white font-mono font-bold text-xs">
                  cernavation_registry.exe
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-black text-[10px] font-bold flex items-center justify-center active:translate-y-[1px]"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 flex items-start gap-4">
              {/* Win95 Success / Info Icon (Blue Asterisk Circle) */}
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[#000080] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-white font-mono font-black text-xl select-none">
                i
              </div>

              <div className="flex-1 space-y-2">
                {/* User-requested exact string */}
                <h2 className="text-[#121212] font-sans font-extrabold text-base sm:text-lg leading-snug">
                  Изменения успешно записаны в реестр! 🎉
                </h2>

                <p className="text-xs sm:text-sm text-[#333333] font-mono leading-relaxed">
                  Все 10 проектов надёжно сохранены в локальной памяти браузера. Данные не пропадут
                  даже после перезагрузки страницы или выключения компьютера.
                </p>

                <div className="bg-white border border-t-[#808080] border-l-[#808080] border-b-white border-r-white p-2 text-xs font-mono text-[#121212]">
                  <div>Статус: {completedCount} из 10 проектов выполнено</div>
                  <div className="text-[#D6307F] font-bold">Сертификат #001 АКТИВЕН</div>
                </div>
              </div>
            </div>

            {/* Modal Button Bar */}
            <div className="bg-[#dfdfdf] px-4 py-3 flex justify-center border-t border-[#808080]">
              <button
                type="button"
                autoFocus
                onClick={() => setShowSuccessModal(false)}
                className="min-w-[100px] bg-[#dfdfdf] text-[#121212] font-mono font-bold text-sm border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px] px-6 py-1.5 shadow-[1px_1px_0px_#000] focus:outline-2 focus:outline-dashed focus:outline-black"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── SYSTEM INFO / HELP MODAL ─── */}
      {infoModalOpen && (
        <div
          className="fixed inset-0 z-[100000] bg-black/40 flex items-center justify-center p-4"
          onClick={() => setInfoModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#dfdfdf] border-2 border-t-white border-l-white border-b-[#000000] border-r-[#000000] shadow-[4px_4px_0px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#121212] border-b-2 border-[#D6307F] px-2.5 py-1 flex items-center justify-between">
              <span className="text-white font-mono font-bold text-xs">О программе CERNAVATION</span>
              <button
                type="button"
                onClick={() => setInfoModalOpen(false)}
                className="w-4 h-4 bg-[#dfdfdf] text-black text-[10px] font-bold flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-3 font-mono text-xs text-[#121212]">
              <div className="font-bold text-sm text-[#D6307F]">CERNAVATION GIFT SYSTEM v2.0</div>
              <p>
                Подарок папе на день рождения от Лехи Церна. Включает 10 дизайнерских проектов любой сложности.
              </p>
              <p>
                Страница полностью автономна, работает офлайн в браузере и сохраняет все записи в реестре localStorage.
              </p>
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setInfoModalOpen(false)}
                  className="bg-[#dfdfdf] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] px-5 py-1 font-bold active:translate-y-[1px]"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── START MENU (Win95 Retro popup) ─── */}
      {startMenuOpen && (
        <div
          className="fixed bottom-9 left-1 z-[100001] w-56 bg-[#dfdfdf] border-2 border-t-white border-l-white border-b-[#000000] border-r-[#000000] shadow-[3px_3px_0px_rgba(0,0,0,0.6)] flex select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Win95 vertical blue banner */}
          <div className="w-7 bg-[#000080] text-white flex items-end justify-center py-3 select-none">
            <span className="transform -rotate-90 origin-center font-mono font-bold text-sm tracking-widest whitespace-nowrap">
              Windows<span className="text-[#FFD400]">95</span>
            </span>
          </div>

          <div className="flex-1 py-1 font-mono text-xs text-[#121212]">
            <div
              className="px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-2"
              onClick={() => {
                setStartMenuOpen(false);
                setIsMinimized(false);
              }}
            >
              <span>📄</span>
              <span>Сертификат</span>
            </div>
            <div
              className="px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-2"
              onClick={() => {
                setStartMenuOpen(false);
                handleSaveCertificate();
              }}
            >
              <span>💾</span>
              <span>Сохранить всё</span>
            </div>
            <div
              className="px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-2"
              onClick={() => {
                setStartMenuOpen(false);
                handlePrint();
              }}
            >
              <span>🖨️</span>
              <span>Распечатать</span>
            </div>
            <div className="h-[1px] bg-[#808080] my-1 mx-2" />
            <a
              href="/"
              className="px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-2 block"
            >
              <span>🌐</span>
              <span>Сайт Poliviz</span>
            </a>
            <div
              className="px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-2"
              onClick={() => {
                setStartMenuOpen(false);
                setInfoModalOpen(true);
              }}
            >
              <span>❓</span>
              <span>Справка</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── WIN95 TASKBAR (Bottom System Bar) ─── */}
      <div className="fixed bottom-0 left-0 right-0 h-9 bg-[#dfdfdf] border-t-2 border-white flex items-center justify-between px-1 z-[100000] select-none shadow-[inset_0_1px_0_#dfdfdf]">
        {/* Left: Start Button "Пуск" & Window Tab */}
        <div className="flex items-center gap-1 h-full py-0.5">
          {/* Start Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setStartMenuOpen(!startMenuOpen);
            }}
            className={`h-full px-2 flex items-center gap-1.5 font-mono font-bold text-xs border-2 ${
              startMenuOpen
                ? "bg-[#d0d0d0] border-t-[#808080] border-l-[#808080] border-b-white border-r-white"
                : "bg-[#dfdfdf] border-t-white border-l-white border-b-[#808080] border-r-[#808080]"
            } active:translate-y-[1px]`}
          >
            {/* Windows 4-color retro logo icon */}
            <span className="grid grid-cols-2 gap-[1px] w-3 h-3 flex-shrink-0">
              <span className="bg-[#e04030]" />
              <span className="bg-[#4caf50]" />
              <span className="bg-[#2196f3]" />
              <span className="bg-[#ffeb3b]" />
            </span>
            <span className="text-[#121212]">Пуск</span>
          </button>

          {/* Active Window Button on Taskbar */}
          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className={`h-full px-2.5 max-w-[220px] flex items-center gap-1.5 font-mono text-xs border-2 truncate ${
              !isMinimized
                ? "bg-[#e8e8e8] border-t-[#808080] border-l-[#808080] border-b-white border-r-white font-bold text-[#121212]"
                : "bg-[#dfdfdf] border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[#555]"
            }`}
          >
            <span className="w-2.5 h-2.5 bg-[#D6307F] inline-block flex-shrink-0" />
            <span className="truncate">cernavation_gift_cert...</span>
          </button>
        </div>

        {/* Right: System Tray (Clock + Volume + Layout) */}
        <div className="h-full py-0.5 flex items-center">
          <div className="h-full px-2.5 bg-[#dfdfdf] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white flex items-center gap-2 font-mono text-xs text-[#121212]">
            {/* Audio Icon */}
            <span
              onClick={playWin95Chime}
              className="cursor-pointer hover:opacity-75"
              title="Проверить системный звук Win95"
            >
              🔊
            </span>
            {/* Keyboard layout */}
            <span className="font-bold text-[10px] bg-[#d0d0d0] px-1">RU</span>
            {/* Clock */}
            <span className="font-bold min-w-[38px] text-right">{currentTime || "12:00"}</span>
          </div>
        </div>
      </div>

      {/* ── PRINT-SPECIFIC CSS ── */}
      <style jsx global>{`
        @media print {
          body,
          html {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          #gift-standalone-root {
            position: static !important;
            background: #ffffff !important;
            overflow: visible !important;
            height: auto !important;
          }
          /* Hide desktop chrome, icons, buttons and taskbar in print */
          .fixed,
          header,
          footer,
          button,
          .absolute.top-4.left-4 {
            display: none !important;
          }
          #gift-standalone-root > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
