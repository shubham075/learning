// The WebRTC standard covers, on a high level, two different technologies: media capture devices and peer-to-peer connectivity.

let appProcess = (function () {
    const peer_connection_ids = [];
    const peer_connection = [];
    const remote_vid_stream = [];
    const remote_aud_stream = [];
    let serverProcess;
    let local_div;
    let audio;
    let isAudioMute = true;
    let rtp_audio_senders = [];
    let rtp_video_senders = [];
    let video_states = {
        None: 0,
        Camera: 1,
        ScreenShare: 2
    };
    let video_state = video_states.None;
    let videoCamTracks;

    async function init(SDP_function, my_connID) {
        serverProcess = SDP_function;
        my_connectionID = my_connID;
        eventProcess();
        local_div = document.querySelector('#locaVideoPlayer');
    }

    function eventProcess() {
        let mic_options = document.getElementById('miceMuteUnmute');
        let mic_icon = mic_options.querySelector('i');
        let video_options = document.getElementById('videoCamOnOff');
        let video_icon = video_options.querySelector('i');
        let screen_options = document.getElementById('ScreenShareOnOf');

        mic_options.addEventListener('click', async () => {
            if (!audio) {
                await loadAudio(); //will define later
                alert('audio permission has not granted!');
                return;
            }
            if (isAudioMute) { //if audio mute is true
                audio.enabled = true;
                if (mic_icon.classList.contains('fa-microphone-slash')) {
                    mic_icon.classList.remove('fa-microphone-slash');
                    mic_icon.classList.add('fa-microphone');
                }
                updateMediaSenders(audio, rtp_audio_senders);
            }
            else {
                audio.enabled = false;
                if (mic_icon.classList.contains('fa-microphone')) {
                    mic_icon.classList.remove('fa-microphone');
                    mic_icon.classList.add('fa-microphone-slash');
                }
                removeMediaSenders(rtp_audio_senders);
            }
            isAudioMute = !isAudioMute;
        });

        video_options.addEventListener('click', async () => {
            if (video_state == video_states.Camera) {
                await videoProcess(video_states.None);
            }
            else {
                await videoProcess(video_states.Camera);
            }
        });
        screen_options.addEventListener('click', async () => {
            if (video_state == video_states.ScreenShare) {
                await videoProcess(video_states.None);
            }
            else {
                await videoProcess(video_states.ScreenShare);
            }
        });

    }

    async function loadAudio() {
        try {
            let astream = await navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true
            });
            audio = astream.getAudioTracks()[0];
            audio.enabled = false;
        } catch (error) {
            console.error(error);
        }
    }


    function connection_status(connection) {
        if (connection && (connection.connectionState == 'new' || connection.connectionState == 'connecting' || connection.connectionState == 'connected')) {
            return true;
        }
        else {
            return false;
        }
    }

    async function updateMediaSenders(track, rtp_senders) {
        for (let con_id in peer_connection_ids) {
            if (connection_status(peer_connection[con_id])) {
                if (rtp_senders[con_id] && rtp_senders[con_id].track) {
                    rtp_senders[con_id].replaceTrack(track)
                }
                else {
                    rtp_senders[con_id] = peer_connection[con_id].addTrack(track);
                }
            }
        }
    }

    async function removeMediaSenders(rtp_senders) {
        for (let con_id in peer_connection_ids) {
            if (rtp_senders[con_id] && connection_status(peer_connection[con_id])) {
                rtp_senders.removeTrack(rtp_senders[con_id]);
                rtp_senders[con_id] = null;
            }
        }
    }

    async function removeVideoStream(rtp_video_senders) {
        if (videoCamTracks) {
            videoCamTracks.stop();
            videoCamTracks = null;
            local_div.srcObject = null;
            removeMediaSenders(rtp_video_senders);
        }
    }

    async function videoProcess(newVideoState) {
        let video_options = document.getElementById('videoCamOnOff');
        let video_icon = video_options.querySelector('i');
        if (newVideoState == video_states.None) {
            video_icon.classList.remove('fa-video');
            video_icon.classList.add('fa-video-slash');

            video_state = newVideoState;
            removeVideoStream(rtp_video_senders);
            return;
        }
        if (newVideoState == video_states.Camera) {
            video_icon.classList.remove('fa-video-slash');
            video_icon.classList.add('fa-video');
        }
        try {
            let vstream = null;
            if (newVideoState == video_states.Camera) {
                vstream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 1920,
                        height: 1080
                    },
                    audio: false
                });
            }
            else if (newVideoState == video_states.ScreenShare) {
                vstream = await navigator.mediaDevices.getDisplayMedia({
                    video: {
                        width: 1920,
                        height: 1080
                    },
                    audio: false
                })
            }
            if (vstream && vstream.getVideoTracks.length > 0) {
                videoCamTracks = vstream.getVideoTracks()[0];
                if (videoCamTracks) {
                    local_div.srcObject = new MediaStream([videoCamTracks]);
                    updateMediaSenders(videoCamTracks, rtp_video_senders);
                }
            }
        }
        catch (error) {
            console.error(error);
            return;
        }
        video_state = newVideoState;
    }

    // STUN (Session Traversal Utilities for NAT) is an auxiliary protocol for transmitting data around a NAT (Network Address Translator).
    // Interactive Connectivity Establishment (ICE): framework used by webRTC to connect two peers, regardless of network topology
    const iceConfiguration = {
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302",
            },
            {
                urls: "stun:stun1.l.google.com:19302",
            },
        ],
    };

    // The peer-to-peer connectivity is handled by the RTCPeerConnection interface. This is the central point for establishing and controlling the connection between two peers in WebRTC.
    //my connection ID (connID) set to --> others users
    async function setConnection(connID) {
        const connection = new RTCPeerConnection(iceConfiguration);

        //will start from here 28/04/23
        connection.onnegotiationneeded = async function (event) {
            await setOffer(connID);
        };

        connection.onicecandidate = function (event) {
            if (event.candidate) {
                serverProcess(JSON.stringify({ icecandidate: event.candidate }), connID);
            }
        };

        connection.ontrack = function (event) {
            if (!remote_vid_stream[connID]) {
                remote_vid_stream[connID] = new MediaStream();
            }
            if (!remote_aud_stream[connID]) {
                remote_aud_stream[connID] = new MediaStream();
            }
            if (event.track.kind == 'video') {
                if (remote_vid_stream[connID]) {
                    remote_vid_stream[connID]
                        .getVideoTracks()
                        .forEach((t) => {
                            remote_vid_stream[connID].removeTrack(t)
                        });
                    remote_vid_stream[connID].addTrack(event.track);
                    let remoteVideoPlayer = document.querySelector('#v_' + connID);
                    remoteVideoPlayer.srcObject = null;
                    remoteVideoPlayer.srcObject = remote_vid_stream[connID];
                    remoteVideoPlayer.load();
                }
            }
            if (event.track.kind == 'audio') {
                if (remote_aud_stream[connID]) {
                    remote_aud_stream[connID]
                        .getAudioTracks()
                        .forEach((t) => {
                            remote_aud_stream[connID].removeTrack(t)
                        });
                    remote_aud_stream[connID].addTrack(event.track);
                    let remoteAudioPlayer = document.querySelector('#a_' + connID);
                    remoteAudioPlayer.srcObject = null;
                    remoteAudioPlayer.srcObject = remote_aud_stream[connID];
                    remoteAudioPlayer.load();
                }
            }
            if (video_state = video_states.Camera || video_state == video_states.ScreenShare) {
                if (videoCamTracks) {
                    updateMediaSenders(videoCamTracks, rtp_video_senders);
                }
            }
            return connection;
        };

        peer_connection_ids[connID] = connID;
        peer_connection[connID] = connection;
    }

    async function setOffer(connID) {
        const connection = peer_connection[connID];
        try {
            const offer = await connection.createOffer();
            await connection.setLocalDescription(offer);
            serverProcess(JSON.stringify({ offer: localDescription }), connID);
        } catch (error) {
            console.error("setOffer error:", error);
        }
    }

    //session description protocol
    async function SDPProcess(message, from_connID) {
        // start from here ....
        message = JSON.parse(message);
        if (message.answer) {
            await peer_connection[from_connID].setRemoteDescription(new RTCSessionDescription(message.answer))
        }
        else if (message.offer) {
            if (!peer_connection[from_connID]) {
                await setConnection(from_connID);
            }
            await peer_connection[from_connID].setRemoteDescription(new RTCSessionDescription(message.offer));
            let answer = await peer_connection[from_connID].createAnswer();
            await peer_connection[from_connID].setLocalDescription(answer);
            serverProcess(JSON.stringify({ answer: answer }), from_connID);
        }
        else if (!message.icecandidate) {
            if (!peer_connection[from_connID]) {
                await setConnection(from_connID);
            }
            try {
                await peer_connection[from_connID].addIceCandidate(message.icecandidate)
            } catch (error) {
                console.error(error);
            }
        }

    }

    async function closeConnection(connID) {
        peer_connection_ids[connID] = null;
        if (peer_connection[connID]) {
            //close the connection and make the null
            peer_connection[connID].close();
            peer_connection[connID] = null;
        }
        //remove the disconnected users audio streams; 
        if (remote_aud_stream[connID]) {
            remote_aud_stream[connID].getTracks().forEach((t) => {
                if (t.stop) t.stop();
            });
            remote_aud_stream[connID] = null;
        }
        //remove the disconnected users video streams; 
        if (remote_vid_stream[connID]) {
            remote_vid_stream[connID].getTracks().forEach((t) => {
                if (t.stop) t.stop();
            });
            remote_vid_stream[connID] = null;
        }
    }

    return {
        setNewConnection: async function (connID) {
            await setConnection(connID);
        },
        init: function (SDP_function, my_connID) {
            init(SDP_function, my_connID);
        },
        processClientFunc: async function (data, from_connID) {
            await SDPProcess(data, from_connID);
        },
        closeConnectionCall: async function (connID) {
            await closeConnection(connID);
        }
    };
})();


