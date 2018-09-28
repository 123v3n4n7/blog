import {combineReducers} from 'redux';
import articlesReducer from './articlesReducer';
import commentsReducer from './commentsReducer';
import authReducer from "./authReducer";
import profileReducer from "./profileReducer"

const mainReducers = combineReducers({
    articlesReducer, commentsReducer, authReducer, profileReducer
});

export default mainReducers;