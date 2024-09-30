'use client'
import { useEffect, useState } from 'react'
import { deleteNote  } from '../app/actions/noteActions'
import { client } from '@/utils/appwrite'

const NoteList = ({ initialNotes = [] }) => {
  const [notes, setNotes] = useState(initialNotes)



  useEffect(() => {
    const channel = 'databases.notesApp.collections.notes.documents'

    const unsubscribe = client.subscribe(channel, (response) => {
      const eventType = response.events[0]


      const changedNote = response.payload

      if(eventType.includes("create")) {
        setNotes((prevNotes) => [changedNote, ...prevNotes])
      }

      if (eventType.includes("delete")) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.$id !== changedNote.$id))
      }
    })

    return () => unsubscribe()
  },[])

  const handleDelete = async (noteId) => {
    await deleteNote(noteId)
    const updatedNotes = notes.filter(note => note.$id !== noteId)
    setNotes(updatedNotes)
  }

  return (
    <div className="flex flex-wrap gap-4 w-full max-w-4xl mt-8">
      {
        notes.length > 0 ? notes.map((note) => (
          <div 
            key={note.$id} 
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33%-12px)]"
          >
            <p className="text-gray-800 mb-4">{note.content}</p>
            <button 
              onClick={() => handleDelete(note.$id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        )) : (
          <p className="text-center text-gray-500 py-4">No notes available</p>
        )
      }
    </div>
  )
}

export default NoteList
