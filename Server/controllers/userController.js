const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db')

// Controller method to register a new user
module.exports.register = async (req, res, next) => {
  try {
    const { username, mail, password, uid } = req.body;

   /**
    * I changed the DB a little bit, I have removed the NOT NULL requirement in password because if you're signing in with google, you won't have their password.
    * the password field can be checked for not null if you create a separate login page though.
    */

      // Create a new user in the database
      const insertQuery = 'INSERT INTO user_table (email, username, password, uuid) VALUES (?, ?, ?, ?)';
      const values = [mail, username, password, uid];

      connection.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error('Error adding user: ', err);
          return res.json({ msg: 'Failed to register user', status: false });
        }
       //if registration is successful, return the user object
        return res.json({ status: true, user: { username , mail, password, _id: result.insertId },message : "User registered successfully" });

    });
  } catch (ex) {
    next(ex); // Pass the error to the next error-handling middleware
  }
};

/**
 * 
 * @param {mail} req mail of the user
 * @param {boolean} res status: boolean, user: {username, email, _id}
 * @param {*} next 
 */
module.exports.checkUser = async (req, res, next) => {
  try {
    const { mail } = req.body;
    const values = [mail];

    // Find the user by email
    const selectQuery = 'SELECT * FROM user_table WHERE email = ?';
    connection.query(selectQuery, values, (err, rows) => {
      if (err) {
        console.error('Error retrieving user: ', err);
        return res.json({ msg: 'An error occurred', status: false });
      }
      const user = rows[0];

      if (user) {
        return res.json({ status: true, user: { username: user.username, email: user.email, _id: user.id }, message: 'User exists' });
      } else {
        return res.json({ status: false, message: 'User does not exist' });
      }
    });
  } catch (ex) {
    next(ex);
  }
}

// Controller method to authenticate user login
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const selectQuery = 'SELECT * FROM user_table WHERE username = ?';
    connection.query(selectQuery, [username], (err, rows) => {
      if (err) {
        console.error('Error retrieving user: ', err);
        return res.json({ msg: 'An error occurred', status: false });
      }

      if (rows.length === 0) {
        return res.json({ msg: 'Invalid username/password', status: false });
      }

      const user = rows[0];

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (err) {
          console.error('Error comparing passwords: ', err);
          return res.json({ msg: 'An error occurred', status: false });
        }

        if (!isValidPassword) {
          return res.json({ msg: 'Invalid username/password', status: false });
        }

        // Generate JWT token
        const token = jwt.sign({ username, _id: user.id }, process.env.TOKEN_KEY, {
          expiresIn: 300,
        });

        // Set the token as a cookie
        res.cookie('token', token, {
          httpOnly: true,
        });

        // Remove the password field from the user object
        const returnedUser = {
          username,
          _id: user.id,
        };

        return res.json({ status: true, returnedUser });
      });
    });
  } catch (ex) {
    next(ex); // Pass the error to the next error-handling middleware
  }
};

// Controller method to get all users except the current user
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { email } = req.params;

    // Retrieve all users except the current user
    // const selectQuery = 'SELECT email, username , photo_url FROM swingyy.user_table WHERE email != ?';
    
    const selectQuery = 'SELECT * FROM swingyy.user_table;';
    connection.query(selectQuery, [email], (err, rows) => {
      if (err) {
        console.error('Error retrieving users: ', err);
        return res.json([]);
      }
      console.log(rows);

      // Sort the users by username in ascending order
      rows.sort((a, b) => a.username.localeCompare(b.username));
      

      return res.json(rows);
      
    });
  } catch (ex) {
    next(ex); // Pass the error to the next error-handling middleware
  }
};
