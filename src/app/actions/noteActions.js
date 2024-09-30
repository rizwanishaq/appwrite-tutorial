import {databases} from '@/utils/appwrite'
import {ID} from 'appwrite'
export async function createNote(content) {
    const newNote = {content: content}
    const response = await databases.createDocument(
        'notesApp',
        'notes',
        ID.unique(),
        newNote
    )

    const note = {
        $id: response.$id,
        $createdAt: response.$createdAt,
        content: response.content,
    }

    return note
}

export async function getNotes () {
    const response = await databases.listDocuments('notesApp', 'notes')
    const notes = response.documents.map((doc) => ({
        $id: doc.$id,
        $createdAt: doc.$createdAt,
        content: doc.content,
    }))

    return notes
}


export async function deleteNote (noteID) {
    await databases.deleteDocument('notesApp', 'notes', noteID)
}