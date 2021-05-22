import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class QuickSearches extends Component {

    handleClick(item) {
        // we need to go to the filter page with mealtype
        this.props.history.push(`/filter?mealtype=${item.meal_type}&meal=${item.name}`);
    }

    render() {
        const  { mealtypes } = this.props;
        console.log(mealtypes);
        return(
            <>
                <div className="quicksearch">
                    <p className="quicksearchHeading">
                        Quick Searches
                    </p>
                    <p className="quicksearchSubHeading">
                        Discover restaurants by type of meal
                    </p>
                    <div className="container-fluid">
                        <div className="row">

                            {
                                mealtypes.map((item, index) => {
                                    const imagePath = require('../' + item.image).default;
                                    return <div className="col-sm-12 col-md-4 col-lg-4" onClick={() => { this.handleClick(item) }}>
                                                <div className="tileContainer">
                                                    <div className="tileComponent1">
                                                        <img src={imagePath} alt="" height="150" width="140" />
                                                    </div>
                                                    <div className="tileComponent2">
                                                        <div className="componentHeading">
                                                            {item.name}
                                                        </div>
                                                        <div className="componentSubHeading">
                                                            {item.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                })
                            }

                            
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(QuickSearches);