import Header from "./components/Header";
import AddFormBox from "./components/AddFormBox";
import List from "./components/List";
import Footer from "./components/Footer";
import { useEffect, useReducer } from "react";

import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return { items: [...state.items, action.payload] };

    case "TOGGLE_BOLD": {
      const updatedItems = state.items.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isBold: !item.isBold };
        }
        return item;
      });
      return { items: updatedItems };
    }

    case "DELETE": {
      const updatedItmes = state.items.filter(
        (item) => item.id !== action.payload
      );

      return { items: updatedItmes };
    }

    case "TOGGLE_FORM":
      return { ...state, formIsOpen: !state.formIsOpen };

    case "SET_QUERY": {
      const tempItems = state.items;

      if (action.payload === "")
        return {
          ...state,
          items: JSON.parse(localStorage.getItem("items")),
          query: "",
        };
      else {
        const updatedList = tempItems.filter((item) => {
          return (
            item.text.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
          );
        });

        return { ...state, items: updatedList, query: action.payload };
      }
    }

    default:
      return "Unknown!";
  }
};

export default function App() {
  const initialState = {
    items: JSON.parse(localStorage.getItem("items")) || [],
    formIsOpen: false,
    query: "",
  };

  const [{ items, formIsOpen, query }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (!query) localStorage.setItem("items", JSON.stringify(items));
  }, [query, items]);

  useEffect(() => {
    const handleUserKeyPress = (event) => {
      const { key } = event;

      if (key === "Backspace") dispatch({ type: "SET_QUERY", payload: "" });
    };

    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [query]);

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="text-white max-w-3xl mx-auto">
        <Header
          dispatch={dispatch}
          formIsOpen={formIsOpen}
          query={query}
        />

        <main>
          {formIsOpen && <AddFormBox dispatch={dispatch} />}
          <List
            query={query}
            items={items}
            dispatch={dispatch}
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}
