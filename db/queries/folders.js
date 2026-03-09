import db from "#db/client";

export async function createFolder(name) {
    const sql = 'INSERT INTO folders(name) VALUES ($1) RETURNING *';
    const { rows: [folder] } = await db.query (sql, [name]);
    return folder;
}

export async function getFolderByIdWithFiles(){
        const sql = 'SELECT * FROM folders LEFT JOIN files ON files.folder_id = folders.id WHERE folders.id = $1'
}