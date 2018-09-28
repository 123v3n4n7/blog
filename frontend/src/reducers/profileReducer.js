const initialState = {
    profile: null,
};

export default function profileReducer(state= initialState, action) {
    switch (action.type){
        case "PROFILE_LOADED":
            return {...state, profile: action.data};
        case "UPDATE_PROFILE":
            return {...state, profile: action.data};
        default:
            return state;
    }
}