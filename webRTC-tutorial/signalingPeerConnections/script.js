const userName = 'shubham' + Math.floor(Math.random() * 100000);
const password = '123456';
document.querySelector('#user-name').innerHTML = userName;

const socket = io.connect('https://localhost:8181/', {
    auth: {
        userName, password
    }
});
const localVideoEl = document.querySelector('#local-video');
const remoteVideoEl = document.querySelector('#remote-video');

let localStream;    //a variable to hold local video stream
let remoteStream;   //a variable to hold remote video stream
let peerConnection; //a peer-connection that two clients used to talk
let didIOffer = false;

let peerConfiguration = {
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302'
            ]
        }
    ]
}

function fetchUserMedia() {
    return new Promise(async (resolve, reject) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                // audio:true
            });
            localVideoEl.srcObject = stream; //error with remote and local video streams:::: pending ::::
            localStream = stream;

            resolve();
        } catch (error) {
            console.log(err);
            reject();
        }
    });
}

//when client initiate a call:::
const call = async () => {
    await fetchUserMedia();
    await createPeerConnection();
    //creating SDP offer for the purpose of stating new webRTC connection to remote peer
    try {
        console.log('creating offer........');
        const offer = await peerConnection.createOffer();
        console.log('offer is:::', offer);
        await peerConnection.setLocalDescription(offer);
        didIOffer = true;
        socket.emit('newOffer', offer); //sends offer to signalingServer..
    } catch (error) {
        console.log(error);
    }
}

const answerOffer = async (offerObj) => {
    await fetchUserMedia();
    await createPeerConnection();
    console.log('answer offer:::', offerObj);
}

//RTCPeerConnection is a thing that creates a connection
//we paas a config object that contains array of STUN servers which help to fetch ICE candidates...
const createPeerConnection = async () => {
    return new Promise((resolve, reject) => {
        peerConnection = new RTCPeerConnection(peerConfiguration);

        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });
        peerConnection.addEventListener('icecandidate', e => {
            console.log('.......ICE candidate found...........');
            console.log(e);
            if (e.candidate) {
                //sending ice candidate ti singaling server::::
                socket.emit('sendIceCandidateToSignalingServer', {
                    iceCandidate: e.candidate,
                    iceUserName: userName,
                    didIOffer,
                });
            }
        })
        resolve();
    });
}



document.querySelector('#call').addEventListener('click', call);
