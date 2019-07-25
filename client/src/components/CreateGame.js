import React, {Component} from 'react';
import axios from 'axios';

export default class CreateGame extends Component {
    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMinPlayers = this.onChangeMinPlayers.bind(this);
        this.onChangeMaxPlayers = this.onChangeMaxPlayers.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { name: '', minPlayers: 0, maxPlayers: 0 };
    }    

    onChangeName(e){
        this.setState({ name: e.target.value});
    }

    onChangeMinPlayers(e){
        this.setState({ minPlayers: e.target.value});
    }

    onChangeMaxPlayers(e){
        this.setState({ maxPlayers: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        const game = { name: this.state.name, minPlayers: this.state.minPlayers, maxPlayers: this.state.maxPlayers}
        console.log(game);
        axios.post('http://localhost:5000/games/add',game)
            .then(res => console.log(res.data));
        this.setState({ name: '', minPlayers: 0, maxPlayers: 0 });
    }

    render() {
        return (
            <div>
                <h3>Create new game</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Name: </label>
                        <input type="text" required value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div>
                        <label>Minimum number of players: </label>
                        <input type="text" required value={this.state.minPlayers} onChange={this.onChangeMinPlayers} />
                    </div>
                    <div>
                        <label>Maximum number of players: </label>
                        <input type="text" required value={this.state.maxPlayers} onChange={this.onChangeMaxPlayers} />
                    </div>
                    <div>
                        <input type="submit" value="Create Game" />
                    </div>
                </form>
            </div>
        )
    }

}