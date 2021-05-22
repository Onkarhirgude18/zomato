import { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class Details extends Component {

    constructor() {
        super();

        this.state = {
            restaurantDetails: undefined
        };
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { restaurant_id } = qs;

        axios.get(`https://obscure-retreat-97028.herokuapp.com/api/getRestaurantsById/${restaurant_id}`)
            .then(result => {
                this.setState({
                    restaurantDetails: result.data.restaurant
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    stringifyValues = (val) => {
        if (typeof val === 'object' && Object.prototype.toString.call(val) !== '[object Date]') {
            return JSON.stringify(val);
        } else {
            return val;
        }
    }


    placeOrder = () => {
        /*
        (1) Prepare the data to call the payment API in BE
        (2) Call the payment API in BE
        (3) Form building in FE
        (4) submit the form
        */

        // (1) Prepare the data to call the payment API in BE
        const data = {
            amount: 500,
            email: "abhishek_saini@live.com",
            mobileNo: "9986851333"
        };
        this.getTokenFromBE(data).then(response => {
            const formInformation = {
                action: 'https://securegw-stage.paytm.in/order/process',
                params: response
            };
            const form = this.buildForm(formInformation);
            document.body.appendChild(form);
            // (4) submit the form
            form.submit();
            form.remove();
        }).catch(error => {
            console.log(error);
        })
    }

    getTokenFromBE = (data) => {
        console.log(JSON.stringify(data));
        // (2) Call the payment API in BE
        return fetch(`https://localhost:4050/api/payment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).catch(err => console.log(err));
    }

    buildForm = (formInformation) => {
        // (3) Form building in FE
        const { action, params } = formInformation;

        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', action);

        Object.keys(params).forEach(key => {
           const input = document.createElement('input');
           input.setAttribute('type', 'hidden');
           input.setAttribute('name', key);
           input.setAttribute('value', this.stringifyValues(params[key])); 
        });
        return form;
    }

    render() {
        const { restaurantDetails } = this.state;
        let imagePath;
        if (restaurantDetails) {
            imagePath = require('../' + restaurantDetails[0].image).default;
        }
        return (
            <>
                {
                    restaurantDetails !== undefined 
                    ?
                        <div className="container">
                            <img src={imagePath} alt="rest" style={{ width: '100%'}}/>
                            <h2>{restaurantDetails[0].name}</h2>
                            <div className="placeorder">
                                <button className="btn btn-danger" onClick={this.placeOrder}>Place order</button>
                            </div>
                            <Tabs>
                                <TabList>
                                    <Tab>Overview</Tab>
                                    <Tab>Contact</Tab>
                                </TabList>

                                <TabPanel>
                                    <h3>About this place</h3>

                                    <h4>Cuisine</h4>
                                    <p>{restaurantDetails[0].cuisine.map(cs => cs.name + ', ')}</p>

                                    <h4>Average cost</h4>
                                    <p>{restaurantDetails[0].min_price}</p>
                                </TabPanel>
                                <TabPanel>
                                    <h3>Contact</h3>
                                    <p>{restaurantDetails[0].locality} - {restaurantDetails[0].city}</p>
                                </TabPanel>
                            </Tabs>
                        </div>
                    : 
                    <div className="noData">No Data Found</div>

                }
            </>
        );
    }
}

export default Details;