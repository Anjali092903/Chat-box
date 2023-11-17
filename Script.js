document.addEventListener("DOMContentLoaded", function () {
    // Your MongoDB connection string
    const mongoURI = 'mongodb://localhost:27017';

    // Connect to MongoDB
    const MongoClient = require('mongodb').MongoClient;
    let db;

    MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        console.log('Connected to MongoDB');
        db = client.db('your-database-name');
    });

    // Display a welcome message
    displayMessage("Welcome! How can I help you today?");
});

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();

    if (userMessage === '') return;

    // Display user's message
    displayMessage(`You: ${userMessage}`);

    // Fetch reply from MongoDB based on user's message
    fetchReplyFromMongoDB(userMessage);

    // Clear the input field
    userInput.value = '';
}

function displayMessage(message) {
    const chatDisplay = document.getElementById('chat-display');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    chatDisplay.appendChild(messageDiv);

    // Scroll to the bottom to show the latest messages
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function fetchReplyFromMongoDB(userMessage) {
    // Fetch reply from MongoDB based on user's message
    db.collection('responses').findOne({ pattern: userMessage.toLowerCase() }, (err, result) => {
        if (err) throw err;

        if (result) {
            // Display the chatbot's reply
            displayMessage(`Chatbot: ${result.reply}`);
        } else {
            // If no matching pattern found, display a default reply
            displayMessage("Chatbot: I'm sorry, I didn't understand that.");
        }
    });
}
