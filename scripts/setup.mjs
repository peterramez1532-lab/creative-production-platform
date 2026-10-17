import { execSync } from "node:child_process";
import { existsSync, copyFileSync } from "node:fs";
if (!existsSync(".env")) { copyFileSync(".env.example", ".env"); console.log("Created .env from .env.example. Review SESSION_SECRET before use."); }
execSync("npx prisma generate", { stdio: "inherit" });
execSync("npx prisma db push", { stdio: "inherit" });
execSync("npx tsx prisma/seed.ts", { stdio: "inherit" });
console.log("Setup complete. Run npm run dev.");
