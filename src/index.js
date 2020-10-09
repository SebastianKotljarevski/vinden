import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import Button from "@material-ui/core/Button";
import "semantic-ui-css/semantic.min.css";
import {ReactComponent as VindenBoxLogo} from "./boxLogo.svg";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Header from "./header.js";
import Order from "./order.js";
import Checkout from "./checkout.js";
import AppContext from "./appContext.js";
import { itemData } from "./items.js";
import { Snackbar } from "./snackbar";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.snackbarRef = React.createRef();
        this.state = {
            storageItems: []
        };
    }

    _showSnackbarHandler = (check, items) => {
        this.snackbarRef.current.openSnackBar(check, items);
    }

    componentDidMount() {
        const items = itemData.length > 0 && itemData.map((item) => {
            return { ...item, quantity: 0 }
        })

        this.setState({ storageItems: items });
    }

    getItemById = (id) => {
        return this.state.storageItems ? this.state.storageItems.find((item) => item.id === id) : {};
    }

    doIncrement = (id) => {
        const items = this.state.storageItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return { ...item }
        })

        this.setState({ storageItems: items });

        const check = this.snackbarRef.current.state.isActive;

        this._showSnackbarHandler(check, items);
    }

    doDecrement = (id) => {
        const items = this.state.storageItems.map(item => {
            if (item.id === id) {
                if (item.quantity == 0) {
                    return { ...item};
                } else {
                    return { ...item, quantity: item.quantity - 1}
                }
            }
            return { ...item }
        })

        this.setState({ storageItems: items });

        const storageItemSelected = items.find(item => item.quantity > 0);

        this._showSnackbarHandler(storageItemSelected, items);
    }

    render() {
        return (
                <AppContext.Provider value={{
                    storageItems: this.state.storageItems,
                    getItemById: this.getItemById,
                    doIncrement: this.doIncrement,
                    doDecrement: this.doDecrement
                }}>
                    <Router>
                        <Switch>
                            <Route path="/checkout"><Checkout/></Route>
                            <Route path="/order"><Order/></Route>
                            <Route path="/" exact><Home/></Route>
                        </Switch>
                        <Snackbar ref={this.snackbarRef}/>
                    </Router>
                </AppContext.Provider>
        );
    }
}

class Home extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Content/>
            </div>
        );
    }
}

class Buttonn extends React.Component {
    render() {
        return (
            <Button variant="outlined" color="black">
                <Link to="/order">
                    Select
                </Link>
            </Button>
        );
    }
}

class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <h1>What do you want to store?</h1>
                <p>Select what you want to store and get an estimate based on standard sizes.
                The actual cost is based on the measured volume of what you actually store.
                </p>

                <div className="bookingBox">
                    <VindenBoxLogo/>
                    <h3>Select items</h3>
                    <p>With this option you select items directly from a list. Perfect for a few items.</p>
                    <Buttonn/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
