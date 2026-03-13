import express from "express";

import {createFile,
        getFiles
} from "./db/files.js";


import {
    getFolderByIdWithFiles,
    getFolders
} from "./db/folders.js";

const app = express();

app.use(express.json());


app.get("/files", async (req, res) => {
    const files = await getFiles();
    res.send(files);
});

app.get("/folders", async (req, res) =>{
    const folders = await getFolders();
    res.send(folders);    
});


app.get("/folders/:id", async (req, res) => {
    const { id } = req.params;
    
    const folder = await getFolderByIdWithFiles(id);

    if (!folder) {
        return res.status(404).send("Folder not found");
    } 
    res.send(folder);
    });

app.post("/folders/:id/files", async (req, res) =>{
    const { id } = req.params;

        if (!req.body) {
    return res.status(400).send("Request body required");
}
 
    const { name, size } = req.body;
    const folder = await getFolderByIdWithFiles(id);
    

    if (!folder) {
        return res.status(404).send("Folder not found");
    }
   if (!name || !size) {
    return res.status(400).send("Missing required fields");
}

    const file = await createFile(name, size, id);

    res.status(201).send(file);

});




export default app;
