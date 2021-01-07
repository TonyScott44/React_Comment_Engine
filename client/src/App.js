import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  // Whenever the state of these elements are updated, the JSX elements will get updated on the fly
  state = {
    title: '',
    body: '',
    entries: []
  };

  componentDidMount = () => {
    this.getComments();
  };

  // Get existing comments
  getComments = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ entries: data});
        console.log("Data has been received.");
      })
      .catch(() => {
        console.log("There has been an error retrieving existing comments.")
      });
  }

  handleChange = ({ target }) => {
    // The target is whatever's being updated (title,body,etc)
    const { name, value } = target; 
    // Dynamically pass whatever value is coming from client/input
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();
    
    const payload = {
      title: this.state.title,
      body: this.state.body
    }; 

    // Axios will make the http call to send the data to the server
    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('Data has transported to server.');
      this.resetUserInputs();
      this.getComments();
    })
    .catch(() => {
      console.log('Internal server error');
    });
  };

  resetUserInputs = () => {
    this.setState({
      title: '',
      body:''
    });
  };

  displayEntries = (entries) => {
    if(!entries.length) return null;

    return entries.map((entry, index) => (
      <div className = "comments_display" key={index}>
        <h3>{entry.title}</h3>
        <p>{entry.body}</p>
      </div>
    ));
  };

  render() {
    console.log('State: ', this.state);
    //JSX
    return(
      <div className = "app">
        <h2>React Comments Engine</h2>
        <form onSubmit={this.submit}>
          <div className = "form-input">
            <input
              type = "text"
              name = "title"
              placeholder = "Title"
              value = {this.state.title}
              onChange = {this.handleChange}
            />
          </div>
          <div className = "form-input">
            <textarea
             name = "body"
             placeholder = "Enter your comment here" 
             cols = "30" 
             rows = "10" 
             value = {this.state.body} 
             onChange = {this.handleChange}
            >   
            </textarea>
          </div>
          <button>Submit</button>
        </form>
        <div className = "comment-entries">
          {this.displayEntries(this.state.entries)}
        </div>
      </div>
    );
  }
}

export default App;