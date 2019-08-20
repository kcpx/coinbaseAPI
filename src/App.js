import React from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: '',
      token_type: '',
      expires_in: '',
      refresh_token: '',
      created_at: '',
      error: ''
    }
  }
  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const
    grant_type = 'authorization_code' ,
    client_id = 'd5a24b7ece44c038cad39e166e91b95ed827a6c1f3d202dd6b115b4f908d9ba7',
    client_secret = '40b1ef90718ee32326f4e6cde06d9d4ae4c1ca8b3a380d82b8e0e80bc353f52e',
    redirect_uri = 'http://localhost:3000/';


    if (urlParams.get('code') != null) {
      const myParam = urlParams.get('code');
      axios
        .post('https://api.coinbase.com/oauth/token', {
          "grant_type": `${grant_type}`,
          "code": `${myParam}`,
          "client_id": `${client_id}`,
          "client_secret": `${client_secret}`,
          "redirect_uri": `${redirect_uri}`
        })
        .then(res => {
          if (res) {
            console.log(res.data);
            this.setState({
              access_token: res.data.access_token,
              token_type: res.data.token_type,
              expires_in: res.data.expires_in,
              refresh_token: res.data.refresh_token,
              created_at: res.data.created_at,
              error: 'none'
            });

           window.history.pushState({ page: "another" }, "another page", "example.html");

          }


        }).catch(e => {
          if (e) {
            console.log(e);
          }

        })
    }

    //function to show portfolio balance. Error with accesstoken
    function listAccounts() {


            var Client = require('coinbase').Client;
            var client = new Client({'accessToken': this.state.access_token, 'refreshToken': this.state.refresh_token});


            client.getAccounts({}, function(err, accounts) {
            accounts.forEach(function(acct) {
            console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
            });
          });

    }

    return (
      <div className="App">
        <header className="App-header">
            <div>
              <p>Access Token : {this.state.access_token}</p>
              <p>Token Type : {this.state.token_type}</p>
              <p>Expire In : {this.state.expires_in}</p>
              <p>Refresh Token : {this.state.refresh_token}</p>
              <p>Create At : {this.state.created_at}</p>
            </div>
          <button className="btn btn-primary" onClick={() => window.open('https://www.coinbase.com/oauth/authorize?client_id=d5a24b7ece44c038cad39e166e91b95ed827a6c1f3d202dd6b115b4f908d9ba7&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=wallet%3Auser%3Aread')}>Send Request</button>
          <button className="btn btn-primary" onClick={() => listAccounts()}>portfolio</button>

        </header>
      </div>

    );

  }
}

export default App;
