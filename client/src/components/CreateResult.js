import React, {Component} from 'react';
import axios from 'axios';

import ScoreInput from './ScoreInput';

export default class CreateResult extends Component {
    constructor(props){
        super(props);
        this.onChangeGameId = this.onChangeGameId.bind(this);
        this.onChangeNumberOfPlayers = this.onChangeNumberOfPlayers.bind(this);
        this.onChangeScores = this.onChangeScores.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            gameId: null,  
            scores: [],
            numberOfPlayers: 0, 
            games: [],
            users: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/games/')
            .then(response => {
                const games = response.data;
                if (games.length > 0) {
                    this.setState({ 
                        gameId: games[0]._id,
                        games,
                        numberOfPlayers: games[0].minPlayers,
                    })}
                    this.initializeScores(games[0].minPlayers);
                })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({ 
                        users: response.data })}
            })           
    }

    onChangeGameId(e){
        this.setState({ gameId: e.target.value });
    }

    onChangeScores(e){
        this.setState({ scores: e.target.value });
    }

    initializeScores(length) {
        const scores = Array.from({ length }, () => ({
            // czyli tutaj podajemy ile wyników wygenerować i tyle ich robi okej i gdzie ja wywolac, zeby sie od razu pojawila?
            userId: null,
            points: null,
        }));
        this.setState({ scores });
    }
    
    onChangeNumberOfPlayers(e){
        const numberOfPlayers = e.target.value;
        this.setState({ numberOfPlayers });
        this.initializeScores(numberOfPlayers); // tutaj równoważnie jak wczesniej jest
        // i teraz wyżej tego można uzyc w componentdidmount czy construcor? pierwsze,
    }

    onSubmit(e){
        e.preventDefault();
        const {gameId, scores} = this.state;
        const result = { gameId, scores };
        console.log(result);
        axios.post('http://localhost:5000/results/add',result)
            .then(res => console.log(res.data)); 
    }

    render() {
        const { games, gameId, scores } = this.state;
        const game = games.find(game => game._id === gameId);
        console.log(game)
        if (games.length === 0) return "Loading";
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <div>
                    <select value={this.state.gameId}
                        onChange={this.onChangeGameId}>
                        {this.state.games.map(game => (
                            <option key={game._id} value={game._id}>
                            {game.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <input value={this.state.numberOfPlayers}
                        onChange={this.onChangeNumberOfPlayers}
                        type="number" min={game.minPlayers} max={game.maxPlayers} />
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Players</th>
                                <th>Points</th>
                            </tr>
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
                <div>
                    <input type="submit" value="Create Result" />
                </div>
                </form>
            </div>
                
        )
    }
}