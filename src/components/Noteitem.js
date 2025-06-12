import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import { motion } from "framer-motion"

const Noteitem = (props) => {
  const { showAlert } = props
  const context = useContext(noteContext)
  const { deleteNote, editNote } = context;
  const { note, mode } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    _id: note._id,
    title: note.title,
    description: note.description,
    tag: note.tag,
    color: note.color || '#ffffff',
    isPinned: note.isPinned || false,
  });

  const colorOptions = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', 
    '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed',
  ];

  const handleEdit = () => {
    if (isEditing) {
      editNote(editedNote._id, editedNote.title, editedNote.description, editedNote.tag, editedNote.color, editedNote.isPinned);
      showAlert("Note updated successfully!", "success");
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditedNote({
      _id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
      color: note.color || '#ffffff',
      isPinned: note.isPinned || false,
    });
    setIsEditing(false);
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedNote(prevNote => ({
      ...prevNote,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const togglePin = () => {
    const newPinnedState = !editedNote.isPinned;
    setEditedNote(prev => ({ ...prev, isPinned: newPinnedState }));
    editNote(editedNote._id, editedNote.title, editedNote.description, editedNote.tag, editedNote.color, newPinnedState);
    showAlert(newPinnedState ? "Note pinned!" : "Note unpinned!", "info");
  };

  return (
    <motion.div 
      className="h-100 mb-4"
      style={{
        backgroundColor: editedNote.color === '#ffffff' ? (mode === 'dark' ? 'rgb(40, 40, 40)' : 'white') : editedNote.color,
        border: editedNote.isPinned ? `2px solid ${mode === 'dark' ? '#00b8d4' : '#007bff'}` : 'none',
        borderRadius: '8px',
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        color: (mode === 'dark' && editedNote.color === '#ffffff') ? 'white' : '#212529',
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="card-body p-3 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-2">
          {!isEditing ? (
            <h5 className="card-title mb-0 text-truncate" style={{ maxWidth: '80%' }}>
              {note.title}
            </h5>
          ) : (
            <input
              type="text"
              className={`form-control ${mode === 'dark' ? 'bg-secondary text-white' : ''}`}
              id="title"
              name="title"
              value={editedNote.title}
              onChange={onChange}
              placeholder="Note title"
              style={{ width: 'auto', flexGrow: 1 }}
            />
          )}
          <div className="btn-group ms-auto">
            {!isEditing && (
              <button
                className={`btn btn-sm ${mode === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
                onClick={handleEdit}
                title="Edit note"
              >
                <i className="fas fa-edit"></i>
              </button>
            )}
            <button
              className={`btn btn-sm ${mode === 'dark' ? 'btn-outline-info' : 'btn-outline-primary'} ms-1`}
              onClick={togglePin}
              title={editedNote.isPinned ? "Unpin note" : "Pin note"}
            >
              <i className={`fas ${editedNote.isPinned ? 'fa-thumbtack' : 'fa-map-pin'}`}></i>
            </button>
            <button
              className={`btn btn-sm ${mode === 'dark' ? 'btn-outline-danger' : 'btn-outline-danger'} ms-1`}
              onClick={() => {
                if(window.confirm('Are you sure you want to delete this note?')) {
                  deleteNote(note._id); 
                  showAlert("Note deleted successfully", "success")
                }
              }}
              title="Delete note"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>

        {!isEditing ? (
          <p className="card-text mb-3" style={{ 
            color: (mode === 'dark' && editedNote.color === '#ffffff') ? '#e0e0e0' : '#666',
            fontSize: '0.95rem',
            lineHeight: '1.5'
          }}>
            {note.description}
          </p>
        ) : (
          <textarea
            className={`form-control mb-3 ${mode === 'dark' ? 'bg-secondary text-white' : ''}`}
            id="description"
            name="description"
            value={editedNote.description}
            onChange={onChange}
            rows="3"
            placeholder="Note description"
          />
        )}

        {!isEditing && note.tag && (
          <div className="mt-2">
            <span className={`badge ${mode === 'dark' ? 'bg-light text-dark' : 'bg-dark text-light'}`}>
              <i className="fas fa-tag me-1"></i>
              {note.tag}
            </span>
          </div>
        )}
        {isEditing && (
          <div className="mt-3">
            <input
              type="text"
              className={`form-control mb-3 ${mode === 'dark' ? 'bg-secondary text-white' : ''}`}
              id="tag"
              name="tag"
              value={editedNote.tag}
              onChange={onChange}
              placeholder="Note tag (optional)"
            />
            <div className="d-flex flex-wrap">
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  className="color-box me-2 mb-2"
                  style={{
                    backgroundColor: color,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: editedNote.color === color ? '2px solid #007bff' : '1px solid #ccc',
                  }}
                  onClick={() => setEditedNote(prev => ({ ...prev, color }))}
                ></div>
              ))}
            </div>
            <label htmlFor="isPinned" className={`form-check-label mt-3 ${mode === 'dark' ? 'text-white' : ''}`}>Pin Note</label>
            <input
                type="checkbox"
                className="form-check-input ms-2"
                id="isPinned"
                name="isPinned"
                checked={editedNote.isPinned}
                onChange={onChange}
            />
          </div>
        )}
      </div>

      <div className={`card-footer border-top-0 ${mode === 'dark' ? 'bg-dark' : 'bg-light'} text-muted`} style={{ fontSize: '0.8rem' }}>
        <small>
          <i className="fas fa-clock me-1"></i>
          {new Date(note.date).toLocaleDateString()}
        </small>
        {isEditing && (
          <div className="d-flex justify-content-end mt-2">
            <motion.button
              type="button"
              className="btn btn-secondary btn-sm me-2"
              onClick={handleCancel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleEdit}
              disabled={editedNote.title.length < 3 || editedNote.description.length < 5}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Noteitem
