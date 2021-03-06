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
			grant_type = 'authorization_code',
			client_id = 'e4ac2eb07157bde62fa7f0b91f69ec20fdb6fa1d852903aa754d763a6a0de22c',
			client_secret = '6b53d4d106c59002760dd3084c9c691e135549892b56e54115ea4fb05986a7b7',
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
						//console.log(res.data);
						// var Client = require('coinbase').Client;
						// var client = new Client({ 'accessToken': res.data.access_token, 'refreshToken': res.data.refresh_token });


						// client.getAccounts({}, function(err, accounts) {
						// 	//console.log(accounts);
						// 	accounts.forEach(function(acct) {
						// 	  console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
						// 	});
						//   });


						axios.get('https://api.coinbase.com/v2/user', { headers: { Authorization: 'Bearer '+res.data.access_token } })
						.then(response => {
							console.log(response);
							var name = response.data.data.name;


							axios.get('https://api.coinbase.com/v2/accounts', { headers: { Authorization: 'Bearer '+res.data.access_token } })
							.then(response => {
								if(response)
								{
									console.log(response);
									var balance = response.data.data[0].balance.amount;
									document.getElementById("balance").innerHTML = "Hello "+name+" your balance is "+balance;
								}
							})

						})
						//document.getElementById("balance").value = response.data.data[0].balance.amount;

						// var name = response.data.data[0].balance.amount;
						// document.getElementById("balance").value = name;
						// )
						// this.setState({
						//   access_token: res.data.access_token,
						//   token_type: res.data.token_type,
						//   expires_in: res.data.expires_in,
						//   refresh_token: res.data.refresh_token,
						//   created_at: res.data.created_at,
						//   error: 'none'
						// });

						window.history.pushState({ page: "another" }, "another page", "example.html");

					}


				}).catch(e => {
					if (e) {
						console.log(e);
					}

				})

		}

		//function to show portfolio balance. Error with accesstoken
		// function listAccounts() {


		// 	var Client = require('coinbase').Client;
		// 	var client = new Client({ 'accessToken': this.state.access_token, 'refreshToken': this.state.refresh_token });


		// 	client.getAccounts({}, function (err, accounts) {
		// 		accounts.forEach(function (acct) {
		// 			console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
		// 		});
		// 	});

		// }

		return (
			<div className="App">
				<header className="App-header">
					<div>
						<p>Access Token : {this.state.access_token}</p>
						<p>Token Type : {this.state.token_type}</p>
						<p>Expire In : {this.state.expires_in}</p>
						<p>Refresh Token : {this.state.refresh_token}</p>
						<p>Create At : {this.state.created_at}</p>
						<span id="balance"></span>
					</div>
					<button className="btn btn-primary" onClick={() => window.open('https://www.coinbase.com/oauth/authorize?client_id=e4ac2eb07157bde62fa7f0b91f69ec20fdb6fa1d852903aa754d763a6a0de22c&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=wallet:user:read,wallet:accounts:read')}>Send Request</button>
					{/* <button className="btn btn-primary" onClick={() => listAccounts()}>portfolio</button> */}

				</header>
			</div>

		);

	}
}

export default App;
