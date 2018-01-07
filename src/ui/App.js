import React from 'react';
import ReactDOM from 'react-dom';
import ShapeEditor from './ShapeEditor';
import DocumentList from './DocumentList';
import DocumentPlayer from './DocumentPlayer';
import jquery from 'jquery';
import './app.css';
import {
	HashRouter as Router,
	Redirect,
	Route,
	Link
} from 'react-router-dom';
import { hashHistory } from 'react-router';
import ShapeService from "../services/ShapeService.js"
import Login from './Login';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
class App extends React.Component {
	
	requireAuthentication(Component){
		
		if(!ShapeService.isLogin()){
			return Form.create()(Login);
		}
		
		return Component;
	}
	
	render() {
		return(
			<Router history={hashHistory}>
			    <div className="app">
					<Route path="/" component={this.requireAuthentication(DocumentList)} exact />
					<Route path="/editor/:id" component={this.requireAuthentication(ShapeEditor)}/>					
					<Route path="/show/:id" component={DocumentPlayer}/>
				</div>
			</Router>
			);
	}
}
export default App;