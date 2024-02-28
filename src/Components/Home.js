import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productdata } from '../Redux/Slice/LoginSlice';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './Styles/Home.css';
import Naavbar from './Navbar';
import { FiLoader } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logindaata = useSelector((state) => state.Loginreducer.getproductdata);
  const [productItemData, setProductItemData] = useState(logindaata);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [loading, setloading] = useState(false)
console.log("logindaata",logindaata)

  const handleClick = (item, index) => {
    // console.log("item================>", item)
    navigate(`/description/${item._id}`);
  };

  const search = (event) => {
    const matchedUsers = logindaata.filter((user) => {
      return `${user.category} `
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    // setProductItemData(matchedUsers);
    setSearchPhrase(event.target.value);
  };

  useEffect(() => {
    const fetchdata = async () => {
      setloading(true)
      const data = await dispatch(productdata());
      if (data.payload.status === 200) {
        setloading(false)
      } else {
        setloading(false)
      }

    }
    fetchdata()
  }, [logindaata]);

  // useEffect(() => {
  //   setProductItemData(logindaata);
  // }, [logindaata]);

  // console.log('logindaata======================================>', logindaata);
  // console.log('productItemData', productItemData);

  return (
    <div>
        <div>
          <Naavbar />
          <h1 className='head'>Page</h1>
          <div>
            <CiSearch className='search' />
        <input
          type="text"
          placeholder="Search a items"
          value={searchPhrase}
          onChange={search}
          style={{ marginLeft: "10px", width: "200px", borderRadius: "5px" }}
        />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {logindaata.length > 0 ? logindaata.map((item, index) => (
              <Card key={index} style={{ width: '18rem', margin: '10px' }} onClick={(e) => handleClick(item, index)}>
                <Card.Img variant="top" src={item.image} style={{ height: "178px", width: "100%", marginTop: "10px" }} />
                <Card.Body style={{ padding: "0px" }}>
                  <Card.Title style={{ fontSize: "17px", padding: "10px" }}>{item.title}</Card.Title>
                  <Card.Text style={{ marginLeft: "10px" }}>
                    {/* <Rating name="half-rating" defaultValue={item.rating.rate} precision={0.5} readOnly /> */}
                    {/* {[...Array(Math.round(item.rating.rate))].map((_, i) => (
                  <StarIcon key={i} style={{ color: '#ffc107' }} />
                ))} */}
                  </Card.Text>
                  <Card.Text style={{ marginLeft: "10px" }} >Rs {item.price}</Card.Text>
                </Card.Body>
              </Card>
            )) :
              <div className="loading-overlay">
                <FiLoader className="loading-icon" />
              </div>}
          </div>
        </div>
        
    </div>

  );
}

export default Home