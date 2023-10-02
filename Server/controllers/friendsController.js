const connection = require('../db');


/**
 * @param {*} req from->to. each row contains a mapping from user_id to friend_id. 
 * Controller method to add a new friend
 */
module.exports.addFriend = async (req, res, next) => {
  try {
    const { from, to} = req.body;

    // Create a new friend in the database
    const insertQuery = `
      INSERT INTO friend_table (user_id, friend_id)
      VALUES (?, ?);
    `;
    const values = [from, to];

    connection.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Error adding friend: ', err);
        return res.json({ msg: 'Failed to add friend' });
      }

      return res.json({ msg: 'Friend added successfully' });
    });
  } catch (ex) {
    next(ex);
  }
};

/**
 * Controller method to retrieve all friends of a user
 * @param {id} req id of the user 
 */
module.exports.getFriends = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        // Get all friends of the user
        const selectQuery = `
        SELECT u.id, u.username, u.email, u.photo_url
        FROM user_table u
        INNER JOIN friend_table f ON u.id = f.friend_id
        WHERE f.user_id = ?;
        `;
        connection.query(selectQuery, [id], (err, rows) => {
        if (err) {
            console.error('Error retrieving friends: ', err);
            return res.json({ msg: 'Failed to retrieve friends' });
        }
    
        // Return the list of friends
        return res.json({ msg: 'Friends retrieved successfully', friends: rows });
        });
    } catch (ex) {
        next(ex);
    }
    }

  module.exports.getPossibleFriends = async (req, res, next) => { 
    // get all users that are not friends and not the user.
    try {
        const { id } = req.params;
    
        const selectQuery = `
        SELECT id, username FROM user_table
        WHERE id != ? AND id NOT IN (SELECT friend_id FROM friend_table WHERE user_id = ?)
        `;
        connection.query(selectQuery, [id, id], (err, rows) => {
        if (err) {
            console.error('Error retrieving friends: ', err);
            return res.json({ msg: 'Failed to retrieve friends' });
        }
        
        // return a list of name, id pairs using these ids
        console.log(rows[0]);

        return res.json({ msg: 'Friends retrieved successfully', friends: rows });
        });
    } catch (ex) {
        next(ex);
    }

  }