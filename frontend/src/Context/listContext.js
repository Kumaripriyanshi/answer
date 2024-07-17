import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const ListContext = createContext();
const ListProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("/api/lists/fetchLists");
      setPhotos(data.data.list);
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <ListContext.Provider value={[photos, setPhotos]}>
      {children}
    </ListContext.Provider>
  );
};

// custom hook
const useList = () => useContext(ListContext);

export { useList, ListProvider };
