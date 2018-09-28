import React, {Component} from 'react';
import {connect} from 'react-redux';
import {artilcesAction} from '../actions';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.articleId,
            articledb: null,
            commentText: ""
        }
    }

    submitComment = () => {
        this.props.addComment(this.state.commentText, this.state.articledb)
    };

    componentDidMount() {
        this.props.fetchArticles();
        this.props.fetchComments();
    }

    render() {
        if (this.props.articlesReducer.length === 0){
            return (<div>Нет данных</div>)
        }
        else {
            let article = this.props.articlesReducer[this.state.id];
            let comments = this.props.commentsReducer.filter(elem => (
                elem.articleComment === article.id
            ));
            this.state.articledb = article.id;
            return (
                <div>
                    <p>{article.articleName}</p>
                    <p>{article.text}</p>
                    <hr/>
                    {comments.map((text, id) => (
                        <div key={id}>
                            {text.commentText}
                            <hr/>
                        </div>
                    ))}
                     <hr/>
                    <form onSubmit={this.submitComment}>
                        <textarea
                            value = {this.state.commentText}
                            placeholder="Добавьте комментарий"
                            onChange={(e)=>{this.setState({commentText: e.target.value})}}
                            required/>
                        <p>
                            <button onClick={(e)=>"submit"}>Добавить комментарий</button>
                        </p>
                    </form>
                </div>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        articlesReducer: state.articlesReducer,
        commentsReducer: state.commentsReducer,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchArticles: () => {
            dispatch(artilcesAction.fetchArticles());
        },
        fetchComments: () => {
            dispatch(artilcesAction.fetchComments());
        },
        addComment: (commentText, articleComment) => {
            dispatch(artilcesAction.addComment(commentText, articleComment));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Article);
