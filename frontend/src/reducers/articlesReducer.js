const initialState = [];

export default function articlesReducer(state = initialState, action){
    let articleList = state.slice();
    switch (action.type) {
        case 'DELETE_ARTICLE':
            articleList.splice(action.index,1);
            return articleList;
        case "FETCH_ARTICLES":
            articleList = [];
            return[...articleList, ...action.articles];

        case 'ADD_ARTICLE':
            return [...articleList, action.article];

        case 'UPDATE_ARTICLE':
            let articleToUpdate = articleList[action.index];
            articleToUpdate.text = action.article.text;
            articleToUpdate.articleName = action.article.articleName;
            articleList.splice(action.index, 1, articleToUpdate);
            return articleList;
        default:
            return articleList;
    }
}
