
const https = require('https');
const express = require('express');
const socketio = require('socket.io');
const fs = require('fs');

const app = express();
app.use(express.static(__dirname));

const key = fs.readFileSync('cert.key');
const cert = fs.readFileSync('cert.crt');

const expressServer = https.createServer({ key, cert }, app);
const io = socketio(expressServer)

//we have changed express setup to use HTTPS....
expressServer.listen(8181, () => {
    console.log("SERVER RUNNING ON PORT 8181");
});

const offers = [
    //offererUserName
    //offer
    //offerIceCandidates
    //answererUserName
    //answer
    //answerIceCandidates
]

const connectedSockets = [
    //userName, socketId
]

io.on('connection', (socket) => {
    console.log("USER CONNECTED:::", socket.id);
    const { userName, password } = socket.handshake.auth;
    if (password !== '123456') {
        socket.disconnect(true);
        return;
    }
    connectedSockets.push({
        socketId: socket.id,
        userName
    });

    if (offers.length) {
        console.log('avaliable offers on server side:::', offers);
        socket.emit('avaliableOffers', offers);
    }

    socket.on('newOffer', (newOffer) => {
        offers.push({
            offererUserName: userName,
            offer: newOffer,
            offerIceCandidates: [],
            answererUserName: null,
            answer: null,
            answerIceCandidates: []
        });
        socket.broadcast.emit('newOfferAwaiting', offers.slice(-1))
    });

    socket.on('sendIceCandidateToSignalingServer', (iceCandidateObj) => {
        const { didIOffer, iceCandidate, iceUserName } = iceCandidateObj;
        if (didIOffer) {
            let offerInOffers = offers.find(o => o.offererUserName === iceUserName);
            if (offerInOffers) {
                offerInOffers.offerIceCandidates.push(iceCandidate);
            }
        }
    })


});