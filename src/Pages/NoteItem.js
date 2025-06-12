import React, { useState } from 'react'
import { motion } from 'framer-motion'

const NoteItem = (props) => {
    const { note, deleteNote, editNote, mode } = props
    const [isEditing, setIsEditing] = useState(false)
    const [editedNote, setEditedNote] = useState({
        title: note.title,
        description: note.description,
        tag: note.tag,
        color: note.color || '#ffffff',
        isPinned: note.isPinned || false
    })

    const colorOptions = [
        '#ffffff', // White
        '#ffcdd2', // Red
        '#f8bbd0', // Pink
        '#e1bee7', // Purple
        '#d1c4e9', // Deep Purple
        '#c5cae9', // Indigo
        '#bbdefb', // Blue
        '#b3e5fc', // Light Blue
        '#b2ebf2', // Cyan
        '#b2dfdb', // Teal
        '#c8e6c9', // Green
        '#dcedc8', // Light Green
        '#f0f4c3', // Lime
        '#fff9c4', // Yellow
        '#ffe0b2', // Orange
        '#d7ccc8'  // Brown
    ]

    const handleEdit = async () => {
        if (isEditing) {
            try {
                await editNote(
                    note._id,
                    editedNote.title,
                    editedNote.description,
                    editedNote.tag,
                    editedNote.color,
                    editedNote.isPinned
                )
                setIsEditing(false)
            } catch (error) {
                console.error('Error updating note:', error)
            }
        } else {
            setIsEditing(true)
        }
    }

    const handleCancel = () => {
        setEditedNote({
            title: note.title,
            description: note.description,
            tag: note.tag,
            color: note.color || '#ffffff',
            isPinned: note.isPinned || false
        })
        setIsEditing(false)
    }

    const togglePin = async () => {
        try {
            await editNote(
                note._id,
                note.title,
                note.description,
                note.tag,
                note.color,
                !note.isPinned
            )
        } catch (error) {
            console.error('Error toggling pin:', error)
        }
    }

    return (
        <motion.div
            className="card"
            style={{
                backgroundColor: note.color || (mode === "dark" ? "rgb(9 48 80)" : "white"),
                color: mode === "dark" ? "white" : "#042743",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                border: note.isPinned ? "2px solid #007bff" : "none"
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="card-body">
                {isEditing ? (
                    <div className="edit-form">
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editedNote.title}
                            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
                            style={{ backgroundColor: mode === "dark" ? "rgb(9 48 80)" : "white", color: mode === "dark" ? "white" : "#042743" }}
                        />
                        <textarea
                            className="form-control mb-2"
                            value={editedNote.description}
                            onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
                            rows="3"
                            style={{ backgroundColor: mode === "dark" ? "rgb(9 48 80)" : "white", color: mode === "dark" ? "white" : "#042743" }}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editedNote.tag}
                            onChange={(e) => setEditedNote({ ...editedNote, tag: e.target.value })}
                            style={{ backgroundColor: mode === "dark" ? "rgb(9 48 80)" : "white", color: mode === "dark" ? "white" : "#042743" }}
                        />
                        <div className="mb-3">
                            <label className="form-label">Note Color</label>
                            <div className="d-flex flex-wrap gap-2">
                                {colorOptions.map((color) => (
                                    <motion.button
                                        key={color}
                                        className="btn btn-sm"
                                        style={{
                                            backgroundColor: color,
                                            width: '24px',
                                            height: '24px',
                                            border: editedNote.color === color ? '2px solid #007bff' : '1px solid #ddd',
                                            borderRadius: '50%'
                                        }}
                                        onClick={() => setEditedNote({ ...editedNote, color })}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="pinNote"
                                    checked={editedNote.isPinned}
                                    onChange={(e) => setEditedNote({ ...editedNote, isPinned: e.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="pinNote">
                                    Pin Note
                                </label>
                            </div>
                            <div className="btn-group">
                                <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary btn-sm" onClick={handleEdit}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="card-title mb-0">{note.title}</h5>
                            <motion.button
                                className="btn btn-sm btn-link"
                                onClick={togglePin}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                style={{ color: note.isPinned ? '#007bff' : '#6c757d' }}
                            >
                                <i className={`fas fa-thumbtack ${note.isPinned ? 'text-primary' : ''}`}></i>
                            </motion.button>
                        </div>
                        <p className="card-text">{note.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="badge bg-primary">{note.tag}</span>
                            <div className="btn-group">
                                <motion.button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={handleEdit}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <i className="fas fa-edit"></i>
                                </motion.button>
                                <motion.button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => deleteNote(note._id)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </motion.button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    )
}

export default NoteItem 