import { useState } from "react";
import { DB_ID, COLLECTION_ID, databases } from "./lib/appwrite";
import { useEffect } from "react";
import { ID } from "appwrite";

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionText, setSuggestionText] = useState("");

  useEffect(() => {
    getSuggestions();
  }, []);

  async function getSuggestions() {
    const res = await databases.listDocuments(DB_ID, COLLECTION_ID);

    console.log(res);
    setSuggestions(res.documents.reverse());
  }

  async function addSuggestion(e) {
    e.preventDefault();

    if (suggestionText) {
      await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
        text: suggestionText,
      });

      setSuggestionText("");

      getSuggestions();
    }
  }

  async function updateDocument(id, completed) {
    await databases.updateDocument(DB_ID, COLLECTION_ID, id, {
      completed: completed,
    });

    getSuggestions();
  }

  async function deleteDocument(id) {
    await databases.deleteDocument(DB_ID, COLLECTION_ID, id);

    getSuggestions();
  }

  function handleInput(e) {
    setSuggestionText(e.target.value);
  }
  return (
    <main className="max-w-3xl w-full mx-auto">
      <form className="flex flex-col gap-4 my-6" onSubmit={addSuggestion}>
        <textarea
          value={suggestionText}
          onInput={handleInput}
          placeholder="Enter your task here"
          className="bg-slate-800 shadow-xl w-full h-20 p-4 rounded disabled:bg-slate-900
         disabled:placeholder:text-slate-500 disabled:curser-not-allowed"
        ></textarea>
        <button
          type="submit"
          className="bg-purple-900 px-6 py-2 rounded shadow ml-auto transition hover:bg-white
         hover:text-purple-900"
        >
          Send
        </button>
      </form>

      <ul className="space-y-4">
        {suggestions.map((suggestion) => (
          <li
            className="flex items-center border border-white/20 p-4 rounded shadow gap-2"
            key={suggestion.$id}
          >
            <span>{suggestion.completed ? "✅" : null}</span>
            {suggestion.text}
            <input
              className="ml-auto"
              type="checkbox"
              checked={suggestion.completed}
              onChange={() =>
                updateDocument(suggestion.$id, !suggestion.completed)
              }
            ></input>
            <button
              className="text-red-500 hover:text-red-800"
              onClick={() => deleteDocument(suggestion.$id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
