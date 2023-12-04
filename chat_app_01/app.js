const createError = require('http-errors');
const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { isEmpty } = require('lodash');
const cors = require('cors');
const { Server } = require("socket.io");
const { generateRoomId } = require('./src/utils/validation');
const { chat_services } = require('./src/services/common_services');
const { MESSAGE_STATUS } = require('./src/utils/constants');
const port = process.env.PORT || 8080;

const app = express();

// const allowedOrigins = ['https://f699-157-35-45-146.ngrok-free.app'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// app.use(cors(corsOptions));


let server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
});
app.use(cors());

function returnSocketIds(roomId) {
  return io.sockets.adapter.rooms.get(roomId);
}

io.use(async (socket, next) => {
  const email = socket.handshake.headers.email;
  // const email = socket.handshake.query.email;
  if (!email) {
    return next(new Error("No email provided"));
  }
  let socket_data = {
    socketID: socket.id,
  }
  socket_data = JSON.stringify(socket_data);
  const response = await chat_services.getAndUpdateUserInfo(email, socket_data);
  if (!response.user_exist) {
    io.emit("auth_event", "Unauthorized");
    return next(new Error("Authenciation falied"));
  }
  socket.user_name = response.user_data[0].user_name;
  socket.user_id = response.user_data[0].id;
  socket.user_data = response.user_data;
  io.emit("auth_event", "I am authorized user");
  next();
})


  .on('connection', async (socket) => {
    console.log('inside OnConnection event with socket ID: ', socket.id, socket.user_name);

    //update user's status:::::
    const user_status = await chat_services.updateOnlineStatus(socket.user_id);
    console.log('user status updated::::::::: ONLINE');

    //connected user details events and status;
    socket.emit("session", { user_id: socket.user_id, user_name: socket.user_name, data: socket.user_data });
    socket.emit("user_status", true);

    //get all chat-users of user(id)  
    //emit all unread messages of user
    //incomplete::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::(query)pending
    const response = await chat_services.getAllUsers_UnreadMessages(socket.user_id);
    //if users is online set all undelivered message to delivered here:::::::::::::::::::::::pending
    // console.log('get_chat_users_list event response is:::::::::', response);
    // if (response.chat_users === false) {
    //   io.emit('All_users_with_unread_messages', (response, `No chat Users associate with id : ${socket.user_id}`));
    // }
    // else {
    //   io.emit('All_users_with_unread_messages', { response });
    // }


    //##################################################join room event##############################################
    //join room id
    socket.on('join_room', async (user_two) => {

      try {
        //getting user data:::
        const userOneData = await chat_services.getUserById(socket.user_id);
        const userTwoData = await chat_services.getUserById(user_two);
        let users = [];

        //if both of the user exists::::
        if (userTwoData.user_exist) {
          users = [...users, userOneData, userTwoData];

          //if both the users have common room ID:::::
          const response = await chat_services.checkUsersRoomId(socket.user_id, user_two);
          console.log('Checking users having common room ID:', response);

          if (response.Isroom_id) {

            //join the common room by both users
            //check both users have socketInfo != NULL::::::::::pending
            users.forEach((user) => {
              const socketInfo = JSON.parse(user.user_data.socket_info);
              io.sockets.sockets.get(socketInfo.socketID)?.join(response.room_id);
              console.log(`${socketInfo.socketID} - ${user.user_data.user_name} joins the existing room with ID: ${response.room_id}`);
            });

            const allSockets = returnSocketIds(response.room_id);
            console.log('sockets that joined room::::::::::::', allSockets);

            //get and emit all the past messages of common room_id here::::
            const previous_msg = await chat_services.getUsersPrevMessages(response.room_id);
            socket.emit("previous_message", (previous_msg));


            //sending and receiving messages::::::pending
            socket.on('send_message', async (message) => {
              io.to(response.room_id).emit('recieve_message', { sender: socket.user_name, message });
              console.log(`${socket.id} - ${socket.user_name} sends this message: ${message} to the room with ID: ${response.room_id}`);

              //save sent messages to DB here::::
              const message_saved_id = await chat_services.insertNewMessages(message, socket.user_id, response.room_id);
              console.log(`inserted message ID in room Id ${response.room_id}::::::::::`, message_saved_id);

              //set messageStatusHandler here:::::
              const recepient_user = await chat_services.getUserById(user_two);
              const recipient_user_info = JSON.parse(recepient_user.user_data.user_info);
              const message_status = recipient_user_info.status === 'online' ? MESSAGE_STATUS.ONLINE : MESSAGE_STATUS.OFFLINE;
              console.log(`user is ${recipient_user_info.status}...........................`);
              const msg_handler = await chat_services.insertNewMessageHandler(message_saved_id, user_two, message_status);

              //read receipt from client:::::::pending
            });
          }
          //for new roomId
          else {
            const newRoomId = generateRoomId();
            users.forEach((user) => {
              const socketInfo = JSON.parse(user.user_data.socket_info);
              io.sockets.sockets.get(socketInfo.socketID)?.join(newRoomId);
              console.log(`${socketInfo.socketID} - ${user.user_data.user_name} joins the room with ID: ${newRoomId}`);
            });
            const allSockets = returnSocketIds(newRoomId);
            console.log('sockets that joined room::::::::::::', allSockets);

            //save new room ID with both users to DB here:::::pending
            const response = await chat_services.insertNewRoomIntoRooms(newRoomId, socket.user_id, user_two);
            // console.log('new room added response::::::::::', response);

            socket.on('send_message', async (message) => {
              if (typeof message === 'string') {
                const message_saved_id = await chat_services.insertNewMessages(message, socket.user_id, newRoomId);
                console.log(`messages fetched of new-room_id ${newRoomId}::::::::::`, message_saved_id);
                if (message_saved_id) {

                  io.to(newRoomId).emit('recieve_message', { sender: socket.user_name, message });
                  console.log(`${socket.id} - ${socket.user_name} sends this message: ${message} to the room with ID: ${newRoomId}`);

                  //set messageStatusHandler here:::::pending
                  const recepient_user = await chat_services.getUserById(user_two);

                  const recipient_user_info = JSON.parse(recepient_user.user_data.user_info);
                  const message_status = recipient_user_info.status === 'online' ? MESSAGE_STATUS.ONLINE : MESSAGE_STATUS.OFFLINE;
                  console.log(`user is ${recipient_user_info.status} and saved to handler...........................`);
                  const msg_handler = await chat_services.insertNewMessageHandler(message_saved_id, user_two, message_status);
                }
                else {
                  console.log('message not save to DB::::::::::::::::')
                }
              }
              else {
                console.log('invalid message form client:::::::::::::');
              }

              //read receipt from client:::::::pending
            });
          }
        }
        else {
          socket.emit("user_error", "Both/anyone user doest not exist")
          return new Error("Both/anyone user doest not exist");
        }
      }
      catch (error) {
        console.log("Error occured:::", error);
      }
    });

    //#########################################################################################################
    //pending state:::::::::::::::::::::::::::::::::::::
    //add resctriction::: more than two users::::::::pending
    socket.on('create_group', async (group_info, participants_array) => {

      if (typeof group_info === 'object' && typeof participants_array === 'object') {

        //check every user_id existance and admin_state:::::::::
        let invalid_users = [];
        let valid_users = [];
        for (let participants of participants_array) {
          let check_user = await chat_services.getUserById(participants.user_id);
          if (!check_user.user_exist) {
            invalid_users.push(participants);
          }
          else {
            valid_users.push(check_user);
          }
        }
        //if user is not avaliable then return new error with user not found!!!!:::::::::::
        if (invalid_users.length > 0) {
          console.log('invalid users', invalid_users);
        }
        else {
          console.log('valid users::::::::', valid_users);
          //if users avalibale then rest will go
          const newRoomId = generateRoomId();
          group_info = JSON.stringify(group_info);
          const response = await chat_services.create_new_group(newRoomId, group_info, participants_array);
          console.log('new room generated response>>>>>>>>>>>>>>>', response);
          socket.emit('generated_room_Id', response);

          // if return true from database then join all users to that room::::::::::::
          if (response.room_generated) {
            valid_users.forEach((user) => {
              const socketInfo = JSON.parse(user.user_data.socket_info);
              io.sockets.sockets.get(socketInfo.socketID)?.join(newRoomId);
              console.log(`${socketInfo.socketID} - ${user.user_data.user_name} joins the room with ID: ${newRoomId}`);
            });

            const allSockets = returnSocketIds(newRoomId);
            console.log('sockets that joined room::::::::::::', allSockets);

            //after joining room then users can send and receive messages:::::::::::::::::::
            socket.on('send_message', async (message) => {

              //save message to database before sending/receiving:::::::::::::::::::::::
              const message_saved_id = await chat_services.insertNewMessages(message, socket.user_id, newRoomId);
              console.log(`saved message ID ::::::::::`, message_saved_id);
              if (message_saved_id) {
                io.to(newRoomId).emit('recieve_message', { sender: socket.user_name, message });
                console.log(`${socket.id} - ${socket.user_name} sends this message: ${message} to the room with ID: ${newRoomId}`);

                //insert new handler to messageStatusHandler:::::::::::::::::::::::::::::::::pending
                for (let user of participants_array) {
                  if (user.user_id !== socket.user_id) {
                    const recepient_user = await chat_services.getUserById(user.user_id);

                    const recipient_user_info = JSON.parse(recepient_user.user_data.user_info);
                    const message_status = recipient_user_info.status === 'online' ? MESSAGE_STATUS.ONLINE : MESSAGE_STATUS.OFFLINE;
                    console.log(`user is ${recipient_user_info.status} and saved to handler...........................`);
                    const msg_handler = await chat_services.insertNewMessageHandler(message_saved_id, user.user_id, message_status);
                  }
                }
              }
              else {
                console.log('message not saved to database', message_saved_id);
              }
            });
          }
          else {
            console.log('Error while generating room ID', response);
          }

        }
      }
      else {
        console.log('Invalid data received from client :::');
      }

    });
    //pending state:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    socket.on('join_group', async (room_id) => {

      //check if room id exists and type group
      //also get all members of that group
      const response = await chat_services.verify_room_id(room_id);
      console.log('room ID response from DB:::::::::::::', response);
      if (!response.isRoomId) {
        //if not exists
        //return false falg to client::::::::::::::
        console.log('No room exixts with that id', response);
      }
      else {
        if (response.room_id_data[0].group_type === 'group') {

          let valid_users = [];
          for (let participants of response.room_id_members) {
            let get_user = await chat_services.getUserById(participants.user_id);
            valid_users.push(get_user);
          }
          valid_users.forEach((user) => {
            const socketInfo = JSON.parse(user.user_data.socket_info);
            io.sockets.sockets.get(socketInfo.socketID)?.join(room_id);
            console.log(`${socketInfo.socketID} - ${user.user_data.user_name} joins the room with ID: ${room_id}`);
          });

          const allSockets = returnSocketIds(room_id);
          console.log('sockets that joined room::::::::::::', allSockets);

          //after joining room then users can send and receive messages:::::::::::::::::::
          socket.on('send_message', async (message) => {

            //save message to database before sending/receiving:::::::::::::::::::::::
            const message_saved_id = await chat_services.insertNewMessages(message, socket.user_id, room_id);
            console.log(`saved message ID ::::::::::`, message_saved_id);
            if (message_saved_id) {
              io.to(room_id).emit('recieve_message', { sender: socket.user_name, message });
              console.log(`${socket.id} - ${socket.user_name} sends this message: ${message} to the room with ID: ${room_id}`);

              //insert new handler to messageStatusHandler:::::::::::::::::::::::::::::::::pending
              for (let user of response.room_id_members) {
                if (user.user_id !== socket.user_id) {
                  const recepient_user = await chat_services.getUserById(user.user_id);

                  const recipient_user_info = JSON.parse(recepient_user.user_data.user_info);
                  const message_status = recipient_user_info.status === 'online' ? MESSAGE_STATUS.ONLINE : MESSAGE_STATUS.OFFLINE;
                  console.log(`user is ${recipient_user_info.status} and saved to handler...........................`);
                  const msg_handler = await chat_services.insertNewMessageHandler(message_saved_id, user.user_id, message_status);
                }
              }
            }
            else {
              console.log('message not saved to database', message_saved_id);
            }
          });

        }
        else {
          console.log('Room ID does not associate with any group');
        }
      }


    });


    //under process::::::pending
    const serverShutdown = async () => {
      const user_status = await chat_services.updateofflineStatus(socket.user_id);
      socket.disconnect(true);

      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    }
    // Handle SIGINT signal (Ctrl+C) for server shutdown
    process.on('SIGINT', serverShutdown);

    //handle disconnection event here:
    socket.on('disconnect', async () => {
      console.log('Disconnected ID:', socket.id, socket.user_name);
      //update user's info status to offline when disconnectd:::::
      const user_status = await chat_services.updateofflineStatus(socket.user_id);
      socket.emit("user_status", false);
      console.log('user status updated::::::::::::::: OFFLINE');
      // const response = await chat_services.getAndUpdateUserInfo(socket.handshake.headers.email, null);
    });

    //updating users about section::::::::
    socket.on('update_about', async (about) => {
      const update_about = await chat_services.update_user_about(socket.user_id, about);
      console.log('user_info about section updated::::', about, update_about);
      //check for error here:: updated or not:::::::pending
      socket.emit('success_message', 'about section updated');
    });

    //updating users profile_url section::::::::::
    socket.on('update_profile_url', async (profile_url) => {
      const update_profile_url = await chat_services.update_user_profile_url(socket.user_id, profile_url);
      console.log('user_info profile_url section updated::::', profile_url, update_profile_url);
      //check for error here:: updated or not:::::::pending
      socket.emit('success_message', 'profile_url section updated');
    });

    //updating users contact section::::::::
    socket.on('update_contact', async (contact) => {
      const update_contact = await chat_services.update_user_contact(socket.user_id, contact);
      console.log('user_info contact section updated::::', contact, update_contact);
      //check for error here:: updated or not:::::::pending
      socket.emit('success_message', 'contact section updated');
    });

    //broadcasting events here::::::pending


  });


server.listen(port, () => {
  console.log(`Socket.IO server listening on port ${port}...`);
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
