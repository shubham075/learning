const audioInputEL = document.querySelector('#audio-input');
const audioOutputEL = document.querySelector('#audio-output');
const videoInputEL = document.querySelector('#video-input');


const getDevices = async () => {
    try {
        const deviceData = await navigator.mediaDevices.enumerateDevices();
        console.log('Device data:::', deviceData);
        deviceData.forEach((device) => {
            const options = document.createElement('option');
            options.text = device.label;
            options.value = device.deviceId;
            if (device.kind === 'audioinput') {
                audioInputEL.appendChild(options);
            }
            if (device.kind === 'audiooutput') {
                audioOutputEL.appendChild(options);
            }
            else if (device.kind === 'videoinput') {
                videoInputEL.appendChild(options);
            }
        });

    } catch (error) {
        console.log(error);
    }
}

const changeAudioInput = async (e) => {
    const deviceId = e.target.value;
    const newCOnstraints = {
        audio: { deviceId: { exact: deviceId } },
        video: true
    }
    try {
        stream = await navigator.mediaDevices.getUserMedia(newCOnstraints);
        console.log('Stream data with new constraints', stream);
        const tracks = stream.getAudioTracks();
        console.log('Audio tracks::', tracks);
    } catch (error) {
        console.log(error);
    }
}
const changeAudioOutput = async (e) => {
    await videoEL.setSinkId(e.target.value);
    console.log('Output Audio changed!!!!');
}
const changeVideo = async (e) => {
    const deviceId = e.target.value;
    const newCOnstraints = {
        audio: true,
        video: { deviceId: { exact: deviceId } }
    }
    try {
        stream = await navigator.mediaDevices.getUserMedia(newCOnstraints);
        console.log('Stream data with new constraints', stream);
        const tracks = stream.getVideoTracks();
        console.log('Video tracks::', tracks);
    } catch (error) {
        console.log(error);
    }
}

getDevices();