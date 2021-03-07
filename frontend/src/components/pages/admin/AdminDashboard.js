//Imports
import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from "react-redux";
import moment from 'moment';
import * as Components from '../../../materialui/Imports'
import store from '../../../store/index'

//Fetches and displays all messages on the dashboard for the ADMIN
function AdminDashboard(params) {
    useEffect(() => {
        FetchMessages(params);
    }, []);

    //Set the state
    const [state] = useState({
        id: "",
        title: "",
        message: "",
        messagelike: "",
        userId: "",
        pseudo: ""

    })

    //Declarations
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const stateStore = store.getState()
    //let history = useHistory();

    //Gets all the messages
    const FetchMessages = (e) => {
        const messageData = {
            "id": state.id,
            "title": state.title,
            "message": state.message,
            "messagelike": state.messagelike,
            'userId': state.userId,
            'createdAt': state.createdAt,
            'pseudo': state.pseudo
        }

        axios.get("http://localhost:3000/api/messages", messageData)
            .then(function (response) {
                const messages = response.data
                setMessages(messages)
            })
            .catch(function (error) {
                setError(error);
            });
    }

    //Deletes message
    const deleteMessage = (props) => {
        axios.delete(`http://localhost:3000/api/messages/${props}`) //To check
            .then(function (response) {
                console.log(response)
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //Checks if the user isAdmin, if yes displays the messages
    if (stateStore.auth.isAdmin = 'true') {
        return (
            <div>
                <section>
                    <Header />
                    <main>
                        {messages.map(message =>
                            <div key={message.id} className="" >
                                <div >
                                    <Components.Paper elevation={6} className="admin">
                                        <div key={message.id} className="admin-flex" >
                                            <div className="admin-items">
                                                {messages.map(message => (message.Users).map(pseudo =>
                                                    <div className="" key={pseudo}>pseudo: {pseudo.pseudo}</div>
                                                ))}
                                            </div>
                                            <div className="admin-items">
                                                <h3 className="">Titre</h3>
                                                <div>{message.title}</div>
                                            </div>
                                            <div className="admin-items">
                                                <h3 className="">Commentaire :</h3>
                                                <img src={`/images/${message.urlimage}`} onError={i => i.target.style.display = 'none'} className="image"></img>
                                                <div>{message.content}</div>
                                            </div>
                                            <div className="admin-items">
                                                <div className="">Crée le : </div>
                                                <div>{moment(message.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
                                            </div>

                                            <div className="Other">
                                                <Components.IconButton
                                                    color="secondary"
                                                    onClick={()=> deleteMessage(message.id)}>
                                                    <Components.DeleteIcon />
                                                </Components.IconButton>
                                            </div>
                                        </div>
                                    </Components.Paper>
                                </div>
                            </div>
                        )}
                    </main>
                </section>
            </div >
        )
    } else {
        return (
            <Components.Paper elevation={6} className="admin">
                <div>Vous n'avez pas l'autorisation d'accéder a cette page </div>
                <div className="login__button">
                    <Link to={'/messages'}>
                        <Components.Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            id="submit">Retour
                    </Components.Button>
                    </Link>
                </div>
            </Components.Paper>
        )
    }
}

const mapStateToProps = state => {
    return {
        //loggedIn: state.auth.loggedIn,
        isAdmin: state.auth.isAdmin
    };
};

export default connect(
    mapStateToProps,
)(AdminDashboard);

