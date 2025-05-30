import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CityAutocomplete = ({ value, onChange, className }) => {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
          query
        )}&format=json&limit=5`
      )
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
        })
        .catch((err) => console.error(err));
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (suggestion, display) => {
    setQuery(display);
    onChange(display);
    setSuggestions([]);
  };

  return (
    <div> 
      <input
        type="text"
        className={className} 
        value={query}
        placeholder="Enter your city..."
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
        }}
      />
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              left: 0,
              right: 0,
              background: "#fff",
              padding: "0.5rem",
              margin: 0,
              border: "1px solid #514dc4",
              borderRadius: "7px",
            }}
          >
            {suggestions.map((suggestion) => {
              const parts = suggestion.display_name.split(",");
              const city = parts[0] ? parts[0].trim() : "";
              const country = parts[parts.length - 1]
                ? parts[parts.length - 1].trim()
                : "";
              const display = `${city}, ${country}`;
              return (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleSelect(suggestion, display)}
                  style={{ padding: "0.25rem 0", cursor: "pointer", listStyle: "none"}}
                >
                  {display}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CityAutocomplete;