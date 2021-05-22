import { Route, BrowserRouter } from 'react-router-dom';

import Home from './Components/Home';
import Filter from './Components/Filter';
import Details from './Components/Details';

import Header from './Components/Header';


const Router = () => {
    return(
        <BrowserRouter>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/filter" component={Filter} />
            <Route exact path="/details" component={Details} />
        </BrowserRouter>
    );
}

export default Router;