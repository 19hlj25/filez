import db from "#db/client";
import { createFolder } from "./queries/folders.js";
import { createFolder } from "./files.js";


await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folder = await createFolder("test");
  console.log(folder);
  const file = await createFile("test2", 2, folder.id)
  console.log(file);
}
