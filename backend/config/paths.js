import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve paths from this file's location, not from process.cwd(),
// so they work whether the server is started from the repo root or from backend/
const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const rootDir = path.resolve(backendDir, "..");
export const uploadsDir = path.join(rootDir, "uploads");
export const frontendBuildDir = path.join(rootDir, "frontend", "build");

fs.mkdirSync(uploadsDir, { recursive: true });
