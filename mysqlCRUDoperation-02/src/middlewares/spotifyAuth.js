const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: '44d4bae7077a4dd6961aa6f8fafd12fa',
    clientSecret: '83be679be8e14538852dca3ab1badf98',
    redirectUri: "http://localhost:5000/spotify/callback"
});
const newToken = "  BQCvykAI-jUUTbA80tEstJ4c0fDpQA8ATtzEI6AfN4zF8rzmZ1VI3zn9aMjr4PLBB_LjIpRrcvT1yRSHJCIb8J4KPGgQv-oyu4pqjxjBvbzCHWLWhV-kGCUKHvXPBXGgWGg0BdeDl4bx4z7aepMybQysIk4Asq4U4TMx8jVyBezUIRuUB5NJVA4P2_qbkDui7CkL5rFnAgDP7bB3KUEhNs8ubq-FfxV118DBwHhLI0CjQjKaI2C4CDkTOCUvSGwLHZufZs2hNYHmHcc0p1-urbcfHEa-Ps4sjOL4p4sMeL0Fn6fQRiyTLRag_RRKAOGIAinaTsL0dIBbuf3kDS4EB3R0";


require('dotenv').config();
// const scopes = [
//     'ugc-image-upload',
//     'user-read-playback-state',
//     'user-modify-playback-state',
//     'user-read-currently-playing',
//     'streaming',
//     'app-remote-control',
//     'user-read-email',
//     'user-read-private',
//     'playlist-read-collaborative',
//     'playlist-modify-public',
//     'playlist-read-private',
//     'playlist-modify-private',
//     'user-library-modify',
//     'user-library-read',
//     'user-top-read',
//     'user-read-playback-position',
//     'user-read-recently-played',
//     'user-follow-read',
//     'user-follow-modify'
// ];
// const token = require('./index').access_token;

async function getMyData(token) {
    spotifyApi.setAccessToken(token);
    const me = await spotifyApi.getMe();
    console.log(me.body);
    // return me.body;
}

getMyData(newToken);


