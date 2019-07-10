import axios from 'axios';

export default class EngageDriver {

    constructor() {
        this.API_URL = 'https://api.my_url.com/v1';
    }

    read(payload) {
        const path = payload.path;
        if(!path) {
            throw new Error('No path specified');
        }

        return axios.get(this.API_URL + path, {
            headers: { Authorization: `Bearer ${'getToken()'}` }
        });
    }

    
    buildPath(path) {
        // Can do more complicated path things if necesssary
        return;
    }
}