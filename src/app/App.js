import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Chat from "./components/Chat";
import JoinBlock from "./components/JoinBlock";
import socket from "./socket";
import { getJoined, receiveMessage, receiveUsers } from "./store/chat";

function App() {
  const joined = useSelector(getJoined());

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("ROOM:SET_USERS", (users) => {
      dispatch(receiveUsers(users));
    });
    socket.on("ROOM:NEW_MESSAGE", (message) => {
      dispatch(receiveMessage(message));
    });

    return;
  }, [dispatch]);

  return <div className="wrapper">{!joined ? <JoinBlock /> : <Chat />}</div>;
}

export default App;
