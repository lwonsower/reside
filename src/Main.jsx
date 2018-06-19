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

    // A new userId is a random six digit number
    let userId = Math.floor(Math.random() * 1000000);

    ref.once("value", snapshot => {
      const data = snapshot.val();
      const starredListings = [];

      if (snapshot.exists()) {
        for (let key in data) {
          if (data[key]["userId"]) {
            // If a user already exists, their userId replaces the random number
            userId = data[key]["userId"];
          } else {
            // The user's "starred" listings are added to state for easy manipulation
            starredListings.push(data[key]["starredListing"]);
          }
        }
      } else {
        // A new ref is created with the name and userId
        ref.push({
	        userId,
        });
      }
      // The userId is saved to browser localstorage
      window.localStorage.setItem("userId", userId);

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
          {/* I realize this app has absolutely no security, but I figured the damage done would be minimal with this apps limited use. ¯\_(ツ)_/¯ */}
          <form id="member-id-form" onSubmit={event => event.preventDefault()}>
            <input
              type="text"
              placeholder="Enter your name"
              id="member-id-form"
              onChange={event => this.setState({username: event.target.value})}
            />
            <input
              disabled={username.length <= 0}
              id="member-id-form"
              onClick={() => this.startSession(username)}
              type="button"
              value="Go"
            />
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
            <div
							className="buttons"
							onClick={() => (
                this.setState({
                  filterFavorites: false,
                  starredListings: [],
                  username: "",
                  view: "home",
                }, () => {
                  window.localStorage.removeItem("userId")
                })
              )}
						>
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
