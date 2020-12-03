import * as actionTypes from './actionTypes'

export const addArticle = article => {
    return {
        type: actionTypes.ADD_ARTICLE,
        article,
    }
}

export const simulateHttpRequest = article => {
    return dispatch => {
        const timer = setTimeout(() => {
            dispatch(addArticle(article))
            clearTimeout(timer)
        }, 3000)
    }
}