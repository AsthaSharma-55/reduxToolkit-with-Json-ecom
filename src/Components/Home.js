import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signup, productdata } from '../Redux/Slice/LoginSlice';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import './Styles/Home.css'
import Naavbar from './Navbar';

function Home() {

  const dispatch = useDispatch()
  const navigate=useNavigate()
  const logindaata = useSelector((state) => state.Loginreducer.getproductdata)

  const handleClick=(item,index)=>{
    navigate(`/description/${item.id}`)
  }

  useEffect(() => {
    dispatch(productdata());
  }, [])

  return (

    <div>
      <Naavbar/>
      <h1 className='head'>Page</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {logindaata.map((item, index) => (
          <Card key={index} style={{ width: '18rem', margin: '10px' }} onClick={(e)=>handleClick(item,index)}>
            <Card.Img variant="top" src={item.image} style={{ height: "178px", width: "100%",marginTop:"10px" }} />
            <Card.Body style={{ padding: "0px" }}>
              <Card.Title style={{ fontSize: "17px",padding:"10px" }}>{item.title}</Card.Title>
              <Card.Text style={{ marginLeft:"10px" }}>
              <Rating  name="half-rating" defaultValue={item.rating.rate} precision={0.5} readOnly/>
                {/* {[...Array(Math.round(item.rating.rate))].map((_, i) => (
                  <StarIcon key={i} style={{ color: '#ffc107' }} />
                ))} */}
              </Card.Text>
              <Card.Text style={{ marginLeft:"10px" }} >Rs {item.price}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>

  );
}

export default Home