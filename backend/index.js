const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors({
    origin: '*'
}));

const port = 8080;

//Initialize mongoose
mongoose.connect('mongodb+srv://YusuffKazeem:Ajibola15.@cluster0.zaj3lap.mongodb.net/?retryWrites=true&w=majority');

//Create Schema and model
const noteSchema = new mongoose.Schema({
    title:String,
    content:String
});
const Note = mongoose.model('Note',noteSchema);

const defaultNote = new Note({
    title:"Wild Dreams",
    content:"Arsenal winning the league"
});


/**
 * API Get endpoint
 * 
 * This gets all the notes from the notes database and sends the 
 * 
 * Author:Yusuff Kazeem
 */
app.get("/", async (req,res)=>{
    const notes = await Note.find({})
    if(notes.length==0){
        const arr = [defaultNote];
        Note.insertMany(arr);
    }else{
        res.send(notes);
    }
});

/**
 * API Post endpoint
 * 
 * This post a new note to the notes database and sends the 
 * updated database if successfully posted 
 * and a failure message if otherwise.
 * 
 * Author:Yusuff Kazeem
 */
app.post("/", async (req,res)=>{
    const noteTitle = req.body.title;
    const noteContent = req.body.content;

    if(!noteTitle||!noteContent){
        res.status(404).send({message:"Note not created"});
    }else{
        await Note.create({title:noteTitle,content:noteContent});
        res.redirect("/");
    }
});

/**
 * API delete endpoint
 * 
 * This deletes a specific note from the notes database and sends the 
 * updated database and a json file with a success message if successfully deleted 
 * and a failure message if otherwise.
 * 
 * Author:Yusuff Kazeem
 */
app.delete("/delete/:id",async (req,res)=>{
 const reqTitle = req.params.id;
 //Get number of deleted items
const  {deletedCount} = await Note.deleteOne({_id:reqTitle})

//If number of deleted items equal zero
if(deletedCount==0){
    res.status(404).send({message:"Note not Deleted"});
}else{
    //At least one item deleted
    res.send({message:"Note successfully deleted"});
   
}
 
});

app.listen(port, ()=>{
    console.log("Listening on port"+port);
});

app.on('error',console.error);