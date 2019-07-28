import React, {Component} from 'react';

export default class CreateGame extends Component {
    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMinPlayers = this.onChangeMinPlayers.bind(this);
        this.onChangeMaxPlayers = this.onChangeMaxPlayers.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { name: '', minPlayers: '', maxPlayers: '' };
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
        fetch(' /games/add',{
            method: 'POST',
            body: JSON.stringify(game),
            headers: {'Content-type':  'application/json'}
        });
        this.setState({ name: '', minPlayers: '', maxPlayers: '' });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input className="form-control-lg"  placeholder="Name"
                        type="text" required value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <input className="form-control-lg" placeholder="Min number of players"
                         type="number" required value={this.state.minPlayers} onChange={this.onChangeMinPlayers} />
                    </div>
                    <div className="form-group">
                        <input className="form-control-lg" placeholder="Max number of players"
                        type="number" required value={this.state.maxPlayers} onChange={this.onChangeMaxPlayers} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Game" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }

}