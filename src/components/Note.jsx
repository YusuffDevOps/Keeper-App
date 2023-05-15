import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Note component
 * @param {} props properties of note component passed from App.jsx
 * @returns new note Component
 */
function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
      onClick={() => {
          props.clicked(props.id);
        }}
      ><DeleteIcon/></button>
    </div>
  );
}

export default Note;
