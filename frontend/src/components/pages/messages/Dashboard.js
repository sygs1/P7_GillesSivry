//Imports

import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from "react-redux";
import * as moment from 'moment';
import * as Components from '../../../materialui/Imports'
import 'moment/locale/fr';
import Container from '@material-ui/core/Container';

//Fetches and displays all messages on the dashboard
function Dashboard(params) {
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
        urlimage: ""

    })
    //Declarations
    const [messages, setMessages] = useState([]);
    const [images, setImages] = useState([]);
    const [ error, setError] = useState(null);

    //Gets all the messages
    const FetchMessages = (e) => {
        const messageData = {
            "id": state.id,
            "title": state.title,
            "message": state.message,
            "messagelike": state.messagelike,
            'userId': state.userId,
            'createdAt': state.createdAt,            
            'urlimage': state.urlimage
        }

        axios.get("http://localhost:3000/api/messages", messageData)
            .then(function (response) {
                
                const messages = response.data
                setMessages(messages)
            })
            .catch(function (error) {
                setError(error);
                console.log(error);
            });
    }

    return (
        <div>
            <section  >
                <Header />
                <Container maxWidth="lg">
                    {messages.map(message =>
                        <div key={message.id} >
                            <div >
                                <Components.Paper elevation={6} className="message-box" >
                                    <Link to={`/messages/${message.id}`} className="messagBox-flex">
                                        <div key={message.id} className="grid-container" >
                                            <div className="Createdat">
                                                <div className="content">Crée le : {moment(message.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
                                            </div>
                                            <div className="Title">
                                                <h2 className="content">{message.title}</h2>
                                            </div>
                                            <div className="Comments">
                                                <img alt="commentaire" src={`/images/${message.urlimage}`} onError={i => i.target.style.display = 'none' } className="image"> "</img>
                                                <h3 className="">{message.content}</h3>
                                            </div>
                                            <div className="Other">
                                            </div>
                                        </div>
                                    </Link>
                                </Components.Paper>
                            </div>
                        </div>
                    )}
                </Container>
            </section>
        </div  >
    )
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    };
};

export default connect(
    mapStateToProps,
)(Dashboard);