let myApp = (function () {
    let socket = null;
    let user_id = '';
    let meeting_id = '';

    async function init(uid, mid) {
        user_id = uid;
        meeting_id = mid;
        document.title = user_id;
        let meetingContainer = document.getElementById('meetingContainer');
        meetingContainer.style.display = '';

        let userName = document.getElementById('me');
        userName.querySelector('h2').textContent = user_id + '(ME)';

        await event_process_for_signaling_server();
        await eventHandeling();
    }
    async function event_process_for_signaling_server() {
        socket = io.connect();

        let SDP_function = function (data, connID) {
            socket.emit('SDPProcess', {
                message: data,
                connID: connID
            });
        }

        socket.on('connect', () => {
            if (socket.connected) {
                appProcess.init(SDP_function, socket.id);
                if (user_id != '' && meeting_id != '') {

                    //sending connected user data form client-side to server-side;
                    socket.emit('connected_user', {
                        displayName: user_id,
                        meetingID: meeting_id
                    });
                }
            }
        });
        socket.on('inform_other_users_about_me', (data) => {
            addUser(data.connID, data.other_user_id);
            //setting new connections for the other userID's
            appProcess.setNewConnection(data.connID);
        });

        socket.on('inform_me_about_other_users', (other_users) => {
            other_users.forEach((user) => {
                addUser(user.connectionID, user.user_id);
                appProcess.setNewConnection(user.connectionID);
            });
        });

        socket.on('inform_other_about_disconnected_user', (data) => {
            document.getElementById(data.connID).remove();
            appProcess.closeConnectionCall(data.connID);
        });

        socket.on('SDPProcess', async (data) => {
            await appProcess.processClientFunc(data.message, data.from_connID);
        });

        //Pt story ID: #185090356
        socket.on('show_chat_message_event', (data) => {
            console.log('show_chat_message_event message:::', data.message);
            const options = { hour12: true, hour: 'numeric', minute: 'numeric'};
            const now = new Date();
            const localTime = now.toLocaleTimeString('en-US', options);
            console.log(localTime);
            let div = document.createElement('div');
            let span = document.createElement('span');
            span.classList.add('font-weight-bold', 'mr-3');
            span.style.color = 'black';
            span.appendChild(document.createTextNode(data.from));
            div.appendChild(span);
            div.appendChild(document.createTextNode(localTime + '\n' + data.message));
            document.querySelector('#messages').appendChild(div);
        });
    }

    async function eventHandeling() {
        const message_data = document.getElementById('msgbox');
        document.getElementById('btnsend').addEventListener('click', () => {
            console.log('from client side------ user message', message_data.value);
            socket.emit('sendMessage', message_data.value);
            var time = new Date();
            var lTime = time.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });
            //showing user's message to same user.......
            let div = document.createElement('div');
            let span = document.createElement('span');
            span.classList.add('font-weight-bold', 'mr-3');
            span.style.color = 'black';
            span.appendChild(document.createTextNode(user_id));
            div.appendChild(span);
            div.appendChild(document.createTextNode(lTime + '\n' + message_data.value));
            document.querySelector('#messages').appendChild(div);
            message_data.value = '';
        });
    }

    function addUser(connID, other_user_id) {
        const otherTemplate = document.querySelector("#otherTemplate");
        const newDivId = otherTemplate.cloneNode(true);
        newDivId.setAttribute("id", connID);
        newDivId.classList.add("other");
        newDivId.querySelector("h2").textContent = other_user_id;
        newDivId.querySelector("video").setAttribute("id", "v_" + connID);
        newDivId.querySelector("audio").setAttribute("id", "a_" + connID);

        newDivId.style.display = "";
        document.querySelector("#divUsers").appendChild(newDivId);
    }



    return {
        app_start: async function (uid, mid) {
            await init(uid, mid);
        }
    };
})();





