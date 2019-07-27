import React, {Component} from 'react';
import ScoreInput from './ScoreInput';

export default class CreateResult extends Component {
	constructor(props){
		super(props);
		this.onChangeGame = this.onChangeGame.bind(this);
		this.onChangeNumberOfPlayers = this.onChangeNumberOfPlayers.bind(this);
		this.onChangeScores = this.onChangeScores.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			game: null,  
			scores: [],
			numberOfPlayers: 0, 
			games: [],
			users: [],
		}
	}

	componentDidMount() {
		fetch('http://localhost:5000/games/')
			.then(response => response.json())
			.then(data => {
				const games = data;
				if(games.length > 0){
					this.setState({
						games,
						game: games[0],
						numberOfPlayers: games[0].minPlayers,
					})
				}
				this.initializeScores(games[0].minPlayers);
			});

		fetch('http://localhost:5000/users/')
			.then(response => response.json())
			.then(data => {
				if(data.length > 0){
					this.setState({
						users: data
					})
				}
			});
	}

	onChangeGame(e){
		this.setState({ game: e.target.value });
	}

	onChangeScores(e){
		this.setState({ scores: e.target.value });
	}

	initializeScores(length) {
		const scores = Array.from({ length }, () => ({
			user: null,
			points: null,
		}));
		this.setState({ scores });
	}
	
	onChangeNumberOfPlayers(e){
		const numberOfPlayers = e.target.value;
		this.setState({ numberOfPlayers });
		this.initializeScores(numberOfPlayers);
	}

	onSubmit(e){
		e.preventDefault();
		const {game, scores} = this.state;
		const result = { game, scores };
		console.log(result);
		fetch('http://localhost:5000/results/add', {
				method: 'POST',
				body: JSON.stringify(result),
				headers: { 'Content-Type': 'application/json' }
			}).then(() => {
			 	this.props.history.push('/');
			 });
	}

	render() {
		const { games, scores } = this.state;
		const game = games.find(game => game._id === this.state.game);
		if (games.length === 0) return "Loading";
		return (
			<div>
				<form onSubmit={this.onSubmit}>
				<div className="form-group">
					<select className="form-control"
						value={this.state.game}
						onChange={this.onChangeGame}>
						{this.state.games.map(game => (
							<option key={game._id} value={game._id}>
							{game.name}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<input className="form-control"
						value={this.state.numberOfPlayers}
						onChange={this.onChangeNumberOfPlayers}
						type="number" min={game && game.minPlayers} max={game && game.maxPlayers} />
				</div>
				<div className="form-group">
					<table>
						<thead className = "thead-dark">
						</thead>
						<tbody>
							{scores.map((score, index) => (
								<ScoreInput
									key={index}
									score={score}
									users={this.state.users}
									onChange={updatedScore => {
										const newScores = scores.map(
											s => s === score ? updatedScore : s
										);
										console.log(newScores)
										this.setState({ scores: newScores });
									}}
								/>
							))}
						</tbody>
					</table>
				</div>
				<div className="form-group">
					<input type="submit" value="Create Result" className="btn btn-primary"/>
				</div>
				</form>
			</div>
				
		)
	}
}

