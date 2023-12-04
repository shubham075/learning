

const supportedMediaConstraints = navigator.mediaDevices.getSupportedConstraints();
// console.log('supported media constrains:::', supportedMediaConstraints);

const changeVideoSize = (e) => {
    if (!stream) {
        console.log("No any streams avaliable...");
    }
    stream.getVideoTracks().forEach((track) => {
        const capabilities = track.getCapabilities();
        const height = document.querySelector('#vid-height').value;
        const width = document.querySelector('#vid-width').value;
        console.log('video tracks capabilities', capabilities);
        const video_constraints = {
            height: { exact: height > capabilities.height.max ? capabilities.height.max : height },
            width: { exact: width > capabilities.width.max ? capabilities.width.max : width },
        }
        track.applyConstraints(video_constraints);
    });
}
