import { existsSync } from "fs";
import { join } from "path";

/**
 * resolveMedia — server-side helper (Node.js only, never in client bundle).
 *
 * Priority chain:
 *  1. Final file at `finalPath` (relative to /public, e.g. "/media/photo/services/offset.jpg")
 *  2. Temp file at `/media/_temp/{slotId}.jpg` (or .mp4 for videos)
 *  3. null → caller shows placeholder / poster image
 *
 * Returns the public URL string (starting with "/") or null.
 * Call this in Server Components only.
 */

const PUBLIC = join(process.cwd(), "public");

export type MediaResult = {
  src: string;
  isTemp: boolean;
} | null;

export function resolveMedia(
  finalPath: string,
  slotId: string,
  ext: "jpg" | "mp4" = "jpg"
): MediaResult {
  // 1. Final
  if (existsSync(join(PUBLIC, finalPath))) {
    return { src: finalPath, isTemp: false };
  }

  // 2. Temp
  const tempPath = `/media/_temp/${slotId}.${ext}`;
  if (existsSync(join(PUBLIC, tempPath))) {
    return { src: tempPath, isTemp: true };
  }

  // 3. Nothing
  return null;
}

/** Batch-resolve: returns a map of slotId → MediaResult */
export function resolveMediaMap(
  entries: Array<{ finalPath: string; slotId: string; ext?: "jpg" | "mp4" }>
): Record<string, MediaResult> {
  const result: Record<string, MediaResult> = {};
  for (const e of entries) {
    result[e.slotId] = resolveMedia(e.finalPath, e.slotId, e.ext ?? "jpg");
  }
  return result;
}
