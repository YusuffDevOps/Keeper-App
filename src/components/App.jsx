import React, {useState, useEffect} from "react";
import Header from "./Header";
import axios from "axios";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";




function App() {
 
    //useState hook
    const [notes, setNotes] = useState(null);
    const url = "https://keeperapi.onrender.com";

    //Get notes from api 
    useEffect(() => {
      axios.get(url).then((response) => {
        setNotes(response.data);
      });
    }, []);


/**
 * This function creates a new note and POST the note to the database
 * using API
 * 
 * @param {*} newNote the newNote created
 * @param {*} event event that triggers the addNote function 
 */
function addNote(newNote, event){

  axios.post(url,{
    title:newNote.title,
    content:newNote.content
  })
  .then((response) => {
    setNotes(response.data);
  });

  //Prevent default behaviour of forms
 event.preventDefault();
}

/**
 * This function deletes a not from the database using the api 
 * DELETE route 
 * 
 * @param {*} id the note id used to delete the note
 */
function deleteNote(id){
  
  axios
      .delete(url+"/delete/"+id)
      .then(() => {
        alert("Post deleted!");
        axios.get(url).then((response) => {
        setNotes(response.data);
      });
      });
}
  return (
    <div>
      <Header />
      <CreateArea clicked={addNote} />
      {/* Render notes if they exist */}
      {notes&&notes.map((note,index)=>{
       return <Note key={index} id={note._id} clicked={deleteNote} title={note.title}  content={note.content}/>
    })}
      <Footer />
    </div>
  );
}

export default App;
