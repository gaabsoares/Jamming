let accessToken;
const clientID = '';
const redirectURI = "http://localhost:3000";
// const redirectURI = 'https://gaabsoaresjamming.surge.sh/';

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }

        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if(urlAccessToken && urlExpiresIn) {
            accessToken = urlAccessToken[1];
            const expiresIn = Number(urlExpiresIn[1])
            window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = redirect;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: { Authorization: `Bearer ${accessToken}` }
        }).then((response) => response.json()
        ).then((jsonResponse) => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                previewUrl: track.preview_url,
                uri: track.uri
            }));
        });
    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;
        return fetch(`https://api.spotify.com/v1/me`, {headers: headers
        }).then((response) => response.json()
        ).then((jsonResponse) => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name })
            }).then((response) => response.json()
            ).then((jsonResponse => {
                const playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackURIs })                    
                })
            }));
        });
    }
};

export default Spotify;