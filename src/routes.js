import React from "react";
import "./style.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Order from "./order.js";
import { App } from "./index.js";

export default class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/"><App/></Route>
                    <Route path="/order"><Order/></Route>
                    <Route path="/checkout"><Checkout></Route>
                </Switch>
            </Router>
        )
    }
}
