import db from "./client.js";
import { createFolder } from "./folders.js";
import { createFile } from "./files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folderNames = ["work", "school", "personal"];
  for (const name of folderNames) {
    const folder = await createFolder(name);
    console.log(folder);
    for (let index = 1; index <= 5; index++) {
      const file = await createFile(`${name}_file_${index}`, index*100, folder.id);
      console.log(file);
    }
  }
}
