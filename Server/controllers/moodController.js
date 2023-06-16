const connection = require('../db');

// Controller method to add a new mood
module.exports.addMood = async (req, res, next) => {
  try {
    const { sender_mail, receiver_mail, mood_id } = req.body;

    // Create a new mood entry in the database
    const insertQuery = `
      INSERT INTO mood_table (sender_mail, receiver_mail, mood_id)
      VALUES (?, ?, ?);
    `;
    const values = [sender_mail, receiver_mail, mood_id];

    connection.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Error adding mood: ', err);
        return res.json({ msg: 'Failed to add mood' });
      }

      return res.json({ msg: 'Mood added successfully' });
    });
  } catch (ex) {
    next(ex); // Pass the error to the next error-handling middleware
  }
};

// Controller method to retrieve moods between two users
module.exports.getMoods = async (req, res, next) => {
  try {
    const { sender_mail, receiver_mail } = req.body;

    // Find moods between the specified users
    const selectQuery = `
      SELECT *
      FROM mood_table
      WHERE sender_mail = ? AND receiver_mail = ?;
    `;
    const values = [sender_mail, receiver_mail];

    connection.query(selectQuery, values, (err, rows) => {
      if (err) {
        console.error('Error retrieving moods: ', err);
        return res.json([]);
      }

      res.json(rows);
    });
  } catch (ex) {
    next(ex); // Pass the error to the next error-handling middleware
  }
};
