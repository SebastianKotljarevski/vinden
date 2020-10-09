import React from "react";
import "./style.css";
import Header from "./header.js";
import AppContext from "./appContext";
import DateTimePicker from "./datePicker.js";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";

class Checkout extends React.Component {
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
    getValues = (items) => {
        var tempNumberOfItems = 0;
        var tempPriceOfItems = 0;
        var tempVolumeOfItems = 0;

        items.map((item) => {
            tempNumberOfItems += item.quantity;
            tempPriceOfItems += (item.price * item.quantity);
            tempVolumeOfItems += (item.volume * item.quantity);
        })

        return [
            {
                "text": "Number of items",
                "value": tempNumberOfItems, 
            },
            {
                "text": "Price of all items",
                "value": tempPriceOfItems + " kr/month",
            },
            {
                "text": "Volume of all items",
                "value": tempVolumeOfItems + " m³",
            }
        ];
    }

    render() {
        const stringsArray = ["Number of items", "Price of all items", "Volume of all items"];

        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="checkoutContent">
                        <h1 id="checkoutTitle">You are almost there!</h1>
                        <div className="leftDiv">
                            <CheckoutForm/>
                        </div>
                        <div className="rightDiv">
                            <h1>Estimated costs</h1>
                            <h2>Storage</h2>
                            {this.getValues(context.storageItems).map((value) =>(
                                <div className="checkoutText">
                                    {value.text}<div className="right">{value.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}



//context.storageItems.map((item) => ())

class CompleteCheckoutButton extends React.Component {
    render() {
        return (
            <Button type="submit" variant="outlined">
                    order
            </Button>
        );
    }
}

const CheckoutForm = () => {
   const formik = useFormik({
        initialValues: {
            email: "",
            firstName: "",
            surName: "",
            phone: "",
            adress: "",
            zipCode: "",
            city: "",
        },
        
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>Contact details</h1>
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <label htmlFor="firstName">First name</label>
            <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
            />
            <label htmlFor="surName">Surname</label>
            <input
                id="surName"
                name="surName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.surName}
            />
            <label htmlFor="phone">Phone number</label>
            <input
                id="phone"
                name="phone"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.phone}
            />
            <h1>Transport information</h1>
            <label htmlFor="adress">Adress</label>
            <input
                id="adress"
                name="adress"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.adress}
            />
            <label htmlFor="zipCode">ZIP Code</label>
            <input
                id="zipCode"
                name="zipCode"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.zipCode}
            />
            <label htmlFor="city">City</label>
            <input
                id="city"
                name="city"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.city}
            />
            <h1>Date and time</h1>
            <DateTimePicker/>
            <CompleteCheckoutButton/>
        </form>
    );
};

export default Checkout;
