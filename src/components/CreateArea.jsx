import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';


function CreateArea(props) {
  const [note, setNote] = useState({title:"",content:""});

    function updateChange(event){
      const {name, value} = event.target;
     setNote((prevNote)=>{
       return {
        ...prevNote,
        [name]:value
       };
     })
    }
 
  return (
    <div>
      <form>
        <input name="title" placeholder="Title" onChange={updateChange} value={note.title} />
        <textarea name="content" placeholder="Take a note..." rows="3" onChange={updateChange} value={note.content}/>
        <button onClick={(event)=>{
          props.clicked(note,event)
          setNote({title:"", content:""})
          } }><AddIcon/></button>
      </form>
    </div>
  );
}

export default CreateArea;
