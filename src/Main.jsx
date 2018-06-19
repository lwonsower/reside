import React, { Component } from 'react';
import axios from "axios";
import firebase from 'firebase';
import firebaseConfig from './config';

import Listing from "./Listing";

firebase.initializeApp(firebaseConfig);

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();

		this.startSession = this.startSession.bind(this);
		this.toggleStar = this.toggleStar.bind(this);
	}

	getInitialState() {
		return ({
			housing: [],
			filterFavorites: false,
			starredListings: [],
			username: "",
			view: "home",
		});
	};

	componentDidMount() {
		axios({
		  method:'get',
		  url:"https://api.simplyrets.com/openhouses",
			auth: {
				username: "simplyrets",
			  password: "simplyrets",
			},
		}).then((response) => {
			this.setState({
				housing: response.data,
			});
		})
	};

	startSession(name) {
		const ref = firebase.database().ref(name);
		const userId = Math.floor(Math.random() * 1000000);
		window.localStorage.setItem("userId", userId);

		ref.once("value", snapshot => {
			const data = snapshot.val();
			const starredListings = [];

			if (snapshot.exists()) {
				console.log(ref.child("userId"));
				for (let key in data) {
					starredListings.push(data[key]["starredListing"])
				}
			} else {
				ref.push({
					userId,
				});
			}

			return this.setState({
				starredListings,
				view: "listings",
			});
		});
	}

	toggleStar(listingId) {
		const updatedStarredListings = [...this.state.starredListings];
		const ref = firebase.database().ref(`${this.state.username}`);
		let listingKey;

		new Promise(() => {
			ref.once("value", snapshot => {
				let data = snapshot.val();

				if (snapshot.exists()) {
					for (let key in data) {
						if (data[key]["starredListing"] === listingId) {
							listingKey = key;
						}
					}
				}
			}).then(() => {
				if (this.state.starredListings.includes(listingId)) {
					const index = updatedStarredListings.indexOf(listingId);
					updatedStarredListings.splice(index, 1);

					ref.child(listingKey).remove();
				} else {
					updatedStarredListings.push(listingId);

					ref.push({
						starredListing: listingId,
					});
				}
				return this.setState({
					starredListings: updatedStarredListings,
				});
			});
		});
	};

	render() {
		const {
			housing,
			filterFavorites,
			starredListings,
			username,
			view,
		} = this.state;

		const filteredFavorites = filterFavorites ? (
			housing.filter(property => starredListings.includes(property.listing.mlsId))
		) : (
			housing
		);

		const body = view === "home" ? (
			<div className="home-body column">
				<div className="home-details column">
					<div className="home-title">Welcome to Hausblick.</div>
					Please enter your name to restore an old session or create a new one.
					<form id="member-id-form">
						<input
							type="text"
							placeholder="Enter your name"
							id="member-id-form"
							onChange={event => this.setState({username: event.target.value})}
						/>
					<input type="button" id="member-id-form" onClick={() => this.startSession(username)} value="Go" disabled={username.length <= 0}/>
					</form>
				</div>
			</div>
		) : (
			<div className="all-listings column">
				<div className="all-listings-info">
					<div>Click the star to save a listing to your favorites.</div>
					<div className="row">
						<div className="buttons" onClick={() => this.setState({ filterFavorites: false })}>view all</div>
						<div className="buttons" onClick={() => this.setState({ filterFavorites: true })}>favorites</div>
						<div className="buttons" onClick={() => (
								this.setState({
									filterFavorites: false,
									starredListings: [],
									username: "",
									view: "home",
								})
						)}>
						  log out
					  </div>
					</div>
				</div>
				{filteredFavorites.map(property => (
					<Listing
						key={property.listing.mlsId}
						listing={property.listing}
						onStar={() => this.toggleStar(property.listing.mlsId)}
						starred={starredListings.includes(property.listing.mlsId)}
					/>
			))}
			</div>
		);

		return (
			<div className="main-div">
				<h1 className="title">Hausblick</h1>
				{body}
			</div>
		);
	};
};
