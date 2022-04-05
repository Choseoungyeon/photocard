import axios from 'axios';
import {
    GET_COMMENT,
    SAVE_COMMENT
} from './types';

export function getComments(communityId) {

    const request = axios.get(`/api/comment/getComments?id=${communityId}`)
    .then(response=>response.data.comment)

    return {
        type: GET_COMMENT,
        payload: request
    }
}

export function saveComments(variables) {

    const request = axios.post('/api/comment/saveComment', variables)
        .then(response => response.data.result)

    return {
        type: SAVE_COMMENT,
        payload: request
    }
}
