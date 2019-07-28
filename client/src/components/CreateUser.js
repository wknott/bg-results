import React, {Component} from 'react';

export default class CreateUser extends Component {
    constructor(props){
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { username: '' };
    }
    
    onChangeUsername(e){
        this.setState({ username: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        const user = { username: this.state.username,}
        console.log(user);
        fetch('http://localhost:5000/users/add', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-type': 'application/json'}
        })
        this.setState({ username: '' })
    }

    render() {
        return (
            <div>
                <form  onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input className="form-control-lg" placeholder ='Username'
                        type="text" required value={this.state.username} onChange={this.onChangeUsername} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }

}