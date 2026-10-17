import { rmSync, existsSync } from "node:fs";
const db = "prisma/dev.db";
if (!existsSync(db)) { console.log("No prisma/dev.db file found. Nothing to reset."); process.exit(0); }
if (process.env.CONFIRM_RESET !== "YES") { console.error("WARNING: this deletes local database data. Re-run with CONFIRM_RESET=YES."); process.exit(1); }
rmSync(db); console.log("Local database removed. Run npm run setup to rebuild and reseed.");