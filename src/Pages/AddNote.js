import React, { useState } from 'react'
import { motion } from 'framer-motion'

const AddNote = (props) => {
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const [isExpanded, setIsExpanded] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        if (!note.title.trim()) {
            newErrors.title = 'Title is required'
        } else if (note.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters'
        }
        if (!note.description.trim()) {
            newErrors.description = 'Description is required'
        } else if (note.description.length < 5) {
            newErrors.description = 'Description must be at least 5 characters'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleClick = () => {
        setIsExpanded(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) {
            return
        }
        setIsSubmitting(true)
        try {
            await props.addNote(note.title, note.description, note.tag)
            setNote({ title: "", description: "", tag: "" })
            setIsExpanded(false)
            setErrors({})
        } catch (error) {
            console.error('Error adding note:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const onChange = (e) => {
        const { name, value } = e.target
        setNote(prev => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    return (
        <motion.div
            className="container my-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="card"
                style={{
                    backgroundColor: props.mode === "dark" ? "rgb(9 48 80)" : "white",
                    color: props.mode === "dark" ? "white" : "#042743",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                }}
                whileHover={{ scale: 1.01 }}
            >
                <div className="card-body">
                    <h2 className="card-title mb-4">Add a Note</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                id="title"
                                name="title"
                                value={note.title}
                                onChange={onChange}
                                onClick={handleClick}
                                required
                                minLength={3}
                                style={{
                                    backgroundColor: props.mode === "dark" ? "rgb(9 48 80)" : "white",
                                    color: props.mode === "dark" ? "white" : "#042743"
                                }}
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                        </div>
                        <motion.div
                            className="mb-3"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                id="description"
                                name="description"
                                value={note.description}
                                onChange={onChange}
                                rows="3"
                                required
                                minLength={5}
                                style={{
                                    backgroundColor: props.mode === "dark" ? "rgb(9 48 80)" : "white",
                                    color: props.mode === "dark" ? "white" : "#042743"
                                }}
                            />
                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                        </motion.div>
                        <motion.div
                            className="mb-3"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tag"
                                name="tag"
                                value={note.tag}
                                onChange={onChange}
                                style={{
                                    backgroundColor: props.mode === "dark" ? "rgb(9 48 80)" : "white",
                                    color: props.mode === "dark" ? "white" : "#042743"
                                }}
                            />
                        </motion.div>
                        <motion.button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Adding Note...
                                </>
                            ) : (
                                'Add Note'
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default AddNote 