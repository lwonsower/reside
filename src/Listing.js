import React, { Component } from 'react';
import Moment from "moment";
import mapsIcon from "./images/mapsicon.png";

export default class Listing extends Component {
	constructor(props) {
		super(props);
	}

	render() {
    const {
      listing,
      onStar,
      starred,
    } = this.props;

		return(
      <div
        className="listing-root row"
        style={{ background: `url(${listing.photos[0]}) no-repeat center`, backgroundSize: "cover" }}
      >
        <div className="listing-inner row">
          <div className="address column">
            <div>{listing.address.full}</div>
            <div>{listing.address.city}, {listing.address.state} {listing.address.postalCode}</div>
            <div>
              <a href={`https://www.google.com/maps/search/?api=1&query=${listing.geo.lat},${listing.geo.lng}`} target="_blank">
                <img src={mapsIcon} className="maps-icon"/>
              </a>
            </div>
          </div>
          <div className="details column">
            <div>Stories: {listing.property.stories}</div>
            <div>Bedrooms: {listing.property.bedrooms}</div>
            <div>Full Baths: {listing.property.bathsFull}</div>
            <div>Half Baths: {listing.property.bathsHalf}</div>
            <div>Listed: {Moment(listing.listDate).format("MM/DD/YYYY")}</div>
            <div>mlsId: {listing.mlsId}</div>
            <div>Price: ${listing.listPrice}</div>
          </div>
          {starred ? <div className="star" onClick={onStar}>&#9733;</div> : <div className="star" onClick={onStar}>&#9734;</div>}
        </div>
      </div>
		);
	};
};
