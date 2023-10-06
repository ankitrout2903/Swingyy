import { useState, useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import "./style.css";

export default function Friends({ friends, changeChat }) {
  const [curFriendSelected, setCurFriendSelected] = useState(undefined);
  console.log(friends);
  function changeCurChat(index, friend) {
    setCurFriendSelected(index);
    changeChat(friend);
  }

  return (
    <div className="friends-container scroll-style">
      {friends.map((friend, index) => {
        return (
          <div
            className={`friend-container ${
              index === curFriendSelected ? "selected" : ""
            }`}
            key={index}
            onClick={() => changeCurChat(index, friend)}
          >
            <div className="friend-info">
              <img
                src={
                  friend.photo_url
                    ? friend.photo_url
                    : "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
                }
                alt="profile-pic"
                className="friend-profile-pic"
              />
              <h3>{friend.username}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
