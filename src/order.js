import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import Button from "@material-ui/core/Button";
import Header from "./header.js";
import { Card, Image } from "semantic-ui-react"
import AppContext from "./appContext.js";
import {
    Link
} from "react-router-dom";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Order extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Content/>
            </div>
        );
    }
}

class Content extends React.Component {
    render() {
        return (
            <div className="orderContent">
                <div className="textPlacement">
                    <h1>Select what to store</h1>
                    <p>So that you can get an estimated storage price and that we know approximately how much we are going to pick up.</p>
                </div>
                <div class="items">
                    <h2>Common items</h2>
                    <CreateItems/>
                </div>
            </div>
        );
    }
}

class CreateItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = { windowWidth: window.innerWidth, itemsPerRow: 3 };
    }

    handleResize = () => {
        this.setState({ windowWidth: window.innerWidth });
        if (this.state.windowWidth < 417) {
            this.setState({ itemsPerRow: 1})
        } else if (this.state.windowWidth < 1113) {
            this.setState({ itemsPerRow: 2 })
        } else if (this.state.windowWidth > 1114) {
            this.setState({ itemsPerRow: 3 })
        } 
    };
      
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
        console.log(this.state.windowWidth);
    }
      
    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
        console.log(this.state.windowWidth);
    } 
    
    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="random">
                        <Card.Group itemsPerRow={this.state.itemsPerRow}>
                            {context.storageItems.length > 0 && context.storageItems.map((item) => (
                                <Card id="red" key={item.id}>
                                    <Card.Content className="cardDiv">
                                        <Image className="cardImage"
                                            floated="left"
                                            src={item.img}
                                        />
                                        <Card.Header className="cardTextWidth">{item.name}</Card.Header>
                                        <Card.Meta className="cardTextWidth">{item.price + " kr/month"}</Card.Meta>
                                        <SelectItemButton
                                            item={context.getItemById(item.id)}
                                            doDecrement={context.doDecrement}
                                            doIncrement={context.doIncrement}
                                        />
                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Group>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}

class SelectItemButton extends React.Component {
    render() {
        const { item, doIncrement, doDecrement } = this.props;

        return (
            <div className="cardButton">
                <button className="incrementButton" onClick={() => doDecrement(item.id)}><FontAwesomeIcon icon={faMinus} /></button>
                <input type="text" className="number" value={item.quantity}></input>
                <button className="incrementButton" onClick={() => doIncrement(item.id)}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        );
    }
}

class SelectButton extends React.Component {
    render() {
        return (
            <Button id="SelectButton" variant="outlined" color="black">
                Select
            </Button>
        );
    }
}

class CheckoutButton extends React.Component {
    render() {
        return (
            <Button variant="outlined" color="black">
                <Link to="/checkout">
                    checkout
                </Link>
            </Button>
        );
    }
}

export default Order;
