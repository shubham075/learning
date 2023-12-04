

const screenShare = async (e) => {
    console.log('share screen works...');
    const option = {
        audio: false,
        video: true,
        surfaceSwitching: 'include' //include or exclude:::
    }
    try {
        mediaScreen = await navigator.mediaDevices.getDisplayMedia(option);
    } catch (error) {
        console.log(error);
    }
}