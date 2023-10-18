import { useState } from "react";

function generateRandomId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

/* eslint-disable react/prop-types */
export default function AddFormBox({ dispatch }) {
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("openings");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.length > 9) {
      setText("");

      dispatch({
        type: "CREATE",
        payload: {
          id: generateRandomId(8),
          text,
          topic,
          isBold: true,
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-5 md:mx-0 bg-gray-800 md:flex md:items-center md:justify-between md:gap-5 py-2 px-5 mb-10 rounded-lg"
    >
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="bg-transparent focus:outline-none px-4 pl-0 py-2 rounded-lg text-gray-300 placeholder:text-gray-500 flex-grow"
        placeholder="Type something..."
        autoFocus={true}
      />

      <select
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
        className="bg-gray-700 px-4 py-2 rounded-lg focus:outline-none block w-full md:inline-block md:w-auto mt-4 md:mt-0"
      >
        <option value="openings">Openings</option>
        <option value="middlegame">Middlegame</option>
        <option value="endgame">Endgame</option>
        <option value="tactics">Tactics</option>
        <option value="strategy">Strategy</option>
      </select>
      <button
        className="bg-blue-500 px-4 py-1 rounded-lg focus:outline-none block w-full mb-4 md:inline-block md:w-auto md:mb-0 mt-4 md:mt-0"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}
