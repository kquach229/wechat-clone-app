import React, { useState, useEffect } from 'react';
import './App.css';
import { Button , FormControl, Input} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Message from "./Message";
import db from './firebase';
import firebase from "firebase";
import FlipMove from 'react-flip-move';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(()=> {
    db.collection('messages')
      .orderBy("timestamp","desc")
      .onSnapshot(snapshot=> {
        setMessages(snapshot.docs.map(doc=> ({id: doc.id, message: doc.data()}) ))
    })
  }, [])

  useEffect(()=> {
    setUsername(prompt("Please enter your name"))
  }, [] );


  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      message: input,
      username:username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput("");
  }

  const theme = createMuiTheme({
    typography: {
      button: {
        fontSize: '0.5rem',
        color:"white"
      },
    },
    palette: {
      primary: green,
      color:"white"
    },
  });
  return (
    <div className="App">
      <img className="logo" src={require("./wechat.png")} alt="wechat logo"/>
      <h2>Welcome {username}</h2>
      <form className="app__form">
            <FormControl className="app__formControl">
                <Input className="app__input" value={input} onChange={(e)=>setInput(e.target.value)} />
                <ThemeProvider theme={theme}>
                    <Button className="app__send__button" color="primary" disabled={!input} variant="contained" type="submit" onClick={sendMessage}>Send Message</Button>
                </ThemeProvider>
            </FormControl> 
          </form>
      <FlipMove className="message__list">
          {messages.map(({id, message})=> (
            <Message key={id} username={username} message={message}/>
          ))}
        </FlipMove>
          
      
    </div>
  );
}

export default App;
