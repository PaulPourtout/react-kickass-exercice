import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API } from './../../variables';
import List from './../../component/List/List';
import './Home.css';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: null,
			projects: null
		};
	}

	componentDidMount() {
		fetch(`${API}/users`)
			.then(data => data.json())
			.then(res => {
				this.setState({
					users: res
				});
			})
			.catch(err => console.log('error ', err));

		fetch(`${API}/projects`)
			.then(data => data.json())
			.then(res => {
				this.setState({
					projects: res
				});
			})
			.catch(err => console.log('error ', err));
	}


	renderUsers() {
		const { users } = this.state;

		return (
			users === null
				? <p className="text-center"><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
				: users.map((user, index) => {
					return (
						<li key={index}>
							<Link className="home-user" to={`/user/${user._id}`}>{user.name}</Link>
						</li>
					)
				})
		)
	}

	renderProjects() {
		const { projects } = this.state;

		return (
			projects === null
				? <p><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
				: projects.map((project, index) => {
					return (
						<li key={index} >
							<a className="home-user" href={`/project/${index}`}>{project.title}</a>
						</li>
					)
				})
		)
	}

	render() {
		const { users, projects } = this.state;
		return (
			<div className="flex-row">
				<List
					datas={users}
					title="Users :"
					elementsType="user"
					propertyCalling="name"
				/>
				<List
					datas={projects}
					title="Projects :"
					elementsType="project"
					propertyCalling="title"
				/>
				{/*
				<ul className="home-list">
					<li>Users : </li>
					{this.renderUsers()}
				</ul>

				<ul className="home-list">
					<li>Projects :</li>
					{this.renderProjects()}
				</ul>*/}
			</div>
		);
	}
}

