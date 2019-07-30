import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';

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
        fetch(' /users/add', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-type': 'application/json'}
        })
        this.setState({ username: '' })
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group>
                    <Form.Control placeholder = "Username"
                     type="text" required value={this.state.username} onChange={this.onChangeUsername} />
                </Form.Group>
                <Button type="submit" variant="primary">Create User</Button>
            </Form>
        )
    }

}