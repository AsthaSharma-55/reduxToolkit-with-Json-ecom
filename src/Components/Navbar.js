import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux'
import { increment, selectCount, getProductInCart } from '../Redux/Slice/LoginSlice'


function Naavbar() {
    const name = localStorage.getItem('user')
    const UserName = JSON.parse(name)
    const count = useSelector(selectCount);
    const dispatch = useDispatch()
    const { getcartItem } = useSelector((state) => state.Loginreducer)
    const navigate = useNavigate()
    // const[search,setSearch]=useState('')
    // console.log("productData==============>", productItemData)

    console.log("getcartItem", getcartItem.length)

    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }

    // const handleSearch=(event)=>{
    //     const matchedUsers = productItemData.filter((user) => {
    // 		return `${user.category}`
    // 			.toLowerCase()
    // 			.includes(event.target.value.toLowerCase());
    // 	});

    // 	setProductData(matchedUsers);
    // 	setSearch(event.target.value);
    // }

    return (
        <div>
            <Navbar className="bg-body-tertiary mb-3">
                <Container fluid>
                    <Navbar.Brand href="#" className='nav-brand'>Shopify</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand`}
                        aria-labelledby={`offcanvasNavbarLabel-expand`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/home">Home</Nav.Link>
                                <NavDropdown
                                    title={UserName.email}
                                    id={`offcanvasNavbarDropdown-expand`}
                                >
                                    <NavDropdown.Item onClick={handleLogout}>logout</NavDropdown.Item>
                                    {/* <NavDropdown.Item href="#action4">
                     logout
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item> */}
                                </NavDropdown>
                            </Nav>

                            <div className='shop-div'>
                                <Link to={'/cart'} style={{ color: "black" }}>
                                    <p className='shop-icon-num'>
                                        {/* {count} */}
                                        {getcartItem.length < 0 ? 0 : getcartItem.length}
                                    </p>
                                    <ShoppingCartIcon style={{ height: "50px", marginLeft: "19px" }} />
                                </Link>
                            </div>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    )
}

export default Naavbar