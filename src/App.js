import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [currentRoomName, setCurrentRoomName] = useState("");

  return (
    <div className="App">
      <div className="green__bar"></div>
      {user ? (
        <div className="main">
          <BrowserRouter>
            <Sidebar
              setRoomId={setRoomId}
              setCurrentRoomName={setCurrentRoomName}
              user={user}
            />
            <Switch>
              <Route path="/chat/:id">
                <Chat
                  user={user}
                  roomId={roomId}
                  currentRoomName={currentRoomName}
                />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      ) : (
        <SignIn setUser={setUser} />
      )}
    </div>
  );
}

export default App;
