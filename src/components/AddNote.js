import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const { showAlert, mode } = props
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const [isLoading, setIsLoading] = useState(false)
    
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            await addNote(note.title, note.description, note.tag || "General")
            setnote({ title: "", description: "", tag: "" })
            showAlert("Note added successfully!", "success")
        } catch (error) {
            showAlert("Failed to add note. Please try again.", "danger")
        } finally {
            setIsLoading(false)
        }
    }
    
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    
    return (
        <div className={`card border-0 shadow-sm ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`}>
            <div className="card-body p-4">
                <h2 className={`card-title mb-4 ${mode === 'dark' ? 'text-light' : 'text-dark'}`}>
                    <i className="fas fa-plus-circle me-2"></i>Add New Note
                </h2>

                <form onSubmit={handleClick}>
                    <div className="mb-3">
                        <label htmlFor="title" className={`form-label ${mode === 'dark' ? 'text-light' : 'text-dark'}`}>
                            <i className="fas fa-heading me-2"></i>Title
                        </label>
                        <input 
                            type="text" 
                            className={`form-control ${mode === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}
                            id="title" 
                            name='title' 
                            value={note.title} 
                            onChange={onChange}
                            placeholder="Enter note title"
                            required 
                            disabled={isLoading}
                        />
                        <div className="form-text">
                            Title must be at least 5 characters long
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="description" className={`form-label ${mode === 'dark' ? 'text-light' : 'text-dark'}`}>
                            <i className="fas fa-align-left me-2"></i>Description
                        </label>
                        <textarea 
                            className={`form-control ${mode === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}
                            id="description" 
                            name="description" 
                            value={note.description} 
                            onChange={onChange}
                            rows="3"
                            placeholder="Enter note description"
                            required 
                            disabled={isLoading}
                        />
                        <div className="form-text">
                            Description must be at least 5 characters long
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="tag" className={`form-label ${mode === 'dark' ? 'text-light' : 'text-dark'}`}>
                            <i className="fas fa-tag me-2"></i>Tag
                        </label>
                        <input 
                            type="text" 
                            className={`form-control ${mode === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}
                            id="tag" 
                            value={note.tag} 
                            name="tag" 
                            onChange={onChange}
                            placeholder="Enter tag (optional)"
                            disabled={isLoading}
                        />
                        <div className="form-text">
                            Leave empty to use "General" as default tag
                        </div>
                    </div>

                    <button 
                        disabled={note.title.length < 5 || note.description.length < 5 || isLoading} 
                        type="submit" 
                        className="btn btn-primary px-4"
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Adding Note...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-plus me-2"></i>Add Note
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
