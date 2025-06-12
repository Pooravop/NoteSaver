import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Helper function to safely show alerts
  const safeShowAlert = (message, type) => {
    if (props.showAlert && typeof props.showAlert === 'function') {
      props.showAlert(message, type);
    } else {
      console.warn('Alert message:', message, 'Type:', type);
    }
  };

  //Get all Notes
  const getNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        safeShowAlert('Please login to access your notes', 'warning');
        return;
      }

      //API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'auth-token': token,
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          safeShowAlert('Session expired. Please login again.', 'warning');
          return;
        }
        const errorData = await response.json().catch(() => ({}));
        safeShowAlert(errorData.error || `Failed to fetch notes: ${response.status}`, 'danger');
        return;
      }
      
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
      safeShowAlert(error.message, 'danger');
    }
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      //API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'auth-token': token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to add note: ${response.status}`);
      }

      const note = await response.json();
      setNotes(notes.concat(note));
      safeShowAlert('Note added successfully!', 'success');
      return note;
    } catch (error) {
      console.error("Error adding note:", error);
      safeShowAlert(error.message, 'danger');
      throw error;
    }
  }

  //Delete a Note
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      //API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'auth-token': token,
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to delete note: ${response.status}`);
      }

      const json = await response.json();
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
      safeShowAlert('Note deleted successfully!', 'success');
    } catch (error) {
      console.error("Error deleting note:", error);
      safeShowAlert(error.message, 'danger');
      throw error;
    }
  }

  //Edit a Note
  const editNote = async (id, title, description, tag, color, isPinned) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      //API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'auth-token': token,
        },
        body: JSON.stringify({ title, description, tag, color, isPinned }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to update note: ${response.status}`);
      }

      const json = await response.json();
      let newNotes = JSON.parse(JSON.stringify(notes));

      //Logic to Edit a Note
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          newNotes[index].color = color;
          newNotes[index].isPinned = isPinned;
          break;
        }
      }
      setNotes(newNotes);
      safeShowAlert('Note updated successfully!', 'success');
    } catch (error) {
      console.error("Error updating note:", error);
      safeShowAlert(error.message, 'danger');
      throw error;
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, safeShowAlert }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState