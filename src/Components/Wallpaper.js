import React, { Component } from 'react';
import homepageimg from '../Assets/homepageimg.png';
import axios from 'axios';

const imageStyleObj = { width: '100%', height: '450px', margin: 'auto' };

class Wallpaper extends Component {
    constructor() {
        super();
        this.state = {
            suggestions: [],
            text: '',
            restaurants: []
        };
    }

    handleChange = (event) => {
        // make an API call to get the restaurants for the selected city
        const cityName = event.target.selectedOptions[0].value;
        axios({
            method: 'GET',
            url: `https://obscure-retreat-97028.herokuapp.com/api/getRestaurantsByLocation/${cityName}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            console.log(result);
            this.setState({
                restaurants: result.data.restaurants
            });
        }).catch(error => {
            console.log(error);
        });
    }

    textChangeHandler = (event) => {
        const searchText = event.target.value;
        const { restaurants } = this.state;

        let suggestions = [];

        if (searchText.length > 0) {
            suggestions = restaurants.filter(item => {
                return item.name.toLowerCase().includes(searchText.toLowerCase());
            });
        }

        this.setState({
            suggestions: suggestions,
            text: searchText
        });
    }

    renderSuggestions = () => {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul className="suggestionsBox">
                {
                    suggestions.map((item, index) => {
                        return <li key={index} value={item}> {item.name}, {item.city}</li>
                    })
                }
            </ul>
        );
    }

    render() {
        const { cities } = this.props;
        const { text } = this.state;
        return(
            <React.Fragment>
                <img src={homepageimg} alt="" style={imageStyleObj} />
                <div>
                    <div className="logo">
                        <p>e!</p>
                    </div>
                    <div className="headings">
                        Discover the best food & drinks , restaurant, cafes and bars
                    </div>
                    <div className="locationSelector">
                        <select className="locationDropdown" onChange={this.handleChange}>
                            <option value="" disabled selected>Please type a location</option>
                            {
                                cities.map((item, index) => {
                                    return <option key={index} value={item.city}>{item.name}, {item.city}</option>
                                })
                            }
                        </select>
                        <div className="search-box">
                            <input className="restaurantsinput" type="text" value={text} onChange={this.textChangeHandler} placeholder=" Search for restaurants" />
                            {
                                this.renderSuggestions()
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Wallpaper;
