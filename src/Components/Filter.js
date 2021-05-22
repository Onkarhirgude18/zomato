import { Component } from 'react';
import '../Styles/filter.css';
import axios from 'axios';
import queryString from 'query-string';


const filterStyle = {
    display: 'block'
};

class Filter extends Component {

    constructor() {
        super();
        this.state = {
            restaurantList: [],
            locationList: [],
            mealName: ""
        };
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { mealtype, meal } = qs;
        this.setState({
            mealName: meal
        });

        const req = {
            "mealtype": mealtype
        };

        axios({
            method: 'POST',
            url: 'https://obscure-retreat-97028.herokuapp.com/api/getFilteredRestaurants',
            headers: { 'Content-Type': 'application/json' },
            data: req
        }).then(response => {
            console.log(response.data.restaurants);
            this.setState({
                restaurantList: response.data.restaurants
            });
        }).catch(error => {
            console.log(error);
        });

        axios.get('https://obscure-retreat-97028.herokuapp.com/api/getLocations')
            .then(result => {
                this.setState({
                    locationList: result.data.locations
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleClick(item) {
        // we need to go to the details page 
        this.props.history.push(`/details?restaurant_id=${item._id}`);
    }

    render() {
        const { restaurantList, locationList, mealName } = this.state;
        return (
            <>
                <div className="container">
                    <div id="myId" className="heading row">{mealName} Places in Mumbai</div>
                    <div className="row">
                        <div className="col-sm-3 col-md-3 col-lg-3 filter-options">
                            <span className="glyphicon glyphicon-th-list toggle-span" data-toggle="collapse" data-target="#demo"></span>
                            <div id="demo" className="collapse show">
                                <div className="filter-heading">Filters</div>
                                <div className="Select-Location">Select Location</div>
                                <select className="Rectangle-2236">
                                    <option>Select</option>
                                    {
                                        locationList.map((item, index) => {
                                            return <option key={index} value={item.city_id}>{item.name}, {item.city}</option>
                                        })
                                    }
                                </select>
                                <div className="Cuisine">Cuisine</div>
                                <div style={filterStyle}>
                                    <input type="checkbox" />
                                    <span className="checkbox-items">North Indian</span>
                                </div>
                                <div style={filterStyle}>
                                    <input type="checkbox" />
                                    <span className="checkbox-items">South Indian</span>
                                </div>
                                <div style={filterStyle}>
                                    <input type="checkbox" />
                                    <span className="checkbox-items">Chineese</span>
                                </div>
                                <div style={filterStyle}>
                                    <input type="checkbox" />
                                    <span className="checkbox-items">Fast Food</span>
                                </div>
                                <div style={filterStyle}>
                                    <input type="checkbox" />
                                    <span className="checkbox-items">Street Food</span>
                                </div>
                                <div className="Cuisine">Cost For Two</div>
                                <div style={filterStyle}>
                                    <input type="radio" />
                                    <span className="checkbox-items">Less than Rs. 500</span>
                                </div>
                                <div style={filterStyle}>
                                    <input type="radio" />
                                    <span className="checkbox-items">Rs. 500 to Rs. 1000</span>
                                </div>
                                <div style={filterStyle}>
                                    <input type="radio" />
                                    <span className="checkbox-items">Rs. 1000 to Rs. 1500</span>
                                </div>
                                <div style={filterStyle}>
                                    <input type="radio" />
                                    <span className="checkbox-items">Rs. 1500 to Rs. 2000</span>
                                </div>
                                <div style={filterStyle}>
                                    <input type="radio" />
                                    <span className="checkbox-items">Rs. 2000 +</span>
                                </div>
                                <div className="Cuisine">Sort</div>
                                <div style={filterStyle}>
                                    <input type="radio" />
                                    <span className="checkbox-items">Price low to high</span>
                                </div>
                                <div style={filterStyle}>
                                    <input type="radio" />
                                    <span className="checkbox-items">Price high to low</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9 col-md-9 col-lg-9">
                            {
                                restaurantList.length > 0 ?

                                    restaurantList.map((item, index) => {
                                        const imagePath = require('../' + item.image).default;
                                        return <div className="Item" onClick={() => { this.handleClick(item) }}>
                                                    <div className="row pl-1">
                                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                                            <img className="img" src={imagePath} alt="restuarant"/>
                                                        </div>
                                                        <div className="col-sm-8 col-md-8 col-lg-8">
                                                            <div className="rest-name">{item.name}</div>
                                                            <div className="res-location">{item.locality}</div>
                                                            <div className="rest-address">{item.city}</div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row padding-left">
                                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                                            <div className="rest-address">CUISINES : {item.cuisine.map(cs => cs.name + ', ')}</div>
                                                            <div className="rest-address">COST FOR TWO : Rs. {item.min_price} </div>
                                                        </div>
                                                    </div>
                                                </div>
                                    })

                                : 

                                    <div className="noData">No Data Found</div>
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Filter;