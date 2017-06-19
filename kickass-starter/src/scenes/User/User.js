import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { API } from './../../variables';
import './User.css';
import UserForm from './../../component/UserForm/UserForm';

export default class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			userProjects: [],
			update: false,
			redirectToHome: false
		}
	}

	componentDidMount() {
		fetch(`${API}/user/${this.props.match.params.userId}`)
			.then(res => res.json())
			.then(user => {
				this.setState({
					user
				});
			})
			.catch(err => console.log('error ', err));

		fetch(`${API}/user/${this.props.match.params.userId}/projects`)
			.then(res => res.json())
			.then(userProjects => {
				this.setState({
					userProjects
				})
			})
	}

	handleUpdateUserBtnClick() {
		this.setState({
			update: true,
		});
	}

	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleDeleteUser() {
		fetch(`${API}/user/${this.state.user._id}`, {
			method: 'DELETE'
		})
			.then(data => {
				console.log('user deleted');
				this.setState({ redirectToHome: true });
			})
			.catch(err => console.log('error ', err));
	}

	handleUpdateUser() {
		fetch(`${API}/user/${this.state.user._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Origin': 'Access-Control-Allow-Origin'
			},
			body: JSON.stringify({
				name: this.state.name,
				age: this.state.age,
				type: this.state.type
			})
		})
			.then(res => {
				return res.json();
			})
			.then(user => {
				console.log('User updated');
				window.location.reload();
			})
			.catch(err => {
				console.log('error ', err);
			});
	}

	renderUserInfo() {
		const { user, redirectToHome, userProjects } = this.state;

		if (redirectToHome) {
			return (
				<Redirect to="/" />
			)
		}

		return (
			user === null
				? <p className="text-center"><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
				: <div className="container-center">
					<div className="sub-container user-info">
						<h3>User's informations :</h3>
						<p>Name : <span className="blue-text">{user.name}</span></p>
						<p>Age : <span className="blue-text">{user.age} years old</span></p>
						<p>Type : <span className="blue-text">{user.type}</span></p>

						<ul>
							<li>Projects :</li>
							{
								(userProjects.length > 0)
									? userProjects.map((project, index) => (
										<li key={index}>
											<Link to={`/project/${project._id}`}>
												{index + 1} / {project.title}
											</Link>
										</li>
									))
									: null
							}
						</ul>

						<button onClick={() => this.handleUpdateUserBtnClick()}>Update User's informations</button>
						<button onClick={() => this.handleDeleteUser()}>Delete User</button>
					</div>
				</div>
		)
	}

	renderUserUpdate() {
		const { user } = this.state;
		return (
			<div>
				<UserForm action="update"
					name={user.name}
					age={user.age}
					type={user.type}
					userId={user._id} />
			</div>
		)
	}

	render() {
		const { update } = this.state;

		return (
			(!update)
				? this.renderUserInfo()
				: this.renderUserUpdate()
		)
	}
};
