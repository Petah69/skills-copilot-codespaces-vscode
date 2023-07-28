// Create web server
// Create a route to handle incoming requests
// When a request comes in, read the file comments.json
// Parse the file contents to a JavaScript object
// Add a new comment to the object
// Write the comments object back to the file
// Return a response to the client
// Send back the updated comments array as JSON

// Import the express module
const express = require('express');
// Create a new web server
const app = express();
// Import the fs module
const fs = require('fs');
// Import the body-parser module
const bodyParser = require('body-parser');
// Import the path module
const path = require('path');
// Import the comments.json file
const commentsPath = path.join(__dirname, 'comments.json');

// Setup the express app to use body-parser
app.use(bodyParser.json());

// Create a route to handle incoming requests
app.post('/comments', (req, res) => {
  // Read the comments.json file
  fs.readFile(commentsPath, 'utf8', (err, commentsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    // Convert the file contents to a JavaScript object
    const comments = JSON.parse(commentsJSON);
    // Add a new comment to the object
    comments.push(req.body);
    // Convert the comments object to JSON
    const updatedCommentsJSON = JSON.stringify(comments);
    // Write the comments object back to the file
    fs.writeFile(commentsPath, updatedCommentsJSON, (err) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
      // Send back the updated comments array as JSON
      res.send(comments);
    });
  });
});

// Start the web server on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});