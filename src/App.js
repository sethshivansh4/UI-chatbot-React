// create a react component that inputs a textarea message then performs a fetch request to localhost:9000 gets back a response as a data.message and displays that message in box below

import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [prevQ, setPrevQ] = useState([]);
  const [prevA, setPrevA] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      'question': message,
      'previous_questions': prevQ,
      'previous_answers': prevA
    };
    console.log(payload);
    console.log(JSON.stringify(payload));
    fetch('http://localhost:9000/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResponse(data['answer']);
        setPrevQ(data['previous_questions']);
        setPrevA(data['previous_answers']);
      }
      );
  };

  return (
    <div className="container">
    <div className="row">
        <div className="col-md-12">
            <h1>Kairos Chat</h1>
            <div className="well">
                <div className="row">
                    <div className="col-md-12">
                        <div id="conversation">Here goes the conversation</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <br/><textarea id="message" className="form-control" rows="3"
                        onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                </div>
                <div>
                  </div>
                <div className="row">
                    <div className="col-md-12">
                        <br/><button id="send" className="btn btn-primary" onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>{response} </div>
</div>

  );
}

export default App
