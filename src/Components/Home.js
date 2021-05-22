import React, { Component } from 'react';

import QuickSearches from './QuickSearches';
import Wallpaper from './Wallpaper';

import '../Styles/home.css';

import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            cities: [],
            mealtypes: []
        }    
    }

    componentDidMount() {
        // Make API calls using axios

        // (1) get the list of locations
        axios.get('https://obscure-retreat-97028.herokuapp.com/api/getLocations')
            .then(result => {
                this.setState({
                    cities: result.data.locations
                });
            })
            .catch(error => {
                console.log(error);
            });

        // (2) get the list of mealtypes
        axios.get('https://obscure-retreat-97028.herokuapp.com/api/getMealTypes')
            .then(result => {
                this.setState({
                    mealtypes: result.data.mealTypes
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { cities, mealtypes } = this.state;
        return (
            <React.Fragment>
                <Wallpaper cities={cities}/>
                <QuickSearches mealtypes={mealtypes}/>
            </React.Fragment>
        );
    }
}

export default Home;