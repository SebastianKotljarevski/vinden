import React from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import {
    Link
} from "react-router-dom";

export class Snackbar extends React.Component {
    message = ""
  
    state = {
      isActive: false,
    }
  
    openSnackBar = (check, items = "Something went wrong...") => {
      this.items = items;
      this.check = check;
      this.setState((prevState) => {
          return { isActive: !prevState.isActive, snackbarShowHide: "snackbar show" }
      })
    }

    hideSnackBar = () => {
        this.setState({ isActive: false, snackbarShowHide: "snackbar hide" });
    }
    
    render() {
      const { isActive } = this.state;
      var totalQuantity = 0;
      var totalPrice = 0;
      
      if (this.items)
        this.items.map(item => {
            if (item.quantity > 0)
                totalQuantity += item.quantity;
                totalPrice += item.price * item.quantity;
      })

      if (!this.check) {
          return (
            <div className = {isActive ? "snackbar show" : "snackbar hide"}>
                <div className="snackbarText">{`Items selected: ${totalQuantity} Total price: ${totalPrice} kr/month` }</div>
                <CheckoutButton hideSnackBar={this.hideSnackBar}/>
            </div>
          )
      } else {
        return (
            <div className={this.state.snackbarShowHide}>
                <div className="snackbarText">{`Items selected: ${totalQuantity} Total price: ${totalPrice} kr/month` }</div>
                <CheckoutButton hideSnackBar={this.hideSnackBar}/>
            </div>
        )
      }
    }
  }

class CheckoutButton extends React.Component {
    render() {
        return (
            <Button onClick={this.props.hideSnackBar} className="checkoutButton" variant="outlined">
                <Link to="/checkout">
                    Checkout
                </Link>
            </Button>
        )
    }
}