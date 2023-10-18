import Item from "./Item";

/* eslint-disable react/prop-types */
export default function List({ items, dispatch, query }) {
  // Create an empty object to store the mini arrays with topics as keys
  const topicGroups = {};

  // Loop through the items and group them by topic
  items.forEach((item) => {
    const { topic, ...rest } = item;
    if (!topicGroups[topic]) {
      topicGroups[topic] = [];
    }
    topicGroups[topic].push({ topic, ...rest });
  });

  // Convert the object with topics as keys into an array of mini arrays
  const bigArray = Object.entries(topicGroups).map(([topic, miniArray]) => ({
    [topic]: miniArray,
  }));

  return (
    <>
      {bigArray.length === 0 && !query && (
        <article className="text-center py-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 mx-auto text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>

          <p className="text-white mt-5">
            The list is empty for now, click on + button to create new items
          </p>
        </article>
      )}

      {bigArray.length === 0 && query && (
        <article className="text-center py-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 mx-auto text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>

          <p className="text-white mt-5">
            No items has this query &quot;<b>{query}</b>&quot; !
          </p>
        </article>
      )}

      {bigArray.map((item) => {
        // Get the topic and miniArray from each item
        const [topic, miniArray] = Object.entries(item)[0];

        return (
          <div
            className="mb-5 mx-5 md:mx-0"
            key={topic}
          >
            <h2 className="font-light mb-2 text-xs text-gray-300 uppercase tracking-wider">
              {topic}
            </h2>
            <ul className="bg-gray-800 p-5 rounded-lg space-y-3">
              {miniArray.map((subItem, index) => (
                <li key={index}>
                  <Item
                    item={subItem}
                    dispatch={dispatch}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}
