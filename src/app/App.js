import React, { Component } from 'react';
import Login from "../components/Login/Login.js";
import './App.css';
import Home from '../components/HomePage/Home.jsx';
import Navigation from '../components/Navigation/Navigation.jsx';
import IngredientPage from "../components/IngredientsPage/IngredientsPage.jsx"
import { Route, Switch } from 'react-router-dom';
//import Favorite from '../components/Favorites/Favorite.jsx';
import RecipeDetails from '../components/RecipePage/RecipeDetails.jsx';
import Search from '../components/Search/Search';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loginState: !!localStorage.getItem('token')
		}
		this.updateLoginState = this.updateLoginState.bind(this);
	}

	updateLoginState = (bool) => {
		if(localStorage.getItem('token')){
			this.setState({
					loginState: true
			});
		}
		else{
			this.setState({
				loginState: false
			});
		}
	};

	render() {
		return (
			<div className="app-routes">
				{this.state.loginState && <Navigation logout={this.updateLoginState}/>}
				<Switch>
					{this.state.loginState && <Route path="/home" exact component={Home} />}
					{this.state.loginState && <Route path="/ingredient" exact component={IngredientPage} />}
					{/* {this.state.loginState && <Route path="/favorite" exact component={Favorite}/>} */}
					{this.state.loginState && <Route path="/recipes/:recipe_id" exact component={RecipeDetails}/>}
					{this.state.loginState && <Route path="/search/:search?" exact component={Search}/>}
					<Route path="/" render={(props) => <Login {...props} isLoggedIn={this.state.loginState} login={this.updateLoginState} />}/>
				</Switch>
			</div>	
		);
	}
}

export default App;
