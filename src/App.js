import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import {Route, Switch} from 'react-router-dom';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={BurgerBuilder} />
                        <Route exact path='/orders' component={Orders} />
                        <Route path='/checkout' component={Checkout} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
