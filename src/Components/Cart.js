import React, { useEffect, useCallback, useState } from 'react'
// import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductInCart, removeProductInCart, updateProductInCart,UpdatedproductInCart } from '../Redux/Slice/LoginSlice'
import './Styles/Cart.css'
// import Rating from '@mui/material/Rating';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import Naavbar from './Navbar'
import useRazorpay from "react-razorpay";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const dispatch = useDispatch()
    const { getcartItem } = useSelector((state) => state.Loginreducer)

    console.log("getcartItem", getcartItem)
    const calculateTotal = Array.isArray(getcartItem) && getcartItem.length > 0
    ? getcartItem.map((item) => item.quantity * item.price)
    : [];

    console.log(calculateTotal)
    const overallTotal = calculateTotal.reduce((acc, total) => acc + total, 0);
    const Razorpay = useRazorpay();

    const handlePaymentSuccess = (paymentDetails) => {
        console.log('Payment Success:', paymentDetails);
        // Handle success, e.g., update order status
    };

    const handlePaymentError = (error) => {
        console.error('Payment Error:', error);
        // Handle error, e.g., show an error message to the user
    };


    const handlePayment = () => {
        // Define your Razorpay options
        const options = {
            key: "rzp_test_MHRk336eUPGyWR",
            amount: overallTotal * 100,
            currency: "INR",
            name: "Extern labs",
            description: "Test Transaction",
            image: "https://example.com/your_logo",

            handler: (res) => {
                console.log(res);
            }
        };

        // Open Razorpay payment form
        let rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleRemoveItem = (item, id) => {
        console.log("item id", id, item)
        // let newObj = Object.keys(item)
        //     .filter(key => key !== "quantity")
        //     .reduce((acc, key) => {
        //         acc[key] = item[key];
        //         return acc;
        //     }, {});
            let newObj = {
                ...item,  // Copy all properties from the original item
                quantity: 0  // Set quantity to 0
            };

        console.log("newObj",newObj,item,id)
        dispatch(removeProductInCart(id))
        dispatch(updateProductInCart({ body: newObj, id }));
        // dispatch(UpdatedproductInCart({ body: newObj, id }));
        dispatch(getProductInCart())
        console.log("chla")
        toast.success("remove Item successfully")
    }

    useEffect(() => {
        dispatch(getProductInCart())
    }, [dispatch])

    return (
        <div>
            <div>
                <Naavbar />
                {/* <div>DescriptionPage</div> */}
                <Link to={'/home'}><Button variant="secondary" className='cart'> Back </Button></Link>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                        {Array.isArray(getcartItem) && getcartItem.length>0 ? getcartItem.map((item, index) => (
                            <div className='cart-div' key={item.id}>
                                <div className='cart-img'>
                                    <img src={item.image} height={"100px"} width={"100px"} />
                                </div>

                                <div className='cart-prod'>
                                    <h4 className='cart-head'>{item.title}</h4>
                                    {/* <Rating  name="half-rating" defaultValue={getproductdataById.rating.rate} precision={0.5} readOnly/> */}
                                    <hr></hr>
                                    <div className='cart-price-div'>
                                        <h4 className='cart-price'>Price</h4>
                                        <h4 className='cart-price'>Rs {item.price} *{item.quantity}</h4>
                                    </div>
                                    <hr></hr>

                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>
                                            <h4 className='cart-product'>Product Details: </h4>
                                            <p >
                                                <span className='cart-cat'> Category: </span>
                                                {item.category}
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="danger"
                                            style={{ height: "43px", width: "100px" }}
                                            onClick={(e) => handleRemoveItem(item, item._id)}
                                        >
                                            Remove
                                        </Button>
                                        <ToastContainer />

                                    </div>

                                    <hr></hr>
                                    <div className='cart-total'>
                                        <div> Total</div>
                                        <div> {item.price * item.quantity}</div> 
                                    </div>

                                </div>
                            </div>
                        )):<div> <h1 style={{width:"590px"}}>Cart is empty</h1></div>}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        <div className='final-amount' >
                            <p style={{ fontSize: "17px" }}>SubTotal amount : </p>
                            <h5>Rs {overallTotal}</h5>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", }}>
                            <Button
                                onClick={handlePayment}
                                type="button"
                                class="btn btn-warning"
                                style={{ width: "300px", backgroundColor: "orange", borderColor: "orange" }}
                            >
                                Proceed to Buy
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart