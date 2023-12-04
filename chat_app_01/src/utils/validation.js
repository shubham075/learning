const { v1: uuidv1 } = require('uuid');

function isValidToken(token) {
    return token === true;
}

function generateRoomId() {
    return uuidv1();
}




module.exports = { isValidToken, generateRoomId }