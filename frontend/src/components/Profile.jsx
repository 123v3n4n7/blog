import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authAction} from '../actions';
import ImageUploader from "react-images-upload";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.username,
            user: props.match.params.user,
            picture: null,
            info: "",
        };
        this.onDrop = this.onDrop.bind(this);

    }
     componentDidMount() {
        this.props.loadProfile(this.state.username);
        this.props.loadUser();
    }

    onDrop(picture){
        this.setState({picture: picture})
    }

    submitProfile = () => {
        this.props.updateProfile(this.props.profileReducer.profile.user, this.state.info, this.state.picture, this.state.username);
    }

    render(){
        if(this.props.profileReducer.profile === null){
            return(<div>Нет данных</div>)
        }
        else{
            let user = this.props.authReducer.user;
            let editForm = "";
            if (user.username === this.state.username){
                editForm = <form onSubmit={this.submitProfile}>
                                Редактирование:
                                <div>
                                    <textarea
                                        value={this.state.info}
                                        onChange={(e) => this.setState({info: e.target.value})}
                                        required/>
                                </div>
                                <div>
                                    <ImageUploader
                                        withIcon = {true}
                                        buttonText = 'Добавьте изображение'
                                        onChange = {this.onDrop}
                                        imgExtension = {['.jpg', '.gif', '.png', '.jpeg']}
                                        maxFileSize = {5242880}
                                    />
                                </div>
                                <div>
                                    <button onClick={(e)=>"submit"}>Сохранить</button>
                                </div>
                            </form>
            }
            return(
                <div>
                    <h4>Имя пользователя: {this.state.username}</h4>
                    <div><img src={this.props.profileReducer.profile.image}/></div>
                    <h6>Инфо: {this.props.profileReducer.profile.info}</h6>
                    {editForm}
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return{
        profileReducer: state.profileReducer,
        authReducer: state.authReducer,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProfile:(username) => {
            dispatch(authAction.loadProfile(username))
        },
        updateProfile:(user, info, image, username) => {
            dispatch(authAction.updateProfile(user, info, image, username))
        },
        loadUser:() => {
            dispatch(authAction.loadUser())
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)