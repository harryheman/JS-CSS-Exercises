import * as React from 'react'
import {Dispatch} from 'redux'
import {useDispatch} from 'react-redux'

type Props = {
    article: IArticle
    removeArticle: (article: IArticle) => void
}

export const Article: React.FC<Props> = ({ article, removeArticle }) => {
    const dispatch: Dispatch<any> = useDispatch()

    const deleteArticle = React.useCallback(
        (article: IArticle) => dispatch(removeArticle(article)),
        [dispatch, removeArticle]
    )

    return (
        <div className="Article">
            <div>
                <h3>{article.title}</h3>
                <p>{article.body}</p>
            </div>
            <button onClick={() => deleteArticle(article)}>Delete</button>
        </div>
    )
}