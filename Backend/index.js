const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes')
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const user = require('./Model/user');
const messages = require('./Model/message');
const conversation = require('./Model/conversation');




//Socket.io configuration
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});


const users = {};

io.on('connection', (socket) => {
    console.log('User connected');


    // Listen for chat messages
    socket.on('chat message', (msg, receiverName, senderName, senderEmail) => {

        console.log('Message: ' + msg + ', Receiver Name: ' + receiverName);

        // Get the receiver's socket ID from the users object
        const receiverId = users[receiverName];


        //Save the Messages to database
        conversation.create({
            msg: senderName,
            email: senderEmail

        }).then((res) => {

            messages.create({
                sender: senderName,
                message: msg,
                receiver: receiverName,
                email: senderEmail,

            }).then((messages) => {
                console.log("Messages saved to database");
            }).catch((error) => {
                console.log("Failed to save messages to database");
            });
        }).catch((err) => {
            console.log("Failed to Store Messages: " + err);
        })


        // Emit the message to the receiver only
        io.to(receiverId).emit('chat message', msg, senderName);
    });




    // Handle new user connections
    socket.on('new user', (userName) => {
        console.log('New user: ' + userName);
        // Add the user to the users object
        users[userName] = socket.id;
        console.log(users);
    });




    // Handle disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected');
        // Remove the user from the users object
        Object.keys(users).forEach((key) => {
            if (users[key] === socket.id) {
                delete users[key];
            }
        });
    });

});













//Normal code
const js = bodyParser.json({ limit: '25mb' });
const urlencodedParser = bodyParser.urlencoded({ extended: false, limit: '25mb' })

app.use("/upload", express.static("./upload"));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(js)
app.use(urlencodedParser);
app.use(routes)






//{ force: true }
sequelize.sync().then(result => {
    console.log("Database: Created Successfully");

    server.listen(4000, () => {
        console.log("listening on: 4000...");
    });

}).catch(err => {
    console.log(err);
});

