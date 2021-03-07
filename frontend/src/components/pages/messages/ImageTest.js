
import React, { useState, useEffect } from 'react';
import axios from 'axios'


function ImageTest() {
    useEffect(() => {
        FetchMessages();
    }, []);

    //Set the state
    const [state] = useState({
        id: "",
        title: "",
        message: "",
        messagelike: "",
        userId: "",
        pseudo: "",
        urlimage: ""

    })
    //Declarations
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    //Gets all the messages
    const FetchMessages = (e) => {
        const messageData = {
            "id": state.id,
            "title": state.title,
            "message": state.message,
            "messagelike": state.messagelike,
            'userId': state.userId,
            'createdAt': state.createdAt,
            'pseudo': state.pseudo,
            'urlimage' : state.urlimage
        }
        //[0].Users[0].pseudo
        axios.get("http://localhost:3000/api/imagetest", messageData)
            .then(function (response) {
                const messages = response.data
                setMessages(messages) 
            })
            .catch(function (error) {
                setError(error);
            });
    }



    return (
        <div>
            <div >
                <div>

                    <h2 >Connexion Modérateur</h2>
<div>{messages.urlimage}</div>
                </div>
            </div>
        </div>
    )
}

export default ImageTest