import NewNoteForm from "@/components/NewNoteForm";
import NoteList from "@/components/NoteList";
import { getNotes } from "./actions/noteActions";



export default async function Home() {
  const notes = await getNotes();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Your Notes
      </h1>

      {/* Note List */}
      <NoteList initialNotes={notes} />

      {/* New Note Form */}
      <div className="w-full max-w-lg mt-10">
        <NewNoteForm />
      </div>

      {/* Footer */}
      <footer className="mt-8 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Note App. All rights reserved.
      </footer>
    </div>
  );
}
