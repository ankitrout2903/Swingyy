const connection = require('../db')

// Controller method to add a new message1
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, createdAt} = req.body;

    // Create a new message in the database
    const insertQuery = `
      INSERT INTO message_table (message, sender_mail, reciever_mail, createdAt)
      VALUES (?, ?, ?, ?);
    `;
    const values = [message, from, to, createdAt];

    connection.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Error adding message: ', err);
        return res.json({ msg: 'Failed to add message' });
      }

      return res.json({ msg: 'Message added successfully' });
    });
  } catch (ex) {
    next(ex); // Pass the error to the next error-handling middleware
  }
};

// Controller method to retrieve messages between two users
module.exports.getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    // Find messages between the specified sender and receiver, sorted by createdAt in ascending order
    const selectQuery = `
      SELECT m.message AS message, m.createdAt AS time,
        (m.sender_mail = ?) AS fromSelf
      FROM message_table m
      WHERE (m.sender_mail = ? AND m.reciever_mail = ?)
      ORDER BY m.createdAt ASC;
    `;
    const values = [from, from, to];

    connection.query(selectQuery, values, (err, rows) => {
      if (err) {
        console.error('Error retrieving messages: ', err);
        return res.json([]);
      }

      // Map the retrieved messages to a new format for response
      const projectMessages = rows.map((row) => ({
        fromSelf: row.fromSelf,
        message: row.message,
        time: row.time,
      }));

      res.json(projectMessages);
    });
  } catch (ex) {
    next(ex); // Pass the error to the next error-handling middleware
  }
};