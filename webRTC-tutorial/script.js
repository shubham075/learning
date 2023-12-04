
const videoEL = document.querySelector('#my-video');
let stream = null; //Init stream var so we can use anywhere
let mediaScreen = null; // Init mediaStream var for screen share
let constraints = {
    audio: true,
    video: true
}

const getMicAndCamera = async (e) => {
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log('avaliable streams:::', stream); //gives mediaStream object (stream) :::
    } catch (err) {
        console.error(err);
        //user denied audio and video media access!
        console.log("user denied audio and video media access!");
    }
}

const showMyFeed = async (e) => {
    console.log('showMyFeed is working!');
    videoEL.srcObject = stream;  //this will set our mediaStream (stream) to our <video/>:::
    let tracks = stream.getTracks(); //returns all medaiStream tracks objects:::
    console.log('avaliable tracks feed:::', tracks);
}

const stopMyFeed = async (e) => {
    console.log('stopMyFeed is working!');
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
        track.stop(); //The track state is set to ended:::
    });
}

document.querySelector('#share').addEventListener('click', (e) => {
    getMicAndCamera(e)
});
document.querySelector('#show-video').addEventListener('click', (e) => {
    showMyFeed(e)
});
document.querySelector('#stop-video').addEventListener('click', (e) => {
    stopMyFeed(e);
});
document.querySelector('#change-size').addEventListener('click', (e) => {
    changeVideoSize(e);
});
document.querySelector('#start-record').addEventListener('click', (e) => {
    startRecording(e);
});
document.querySelector('#stop-record').addEventListener('click', (e) => {
    stopRecording(e);
});
document.querySelector('#play-record').addEventListener('click', (e) => {
    playRecording(e);
});
document.querySelector('#share-screen').addEventListener('click', (e) => {
    screenShare(e);
})
document.querySelector('#audio-input').addEventListener('change', (e) => {
    changeAudioInput(e);
})
document.querySelector('#audio-output').addEventListener('change', (e) => {
    changeAudioOutput(e);
})
document.querySelector('#video-input').addEventListener('change', (e) => {
    changeVideo(e);
})