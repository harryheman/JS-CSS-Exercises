import * as actionTypes from './actionTypes'

const initialState = {
    articles: [
        { id: 1, title: 'post1', body: 'some awesome text'},
        { id: 2, title: 'post2', body: 'some awesome text'},
    ],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ARTICLE:
            const newArticle = {
                id: Date.now(),
                title: action.article.title,
                body: action.article.body,
            }
            return {
                ...state,
                articles: state.articles.concat(newArticle)
            }
    }
    return state
}

export default reducer