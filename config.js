import React from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grant_type = '' ,
      client_id = '',
      client_secret = '',
      redirect_uri = '';
    }
  }

render() {
  const urlParams = new URLSearchParams(window.location.search);
  const
  grant_type = 'authorization_code' ,
  client_id = 'e4ac2eb07157bde62fa7f0b91f69ec20fdb6fa1d852903aa754d763a6a0de22c',
  client_secret = '6b53d4d106c59002760dd3084c9c691e135549892b56e54115ea4fb05986a7b7',
  redirect_uri = 'http://localhost:5000/';


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
          // return
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


  axios
    .post('https://api.coinbase.com/oauth/token', {
      "grant_type": `${grant_type}`,
      "code": `${myParam}`,
      "client_id": `${client_id}`,
      "client_secret": `${client_secret}`,
      "redirect_uri": `${redirect_uri}`
    })
