import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductdata, productInCart, updateProductInCart, productdata,UpdatedproductInCart,getProductInCart } from '../Redux/Slice/LoginSlice';
import './Styles/Description.css';
import Rating from '@mui/material/Rating';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Naavbar from './Navbar';
import { increment, selectCount } from '../Redux/Slice/LoginSlice';

function DescriptionPage() {
  const params = useParams();
  console.log("params",params)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = params;
  let count = useSelector(selectCount);
  const { getproductdataById } = useSelector((state) => state.Loginreducer);
  // console.log("id", id);
  console.log("count", getproductdataById);

  const handlecart = (id) => {
    console.log(" inside if ",id)
    if (getproductdataById.quantity && getproductdataById.quantity > 0) {
      console.log(" inside if ")
      dispatch(increment());
      const dataWithQuantity = { ...getproductdataById, quantity: getproductdataById.quantity + 1 };
      console.log("dataWithQuantity===========================>",dataWithQuantity);
      dispatch(updateProductInCart({ body: dataWithQuantity, id }));
      dispatch(UpdatedproductInCart({ body: dataWithQuantity, id }))
      dispatch(getProductInCart())
      dispatch(productdata())
      navigate('/home');
      console.log("coming inside if");
    } else {
      console.log("come inside else")
      count=0
      dispatch(increment());
      const dataWithQuantity = { ...getproductdataById, quantity: count + 1 };
      dispatch(updateProductInCart({ body: dataWithQuantity, id }));
      dispatch(productInCart(dataWithQuantity))
      navigate('/home');
      console.log("dataWithQuantity",getproductdataById._id,dataWithQuantity._id,id);
    }
  };

  // useEffect(() => {
  //   // Dispatch the productInCart action after the state has been updated
  //   if (count > 0) {
  //     const dataWithQuantity = { ...getproductdataById, quantity: count };
  //     dispatch(productInCart(dataWithQuantity));
  //   }
  // }, [count, getproductdataById, dispatch]);

  useEffect(() => {
    dispatch(getProductdata(id));
  }, [id]);

  return (
    <div>
      <Naavbar />
      <div className='desc-div'>
        <div className='desc-img'>
          <img src={getproductdataById.image} height={"400px"} width={"400px"} alt="product" />
        </div>

        <div className='detail-prod'>
          <h4 className='detail-head'>{getproductdataById.title}</h4>
          <hr />
          <div>
            <h4 className='detail-price'>Rs {getproductdataById.price}</h4>
          </div>

          <hr />
          <h4 className='detail-product'>Product Details: </h4>
          <p>
            <span className='detail-cat'> Category: </span>
            {getproductdataById.category}
          </p>
          <p className='detail-des'>
            <span className='detail-cat'> Description: </span>
            {getproductdataById.description}
          </p>
          <Button variant="warning" className='cart' onClick={(e) => handlecart(getproductdataById._id)}>Add to cart</Button>
          <Link to={'/home'}><Button variant="secondary" className='cart'> Back </Button></Link>
        </div>
      </div>
    </div>
  );
}

export default DescriptionPage;
