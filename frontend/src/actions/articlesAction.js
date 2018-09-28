export const fetchArticles = () => {
    return dispatch => {
        let headers = {"Content-Type": "application/json"};
        return fetch("/api/articles/", {headers})
            .then(res => res.json())
            .then(articles => {
                return dispatch({
                    type: 'FETCH_ARTICLES',
                    articles
                })
            })
    }
}
export const addArticle = (text, articleName, owner) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().authReducer;
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        let body = JSON.stringify({text, articleName, owner});
        return fetch("/api/article/", {headers, method: "POST", body})
            .then(res => res.json())
            .then(article => {
                console.log(article);
                return dispatch({
                    type: 'ADD_ARTICLE',
                    article
                })
            })
    }
}
export const updateArticle = (index, text, articleName) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().authReducer;
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        let owner = getState().authReducer.user.username;
        let body = JSON.stringify({text, articleName, owner});
        let noteId = getState().articlesReducer[index].id;
        console.log(body);
        return fetch(`/api/articles/${noteId}/`, {headers, method: "PUT", body})
            .then(res => res.json())
            .then(article => {
                return dispatch({
                    type: 'UPDATE_ARTICLE',
                    article,
                    index
                })
            })
    }
}
export const deleteArticle = index => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().authReducer;
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        let owner = getState().authReducer.user.username;
        let body = JSON.stringify({owner});
        let articleId = getState().articlesReducer[index].id;

        return fetch(`/api/articles/${articleId}/`, {headers, method: "DELETE", body})
            .then(res => {
                if (res.ok) {
                    return dispatch({
                        type: 'DELETE_ARTICLE',
                        index
                    })
                }
            })
    }
}
export const fetchComments = () => {
    return dispatch => {
        let headers = {"Content-Type": "application/json"};
        return fetch("/api/comments/", {headers})
            .then(res => res.json())
            .then(comments => {
                {
                    console.log(comments)
                }
                return dispatch({
                    type: 'FETCH_COMMENTS',
                    comments
                })
            })
    }
}
export const addComment = (commentText, articleComment) => {
    return dispatch => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({commentText, articleComment});
        console.log(body);
        return fetch("/api/comments/", {headers, method: "POST", body})
            .then(res => res.json())
            .then(comment => {
                return dispatch({
                    type: 'ADD_COMMENT',
                    comment
                })
            })
    }
}

