import db from "./client.js";

export async function createFolder(name) {
  const sql = `INSERT INTO folders(name) VALUES ($1) RETURNING *`;
  const {
    rows: [folder],
  } = await db.query(sql, [name]);
  return folder;
}

export async function getFolderByIdWithFiles(id) {
  const sql =
    `SELECT folders.id, folders.name, COALESCE(json_agg(files.*) FILTER(WHERE files.id IS NOT NULL), '[]') AS files FROM folders LEFT JOIN files ON files.folder_id = folders.id WHERE folders.id = $1 GROUP BY folders.id`;
    const {
        rows: [folder] 
    } = await db.query(sql, [id]);
    return folder;
}

export async function getFolders(){
    const sql =
    `SELECT * FROM folders;`
    const { rows } = await db.query(sql);
    return rows
}

