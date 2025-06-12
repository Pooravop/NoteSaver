import React, { useEffect, useState } from 'react'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import { motion, AnimatePresence } from 'framer-motion'

const Notes = (props) => {
    const { showAlert } = props
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('date') // 'date' or 'title'
    const [sortOrder, setSortOrder] = useState('desc') // 'asc' or 'desc'

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setIsLoading(true)
                await props.getNotes()
            } catch (error) {
                console.error('Error fetching notes:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchNotes()
    }, [props])

    const filteredNotes = props.notes
        .filter(note => 
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'date') {
                return sortOrder === 'desc' 
                    ? new Date(b.date) - new Date(a.date)
                    : new Date(a.date) - new Date(b.date)
            } else {
                return sortOrder === 'desc'
                    ? b.title.localeCompare(a.title)
                    : a.title.localeCompare(b.title)
            }
        })

    const pinnedNotes = filteredNotes.filter(note => note.isPinned)
    const unpinnedNotes = filteredNotes.filter(note => !note.isPinned)

    return (
        <div className="container my-3">
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="input-group">
                        <span className="input-group-text" style={{ backgroundColor: props.mode === "dark" ? "rgb(9 48 80)" : "white", color: props.mode === "dark" ? "white" : "#042743" }}>
                            <i className="fas fa-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ backgroundColor: props.mode === "dark" ? "rgb(9 48 80)" : "white", color: props.mode === "dark" ? "white" : "#042743" }}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="d-flex justify-content-end gap-2">
                        <div className="btn-group">
                            <button
                                className={`btn btn-outline-primary ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <i className="fas fa-th-large"></i>
                            </button>
                            <button
                                className={`btn btn-outline-primary ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                <i className="fas fa-list"></i>
                            </button>
                        </div>
                        <div className="btn-group">
                            <button
                                className={`btn btn-outline-primary ${sortBy === 'date' ? 'active' : ''}`}
                                onClick={() => setSortBy('date')}
                            >
                                <i className="fas fa-calendar"></i>
                            </button>
                            <button
                                className={`btn btn-outline-primary ${sortBy === 'title' ? 'active' : ''}`}
                                onClick={() => setSortBy('title')}
                            >
                                <i className="fas fa-font"></i>
                            </button>
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                            >
                                <i className={`fas fa-sort-${sortOrder === 'desc' ? 'down' : 'up'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AddNote showAlert={showAlert} mode={props.mode} />

            {isLoading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2" style={{ color: props.mode === "dark" ? "white" : "#042743" }}>Loading your notes...</p>
                </div>
            ) : (
                <div className={`row ${viewMode === 'list' ? 'flex-column' : ''}`}>
                    <AnimatePresence>
                        {filteredNotes.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="col-12 text-center my-5"
                            >
                                <div className="empty-state">
                                    <i className="fas fa-sticky-note fa-3x mb-3" style={{ color: props.mode === "dark" ? "white" : "#042743" }}></i>
                                    <h3 style={{ color: props.mode === "dark" ? "white" : "#042743" }}>No Notes Found</h3>
                                    <p style={{ color: props.mode === "dark" ? "white" : "#042743" }}>
                                        {searchQuery ? 'No notes match your search.' : 'Start by adding a new note!'}
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <>
                                {pinnedNotes.length > 0 && (
                                    <div className="col-12 mb-4">
                                        <h4 className="mb-3" style={{ color: props.mode === "dark" ? "white" : "#042743" }}>
                                            <i className="fas fa-thumbtack me-2"></i>
                                            Pinned Notes
                                        </h4>
                                        <div className={`row ${viewMode === 'list' ? 'flex-column' : ''}`}>
                                            {pinnedNotes.map((note) => (
                                                <motion.div
                                                    key={note._id}
                                                    className={viewMode === 'list' ? 'col-12 mb-3' : 'col-md-4 mb-4'}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <NoteItem
                                                        note={note}
                                                        deleteNote={props.deleteNote}
                                                        editNote={props.editNote}
                                                        mode={props.mode}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {unpinnedNotes.length > 0 && (
                                    <div className="col-12">
                                        {pinnedNotes.length > 0 && (
                                            <h4 className="mb-3" style={{ color: props.mode === "dark" ? "white" : "#042743" }}>
                                                Other Notes
                                            </h4>
                                        )}
                                        <div className={`row ${viewMode === 'list' ? 'flex-column' : ''}`}>
                                            {unpinnedNotes.map((note) => (
                                                <motion.div
                                                    key={note._id}
                                                    className={viewMode === 'list' ? 'col-12 mb-3' : 'col-md-4 mb-4'}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <NoteItem
                                                        note={note}
                                                        deleteNote={props.deleteNote}
                                                        editNote={props.editNote}
                                                        mode={props.mode}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}

export default Notes 