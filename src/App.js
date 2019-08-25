import React from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
var Client = require('coinbase').Client;


class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('Constructor Fired')
    this.state = {
      access_token: '',
      token_type: '',
      expires_in: '',
      refresh_token: '',
      created_at: '',
      DataBack: false,
      nameItLater:[]
    }
  }

componentDidMount(){
 // checkcoinbase = () => {}
 console.log('Component did Mount Function Fired')

    const urlParams = new URLSearchParams(window.location.search);
    var grant_type = 'authorization_code'
    var client_id = 'e4ac2eb07157bde62fa7f0b91f69ec20fdb6fa1d852903aa754d763a6a0de22c'
    var client_secret = '6b53d4d106c59002760dd3084c9c691e135549892b56e54115ea4fb05986a7b7'
    var redirect_uri = 'http://localhost:5000/';


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
            this.state.DataBack = true
            // store = this
            // return res.json()
            // console.log(res.json)
            const data = JSON.stringify(res.data)
            const newData = JSON.parse(data)
            console.log(newData)

            this.setState({
              access_token: newData.access_token,
              token_type: newData.token_type,
              expires_in: newData.expires_in,
              refresh_token: newData.refresh_token,
              created_at: newData.created_at,
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
}
// }

    // axios
    //   .post('https://api.coinbase.com/oauth/token', {
    //     "grant_type": `${grant_type}`,
    //     "code": `${myParam}`,
    //     "client_id": `${client_id}`,
    //     "client_secret": `${client_secret}`,
    //     "redirect_uri": `${redirect_uri}`
    //   })




      listAccounts = () => {
      const { access_token } = this.state

        axios.get('https:api.coinbase.com/v2/user',  { Content-Type :`'Authorization: Bearer ${access_token}'`}

      ).then(res => JSON.stringify(res)).then(res => this.setState({ nameItLater: JSON.parse(res)}))



        // this.setState({ nameItLater: vic.data })

      //
      // console.log( 'List Accounts Fired')
      // var client = new Client({'accessToken': this.state.access_token, 'refreshToken': this.state.refresh_token});
      //       client.getAccounts({}, function(err, accounts) {
      //       accounts.forEach(function(acct) {
      //       console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
      //       });
      //     });
    }


    render(){
      console.log('Render Function Fired')

    return (
      <div className="App">
        <header className="App-header">
            // <div>
            //   <p>Access Token : {this.state.access_token}</p>
            //   <p>Token Type : {this.state.token_type}</p>
            //   <p>Expire In : {this.state.expires_in}</p>
            //   <p>Refresh Token : {this.state.refresh_token}</p>
            //   <p>Create At : {this.state.created_at}</p>
            // </div>
            <div>
            {this.state.nameItLater}
            </div>
          <button className="btn btn-primary" onClick={() => window.open('https://www.coinbase.com/oauth/authorize?client_id=e4ac2eb07157bde62fa7f0b91f69ec20fdb6fa1d852903aa754d763a6a0de22c&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2F&response_type=code&scope=wallet%3Auser%3Aread')}>Send Request</button>
          <button className="btn btn-primary" onClick={this.listAccounts}> Get Portfolio </button>
        </header>
      </div>

    );

  }

}


export default App;
