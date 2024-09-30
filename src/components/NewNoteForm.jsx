'use client'
import { createNote } from '@/app/actions/noteActions'
import { useState } from 'react'

const NewNoteForm = () => {
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (content.trim() !== '') {
      const addNote = await createNote(content)
      console.log(addNote)
      setContent("")
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-lg"
    >
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="w-full h-28 p-4 mb-4 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
      />
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add Note
      </button>
    </form>
  )
}

export default NewNoteForm
