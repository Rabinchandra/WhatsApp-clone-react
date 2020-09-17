import React, { useState, useEffect } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import SearchIcon from "@material-ui/icons/Search";
import Room from "./Room";
import { db } from "../firebase/config";

function Sidebar({ setRoomId, setCurrentRoomName, user }) {
  const [rooms, setRooms] = useState([]);

  // Get rooms
  useEffect(() => {
    db.collection("room").onSnapshot((snap) => {
      let documents = [];
      snap.docs.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data(),
          avatarUrl: `https://avatars.dicebear.com/api/human/${parseInt(
            Math.random() * 1000
          )}.svg`,
        });
      });
      setRooms(documents);
    });
  }, []);

  // Add a new room
  const addRoom = () => {
    const input = prompt("Enter the room name");
    db.collection("room").add({
      name: input,
    });
  };

  return (
    <div className="sidebar">
      <section className="sidebar__header">
        <div className="profile__photo">
          <Avatar src={user.photoURL} />
        </div>
        <div className="sidebar-top__buttons">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </section>

      <section className="sidebar-search__wrapper">
        <div className="sidebar__search">
          <SearchIcon />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </section>

      <section className="add-new__room" onClick={addRoom}>
        <h3>Add New Room</h3>
      </section>

      <section className="rooms__list">
        {rooms.map((room) => (
          <Room
            name={room.name}
            avatarUrl={room.avatarUrl}
            key={room.id}
            id={room.id}
            setRoomId={setRoomId}
            setCurrentRoomName={setCurrentRoomName}
          />
        ))}
      </section>
    </div>
  );
}

export default Sidebar;
