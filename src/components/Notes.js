import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Notes = (props) => {
    let history = useNavigate()
    const { showAlert, mode } = props
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;

    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('date'); // 'date' or 'title'
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchNotes = async () => {
            setIsLoading(true);
            if (localStorage.getItem('token')) {
                try {
                    await getNotes();
                } catch (error) {
                    if (error.message.includes('Session expired')) {
                        history('/login');
                    }
                }
            } else {
                showAlert("Please login to access your notes", 'warning');
                history('/login');
            }
            setIsLoading(false);
        };
        fetchNotes();
        // eslint-disable-next-line
    }, [])
    
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "", ecolor: "#ffffff", eisPinned: false })

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, ecolor: currentNote.color, eisPinned: currentNote.isPinned })
    }
    
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag, note.ecolor, note.eisPinned)
        showAlert("Note updated successfully!", "success")
        refClose.current.click();
    }
    
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (sortBy === 'date') {
            return sortOrder === 'desc' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
        } else if (sortBy === 'title') {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            return sortOrder === 'desc' ? titleB.localeCompare(titleA) : titleA.localeCompare(titleB);
        }
        return 0; // Should not happen
    });

    const pinnedNotes = sortedNotes.filter(note => note.isPinned);
    const unpinnedNotes = sortedNotes.filter(note => !note.isPinned);

    return (
        <div className="container py-4">
            <AddNote showAlert={showAlert} mode={mode} />
            
            {/* Edit Note Modal */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editNoteModal">
                Edit Note
            </button>

            <div className="modal fade" id="editNoteModal" tabIndex="-1" aria-labelledby="editNoteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`modal-content ${mode === 'dark' ? 'bg-dark text-light' : 'bg-light'}`}>
                        <div className="modal-header border-bottom">
                            <h5 className="modal-title" id="editNoteModalLabel">
                                <i className="fas fa-edit me-2"></i>Edit Note
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" 
                                           className={`form-control ${mode === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}
                                           value={note.etitle} 
                                           id="etitle" 
                                           name='etitle' 
                                           onChange={onChange} 
                                           placeholder="Enter note title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className={`form-control ${mode === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}
                                              value={note.edescription} 
                                              id="edescription" 
                                              name="edescription" 
                                              onChange={onChange}
                                              rows="3"
                                              placeholder="Enter note description" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" 
                                           className={`form-control ${mode === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}
                                           value={note.etag} 
                                           id="etag" 
                                           name="etag" 
                                           onChange={onChange}
                                           placeholder="Enter tag (optional)" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" 
                                           className="form-check-input" 
                                           id="eisPinned" 
                                           name="eisPinned" 
                                           checked={note.eisPinned} 
                                           onChange={(e) => setnote({...note, eisPinned: e.target.checked})} 
                                    />
                                    <label className="form-check-label" htmlFor="eisPinned">Pin Note</label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ecolor" className="form-label">Color</label>
                                    <input type="color" 
                                           className="form-control form-control-color" 
                                           id="ecolor" 
                                           name="ecolor" 
                                           value={note.ecolor} 
                                           onChange={onChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-top">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                <i className="fas fa-times me-1"></i> Cancel
                            </button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} 
                                    onClick={handleClick} 
                                    type="button" 
                                    className="btn btn-primary">
                                <i className="fas fa-save me-1"></i> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes List */}
            <div className='mt-4'>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className={`mb-0 ${mode === 'dark' ? 'text-light' : 'text-dark'}`}>
                        <i className="fas fa-sticky-note me-2"></i>Your Notes
                    </h2>
                    <span className={`badge ${mode === 'dark' ? 'bg-light text-dark' : 'bg-dark text-light'}`}>
                        {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
                    </span>
                </div>
                
                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        className={`form-control ${mode === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* View Mode and Sort Options */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <div className="btn-group me-2">
                            <button 
                                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <i className="fas fa-th"></i> Grid View
                            </button>
                            <button 
                                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setViewMode('list')}
                            >
                                <i className="fas fa-list"></i> List View
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="btn-group">
                            <button 
                                className={`btn ${sortBy === 'date' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setSortBy('date')}
                            >
                                <i className="fas fa-sort-numeric-down"></i> Sort by Date
                            </button>
                            <button 
                                className={`btn ${sortBy === 'title' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setSortBy('title')}
                            >
                                <i className="fas fa-sort-alpha-down"></i> Sort by Title
                            </button>
                            <button 
                                className={`btn ${sortOrder === 'asc' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            >
                                <i className={`fas ${sortOrder === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                {isLoading ? (
                    <div className={`text-center py-5 ${mode === 'dark' ? 'text-light' : 'text-muted'}`}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading notes...</span>
                        </div>
                        <p className="lead mt-3">Loading your notes...</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {pinnedNotes.length === 0 && unpinnedNotes.length === 0 ? (
                            <motion.div
                                key="no-notes"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`text-center py-5 ${mode === 'dark' ? 'text-light' : 'text-muted'}`}
                            >
                                <i className="fas fa-clipboard-list fa-3x mb-3"></i>
                                <p className="lead">No notes to display</p>
                                <p>Click the "Add Note" button above to create your first note!</p>
                            </motion.div>
                        ) : (
                            <>
                                {pinnedNotes.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <h3 className={`mt-4 mb-3 ${mode === 'dark' ? 'text-light' : 'text-dark'}`}>Pinned Notes</h3>
                                        <div className={viewMode === 'grid' ? 'row g-4 mb-5' : 'list-group mb-5'}>
                                            <AnimatePresence>
                                                {pinnedNotes.map((note) => (
                                                    <motion.div
                                                        key={note._id}
                                                        layout
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.3 }}
                                                        className={viewMode === 'grid' ? 'col-md-6 col-lg-4' : 'list-group-item'}
                                                    >
                                                        <Noteitem 
                                                            updateNote={updateNote} 
                                                            note={note} 
                                                            showAlert={showAlert} 
                                                            mode={mode} 
                                                        />
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )}

                                {unpinnedNotes.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: pinnedNotes.length > 0 ? 0.2 : 0 }}
                                    >
                                        {pinnedNotes.length > 0 && (
                                            <h3 className={`mt-4 mb-3 ${mode === 'dark' ? 'text-light' : 'text-dark'}`}>Other Notes</h3>
                                        )}
                                        <div className={viewMode === 'grid' ? 'row g-4' : 'list-group'}>
                                            <AnimatePresence>
                                                {unpinnedNotes.map((note) => (
                                                    <motion.div
                                                        key={note._id}
                                                        layout
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.3 }}
                                                        className={viewMode === 'grid' ? 'col-md-6 col-lg-4' : 'list-group-item'}
                                                    >
                                                        <Noteitem 
                                                            updateNote={updateNote} 
                                                            note={note} 
                                                            showAlert={showAlert} 
                                                            mode={mode} 
                                                        />
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    )
}

export default Notes
