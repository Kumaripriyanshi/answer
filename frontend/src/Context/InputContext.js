import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const InputContext = createContext();
const InputProvider = ({ children }) => {
  const [input, setInput] = useState("");

  return (
    <InputContext.Provider value={[input, setInput]}>
      {children}
    </InputContext.Provider>
  );
};

// custom hook
const useInput = () => useContext(InputContext);

export { useInput, InputProvider };
