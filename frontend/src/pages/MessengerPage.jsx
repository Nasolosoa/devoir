/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
} from '@mui/material';
import '../asset/css/chat.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Telegram from '@mui/icons-material/Telegram'
import axios from 'axios';


const MessengerPage = () => {



  const user = JSON.parse(sessionStorage.getItem('user.name'));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    textos: '',
    sender: user
  });

  useEffect(() => {
    const fetchMessages = async () => {
      await axios.get('http://localhost:8080/messages')
        .then(
          res => {
            console.log(res);
            setMessages(res.data);
          }
        )
        .catch(err => console.log(err));

    }

    fetchMessages();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/messages', newMessage)
      .then((response) => {
        console.log(response);
        setNewMessage({
          textes: '',
          sender: user
        });
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <Container>
      <Box my={0}>
        <div className="chat">
          <div className="card">
            <div className="card-header msg_head">
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img src={require('../asset/img/ccilogo.jfif')} className="rounded-circle user_img" />
                  <span className="online_icon"></span>
                </div>
                <div className="user_info">
                  <span>GROUPE MESSAGES</span>
                  <p>{user}</p>
                </div>
              </div>
            </div>
            <div className="card-body msg_card_body">
              {messages.map((message, index) => (
                <div key={index} className={`d-flex ${message.sender !== user ? 'justify-content-start mb-4' : 'justify-content-end mb-4'}`}>

                  <div className={`img_cont_msg ${message.sender !== user ? '' : 'd-none'}`}>
                    <img src={require('../asset/img/user.png')} className="rounded-circle user_img_msg" />
                  </div>

                  <div className={`msg_cotainer ${message.sender === user ? 'msg_cotainer_send' : ''}`}>
                    <span className={`msg_time ${message.sender === user ? 'msg_time_send' : ''}`}>
                      {message.sender}
                    </span>
                    {message.textes}
                  </div>



                  <div className={`img_cont_msg ${message.sender !== user ? 'd-none' : ''}`}>
                    <img src={require('../asset/img/user.png')} className="rounded-circle user_img_msg" />
                  </div>
                </div>
              ))}

            </div>

            <div className="card-footer">
              <div className="input-group">
                <textarea
                  name=""
                  className="form-control type_msg"
                  placeholder="Votre message..."
                  value={newMessage.textes}
                  onChange={(e) => setNewMessage({ ...newMessage, textes: e.target.value })}
                ></textarea>
                <div className="input-group-append">
                  <span className="input-group-text send_btn" onClick={sendMessage}>
                    <i className="fas fa-location-arrow"><Telegram /></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default MessengerPage;