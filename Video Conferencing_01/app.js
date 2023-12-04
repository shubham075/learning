const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();
let server = app.listen(3500, () => {
  console.log('listening to port 3500');
});
const io = require('socket.io')(server, {
  allowEIO3: true, // false by default
});

let AllUserConnection = [];
io.on('connection', (socket) => {
  console.log('Your socket id is: ', socket.id);

  //reciving connected user data from client side
  socket.on('connected_user', (data) => {
    // console.log('connected user data', data);

    //this holds other users connection info with same meeting ID
    let other_users = AllUserConnection.filter((ele) => {
      return ele.meeting_id == data.meetingID;
    });

    //store all other users connection infomation inculding my connections
    AllUserConnection.push({
      connectionID: socket.id,
      user_id: data.displayName,
      meeting_id: data.meetingID
    });
    // console.log('all-user-connection-data', AllUserConnection);
    // console.log('users-with-same-meeting-IDs', other_users);

    //inform other users about me;
    other_users.forEach((element) => {
      socket.to(element.connectionID).emit('inform_other_users_about_me', {
        connID: socket.id,  //this is my socket id
        other_user_id: data.displayName  //this is my user name
      });
    });
    socket.emit('inform_me_about_other_users', other_users);

  });

  socket.on('SDPProcess', (data) => {
    socket.to(data.connID).emit('SDPProcess', {
      message: data.message,
      from_connID: socket.id
    })
  });

  socket.on('sendMessage', (msg) => {
    // console.log('from server----- user message::', msg);
    //getting message_user data from all user connections
    let mUser = AllUserConnection.find((v) => {
      return v.connectionID == socket.id;
    });
    if (mUser) {
      // console.log('message_user_data:::', mUser);
      //getting user meetingID
      let meeting_id = mUser.meeting_id;
      // console.log(meeting_id)
      let from = mUser.user_id;
      //getting all users with same meetingID
      let list = AllUserConnection.filter((v) => {
        return v.meeting_id == meeting_id;
      });
      // console.log('all users connection list:::', AllUserConnection);
      // console.log('list of users with same meeting ID::', list);
      //sending input message to users with same meeting ID
      list.forEach((e) => {
        socket.to(e.connectionID).emit('show_chat_message_event', {
          from: from,
          message: msg
        });
      });

    }
  })

  socket.on('disconnect', () => {
    //on disconnected event fired....
    console.log('disconnected');
    //get disconnected user data from all connected user array
    let disconnect_user = AllUserConnection.filter((e) => {
      return e.connectionID == socket.id
    });
    //if there is disconnected user....
    if (disconnect_user) {
      //get meeting id of the disconnected user
      let meeting_id = disconnect_user.meeting_id;
      //update the all connected users array
      AllUserConnection = AllUserConnection.filter((d) => {
        return d.connectionID != socket.id
      });
      //get the list of users with same meeting ID 
      let list = AllUserConnection.filter((v) => {
        return v.meeting_id == meeting_id;
      });
      //and inform others about disconnected users
      list.forEach((ele) => {
        socket.to(ele.connectionID).emit('inform_other_about_disconnected_user', {
          connID: socket.id
        });
      });
    }
  });


})




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);



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
