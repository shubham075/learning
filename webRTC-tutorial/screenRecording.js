let mediaRecording;
let mediaBlob;

const startRecording = (e) => {
    console.log('start recording!');
    mediaBlob = []; //array to hold the blobs for playback:::
    if (!stream) {
        alert('No streams avaliable to recording....')
        console.log('No media stream avaliable...');
        return;
    }
    mediaRecording = new MediaRecorder(stream); //construct a new media recording using mediaRecorder:::
    // mediaRecording = new MediaRecorder(mediaScreen); //for recording share screen...
    mediaRecording.ondataavailable = e => {
        //ondataAvaliable will run when stream ends or stopped:::
        console.log('Data is avaliable for media recorder!');
        mediaBlob.push(e.data);
    }
    mediaRecording.start();
}
const stopRecording = (e) => {
    console.log('recording stops!');
    if (!mediaRecording) {
        alert('No recording data...');
        console.log('No recording data....');
        return;
    }
    mediaRecording.stop();
}
const playRecording = (e) => {
    console.log('play recording!');
    if (!mediaBlob) {
        alert('No recorded data avaliable...');
        console.log('No recorded feed avaliable...');
        return;
    }
    const superBuffer = new Blob(mediaBlob);
    const videoRecordingEL = document.querySelector('#other-video');
    videoRecordingEL.src = window.URL.createObjectURL(superBuffer);
    videoRecordingEL.controls = true;
    videoRecordingEL.play();
}