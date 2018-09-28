import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {artilcesAction, authAction} from '../actions';

class mainApp extends Component {
    componentDidMount(){
        this.props.fetchArticles();
        this.props.loadUser();
    }

    state = {
        articleName: "",
        text: "",
        owner: null,
        updateArticleId: null,
        ownerName: null
    };
    submitArticle = (e) => {
        e.preventDefault();
        if(this.state.updateArticleId===null){
            this.props.addArticle(this.state.text, this.state.articleName, this.state.owner);
        } else {
            this.props.updateArticle(this.state.updateArticleId, this.state.text, this.state.articleName);
        }
        this.resetForm();
    };
    resetForm = () => {
        this.setState({text: "", updateArticleId: null, articleName: ""});
    };
    selectForEdit = (id) => {
        let article = this.props.articlesReducer[id];
        this.setState({text: article.text, updateArticleId: id, articleName: article.articleName});
    };
    render(){
        let artciles = this.props.articlesReducer;
        let user = null;
        let button = <form action="/login/">
                         <button type="submit">Войти</button>
                     </form>;
        let username = null;
        let articlesMap = artciles.map((article, id) => (
                        <div key={id}>
                            <h2 style={{textAlign:"center"}}><Link to={`/article/${id}`}>{article.articleName}</Link></h2>
                            <h5>{article.text}</h5>
                            <h6 style={{textAlign:"right"}}><Link to={`/profile/${article.ownerName}`}>{article.ownerName}</Link></h6>
                            <hr/>
                            <button onClick={() => this.selectForEdit(id)}>Редактировать</button>
                            <button onClick={() => this.props.deleteArticle(id)}>Удалить</button>
                        </div>
                    ));
        let createEdit = null;
        if (this.props.authReducer.user != null) {
           user = this.props.authReducer.user;
           this.state.owner = user.id;
           username =  <Link to={`/profile/${user.username}`}>{user.username}</Link>;
           button = <button onClick={this.props.logout}>Выйти</button>;
           createEdit =  <div>
                            <h3>Создать новую статью</h3>
                            <form onSubmit={this.submitArticle}>
                                <input value={this.state.articleName}
                                placeholder="Название статьи"
                                onChange={(e) => this.setState({articleName: e.target.value})}
                                required
                                />
                            <div>
                            <textarea
                                value={this.state.text}
                                placeholder="..."
                                onChange={(e) => this.setState({text: e.target.value})}
                                required
                            />
                            </div>
                            <div>
                                <button onClick={this.resetForm}>Очистить</button>
                                <button onClick={(e) => "submit"}>Добавить</button>
                            </div>
                            </form>
                        </div>;
        }
        return(
            <div>
                <h1>Блог</h1>
                <hr/>
                <div style={{textAlign: "right"}}>
                    {username} {button}
                </div>
                    {createEdit}
                <h2>Статьи</h2>
                <hr/>
                <div>
                    {articlesMap}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        articlesReducer: state.articlesReducer,
        authReducer: state.authReducer,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addArticle: (text, articleName, owner) => {
            dispatch(artilcesAction.addArticle(text, articleName, owner));
        },
        updateArticle: (id, text, articleName) => {
            dispatch(artilcesAction.updateArticle(id, text, articleName));
        },
        deleteArticle: (id) => {
            dispatch(artilcesAction.deleteArticle(id));
        },
        fetchArticles: () => {
            dispatch(artilcesAction.fetchArticles());
        },
        logout: () => dispatch(authAction.logout()),
        loadUser: () => {
            dispatch(authAction.loadUser());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(mainApp);