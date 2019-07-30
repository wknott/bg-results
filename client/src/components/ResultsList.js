import React, {Component} from 'react';
import { Alert, Spinner, Table, Form } from 'react-bootstrap';

const Result = props => {
  const {game,scores} = props.result;
  const score = scores.map(score => {
  return (score.user.username + ': ' + score.points + ' ' )});
  return (<tr>
    <td>{game.name}</td>
    <td>{props.result.date.substring(0,10)}</td>
    <td>{score}</td>
  </tr>)
}

export default class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.state = {
      games: [],
      results: null,
      id: null,
     };
  }
  
  componentDidMount() {
    fetch('/results/')
      .then(response => response.json())
      .then(data => {
          this.setState({results: data});
      });

    fetch('/games/')
			.then(response => response.json())
			.then(data => {
				const games = data;
				this.setState({games});
      });
    };
  
  onChangeId(e){
    
    if(e.target.value.length > 1){
    this.setState({id: e.target.value})
    fetch('/results/game/' + e.target.value)
      .then(response => response.json())
      .then( data => {
          this.setState({results: data});
      });}
      else {
      this.setState({id: ''})
        fetch('/results/')
      .then(response => response.json())
      .then(data => {
          this.setState({results: data});
      });
      }
  }

  resultsList(){
    return this.state.results.slice(0).reverse().map(currentresult => {
      return <Result result={currentresult} key={currentresult._id}/>
    })
  }

  
  render() {
    if (this.state.results === null) {
      return(
        <Spinner animation="border" variant="light" />
      )
    }
    else if (this.state.results.length === 0){
      return (
        <Alert key='index' variant='primary'>
          <Alert.Link href="/result" > Create result </Alert.Link>of this game!
        </Alert> 
      )}
    else {
    return (
        <div>
        <Form>
          <Form.Group>
            <Form.Control as="select"
              value={this.state.id||''}
              onChange={this.onChangeId}>
              <option value="">All games</option>
              {this.state.games.map(game => (
                <option key={game._id} value={game._id}>
                {game.name}
                </option>
              ))}></Form.Control>
          </Form.Group>
        </Form>
        <Table striped bordered hover variant="dark">
              <thead>
                  <tr>
                      <th>Game</th>
                      <th>Date</th>
                      <th>Scores</th>
                  </tr>
              </thead>
              <tbody>
                
                  {this.resultsList()}
              </tbody>
          </Table>
        </div>
    )}
  }
}