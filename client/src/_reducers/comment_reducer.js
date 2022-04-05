import {
    GET_COMMENT,
    SAVE_COMMENT
} from '../_action/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_COMMENT:
            return { ...state, comment: action.payload }
        case SAVE_COMMENT:
            return { ...state, comment: [...state.comment, ...action.payload] }
        default:
            return state;
    }
}