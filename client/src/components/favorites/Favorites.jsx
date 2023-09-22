import { useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./favorites.module.css";
import Cards from "../cards/Cards";
import { FaHeart } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from "../loader/Loader";

const Favorites = ({load, handleLoader}) => {

   const productsFav = useSelector(state=> state.productsFav);

   useEffect(()=>{
      handleLoader();
   },[]);

   if(load)
   return (
     <Loader/>
   );

   return (
      <Container className={style.container} fluid>
         <Row>
            {
               productsFav.length !== 0 ? productsFav.map((product)=>{
                  return(
                     <Col key={product.id} 
                     lg={4} md={6} sm={6}
                     className="d-flex align-items-center justify-content-evenly pb-md-5 pb-3"
                     >
                        <Cards
                           id={product.id}
                           image={product.image}
                           name={product.name}
                           price={product.price}
                           brand={product.brand}
                           amount={product.amount}
                           description={product.description}
                           category={product.category}
                        />
                     </Col>
                  )
               })
               : 
               <div className={style.notFavs}> 
                 <h5>Agrega tus favoritos</h5> 
                  <FaHeart className={style.iconNotfav}/>
               </div>
            }
         </Row>
      </Container>
   );
}

export default Favorites;