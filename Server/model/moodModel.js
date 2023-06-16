const mongoose = require('mongoose');

// Controller method to send a mood
module.exports.sendMood = async (req, res, next) => {
    try {
      const { moodNumber, to } = req.body;
  
      // Validate the moodNumber
      if (typeof moodNumber !== 'number' || moodNumber < 1 || moodNumber > 6) {
        return res.json({ status: false, message: 'Invalid mood number' });
      }
  
      // Emit the mood to the specified user's room
      io.to(to).emit('mood-received', moodNumber);
  
      return res.json({ status: true, message: 'Mood sent successfully' });
    } catch (ex) {
      next(ex); // Pass the error to the next error-handling middleware
    }
  };
  
  // Controller method to handle the received mood
  module.exports.handleMood = async (socket, moodNumber) => {
    try {
      // Handle the mood based on the moodNumber
      switch (moodNumber) {
        case 1:
          console.log('Received mood: Happy');
          // Handle happy mood logic here
          break;
        case 2:
          console.log('Received mood: Sad');
          // Handle sad mood logic here
          break;
        case 3:
          console.log('Received mood: Excited');
          // Handle excited mood logic here
          break;
        case 4:
          console.log('Received mood: Angry');
          // Handle angry mood logic here
          break;
        case 5:
          console.log('Received mood: Funny');
          // Handle funny mood logic here
          break;
        case 6:
          console.log('Received mood: Love');
          // Handle love mood logic here
          break;
        default:
          console.log('Invalid mood number');
          break;
      }
    } catch (ex) {
      console.error('Error handling mood:', ex);
    }
  };
  