import React, { useState, useEffect } from 'react';
import { addFriendsRoute, getPossibleFriendsRoute } from '../../utils/APIRoutes';
import axios from 'axios';

/**
 * I am sorry I haven't done css on this, I am not a UI person.
 * @param {*} param0 
 * @returns 
 */
const FriendsPopup = ({ userId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [potentialFriends, setPotentialFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  
  // Fetch potential friends
  useEffect(() => {
    const fetchPotentialFriends = async () => {
      try {
        const response = await axios.get(`${getPossibleFriendsRoute}/${userId}`);
        setPotentialFriends(response.data.friends);
      } catch (error) {
        console.error('Error fetching potential friends:', error);
      }
    };
    fetchPotentialFriends();
  }, [userId]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleFriendSelect = (friendId) => {
    setSelectedFriends((prevSelected) => {
      if (prevSelected.includes(friendId)) {
        return prevSelected.filter((id) => id !== friendId);
      }
      return [...prevSelected, friendId];
    });
  };

  const addFriends = async () => {
    try {
      console.log('Adding friends:', selectedFriends);
      console.log('userId:', userId);
      const friendId = selectedFriends[0];
      await axios.post(`${addFriendsRoute}`, {
        from: userId,
        to: friendId,
      });
      setSelectedFriends([]); //clean up

      setShowPopup(false);
    } catch (error) {
      console.error('Error adding friends:', error);
    }
  };

  return (
    <div>
      <button onClick={togglePopup}>Open Users</button>
      {showPopup && (
        <div className="popup">
          <h2>Add Friends</h2>
          <ul>
            {potentialFriends.map((friend) => (
              <li key={friend.id}>
                <input
                  type="checkbox"
                  value={friend.id}
                  checked={selectedFriends.includes(friend.id)}
                  onChange={() => handleFriendSelect(friend.id)}
                />
                {friend.username}
              </li>
            ))}
          </ul>
          <button onClick={addFriends}>Add Selected Friends</button>
        </div>
      )}
    </div>
  );
};

export default FriendsPopup;
