const initialState = [];

export default function commentsReducer(state = initialState, action){

    switch(action.type){
        case 'FETCH_COMMENTS':
            state = [];
            return[...state, ...action.comments];
        case 'ADD_COMMENT':
            return[...state, ...action.comment];
        default:
            return state
    }
}

