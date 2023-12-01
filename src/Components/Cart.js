import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductdata, productInCart, getProductInCart, increment } from '../Redux/Slice/LoginSlice'
import './Styles/Cart.css'
import Rating from '@mui/material/Rating';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import Naavbar from './Navbar'

function Cart() {
    const dispatch = useDispatch()
    const { getcartItem } = useSelector((state) => state.Loginreducer)

    console.log("getcartItem",getcartItem)
    const calculateTotal=getcartItem.map((item)=>{return item.quantity*item.price})
    console.log(calculateTotal)
    const overallTotal = calculateTotal.reduce((acc, total) => acc + total, 0);
console.log(overallTotal);

    const handlecart = (data) => {
        console.log("data", data)
        dispatch(increment)
        dispatch(productInCart(data))
    }


    useEffect(() => {
        dispatch(getProductInCart())
    }, [])
    return (
        <div>
            <div>
                <Naavbar />
                {/* <div>DescriptionPage</div> */}
                <Link to={'/home'}><Button variant="secondary" className='cart'> Back </Button></Link>
                {getcartItem.map((item, index) => (
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
                            <h4 className='cart-product'>Product Details: </h4>
                            <p >
                                <span className='cart-cat'> Category: </span>
                                {item.category}
                            </p>
                            <hr></hr>
                            <div className='cart-total'>
                                <div> Total</div>
                                <div> {item.price * item.quantity}</div>
                            </div>

                        </div>
                    </div>
                ))}
                <hr></hr>
                <div className='final-amount' style={{}}>
                    <h3>Total amount </h3>
                    <h3>Rs {overallTotal}</h3>
                </div>
                
            </div>
        </div>
    )
}

export default Cart