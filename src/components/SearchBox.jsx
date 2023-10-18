/* eslint-disable react/prop-types */

export default function SearchBox({ dispatch, query }) {
  return (
    <article>
      <input
        value={query || ""}
        onChange={(e) =>
          dispatch({ type: "SET_QUERY", payload: e.target.value })
        }
        type="text"
        placeholder="Search for something..."
        className="bg-gray-800 focus:outline-none px-4 py-2 rounded-lg focus:shadow-xl transition duration-300 ease-in-out text-gray-300 placeholder:text-gray-500 w-60 md:w-full"
      />
    </article>
  );
}
