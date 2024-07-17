import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const UserListContext = createContext();
const UserListProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      const data = await axios.get("/api/lists/fetchListsByUserId", {
        headers: {
          authorization: `${JSON.parse(localStorage.getItem("auth")).token}`,
        },
      });
      setUserList(data.data.existingList.lists);
      console.log("data ", userList);
    };
    fetchUserList();
    //eslint-disable-next-line
  }, []);

  return (
    <UserListContext.Provider value={[userList, setUserList]}>
      {children}
    </UserListContext.Provider>
  );
};

// custom hook
const useUserList = () => useContext(UserListContext);

export { useUserList, UserListProvider };
