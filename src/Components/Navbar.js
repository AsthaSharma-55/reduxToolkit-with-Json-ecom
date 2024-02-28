import React, { useEffect, useState } from 'react'
import './Styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { increment, selectCount, getProductInCart } from '../Redux/Slice/LoginSlice'
import { FaShoppingCart } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

function Naavbar() {
    let name = localStorage.getItem('user')
    // let UserName = JSON.parse(name)
    const count = useSelector(selectCount);
    const dispatch = useDispatch()
    const { getcartItem } = useSelector((state) => state.Loginreducer)
    const navigate = useNavigate()
    // const[search,setSearch]=useState('')
    // console.log("UserName==============>", UserName)

    console.log("getcartItem", getcartItem)

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.clear();
        navigate('/');
    }

    useEffect(() => {
        dispatch(getProductInCart())
    }, [])

    return (
        <div>
            <div className='navbar'>
                <div className='nav-left'><h1>Shopify</h1></div>
                <div className='nav-right'>
                    <div className='home'>Home</div>
                    <div className='logout' onClick={handleLogout}><IoIosLogOut style={{height: "30px",width: "27px"}}/>log out</div> 
                    <div className='shop-div'>
                        <Link to={'/cart'} style={{ color: "black" }}>
                            <p className='shop-icon-num'>
                                {/* {count} */}
                                {getcartItem.length < 0 ? 0 : getcartItem.length}
                            </p>
                            <FaShoppingCart style={{ height: "34px", width: "23px" }} />
                        </Link>
                    </div>
                </div>
            </div>           
        </div>
    )
}

export default Naavbar