var AddUser = React.createClass({
  getInitialState: function() {
    return {
      newUser: ''
    }
  },
  updateNewUser: function(event) {
    this.setState({
      newUser: event.target.value
    });
  },
  handleAddUser: function() {
    this.props.addNew(this.state.newUser);
    this.setState({
      newUser: ''
    });
  },
  render: function() {
    return (
      <div>
        <input type="text" value={this.state.newUser} onChange={this.updateNewUser} />
        <button onClick={this.handleAddUser}>Add User</button>
        <p>{this.state.newUser}</p>
      </div>
    );
  }
});

var UserCountry = React.createClass({
  getInitialState: function() {
    return {
      country: this.props.country
    }
  },
  render: function() {
    return (
      <li>{this.state.country}</li>
    );
  }
});

var User = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.data.name,
      countries: this.props.data.countries
    }
  },
  render: function() {
    return (
      <li>
        {this.state.name}
        <CountryList countries={this.state.countries} />
      </li>
    );
  }
});

var UserList = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.users.map(function(user, index) {
          return <User key={index} data={user}/>;
        })}
      </ul>
    );
  }
});

var UsersApp = React.createClass({
  getInitialState: function(){
    return {
      users: this.props.users
    }
  },
  addUser: function(user) {
    this.setState({
      users: this.state.users.concat([{"name": user, "countries": ["Test", "Test", "Test", "Test"]}])
    });
  },
  render: function(){
    return (
      <div>
        <UserList users={this.state.users} />
        <AddUser addNew={this.addUser} />
      </div>
    )
  }
});

$.get('users.json').then(function(data) {
  React.render(<UsersApp users={data}/>, document.getElementById('users_list'));
}, function(error) {
  console.log(error);
});