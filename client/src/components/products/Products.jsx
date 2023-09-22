import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Cards from "../cards/Cards";
import style from "./products.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from "../loader/Loader";

const Products = ({load, handleLoader}) => {
    const [ products, setProducts ] = useState([]);
    const [ pages, setPages ] = useState(1);
    const location = useLocation();
    
    const getProductsPages = async () => {
        try {
            const { data } = await axios(`/products/all/?page=${pages}`);
            if(data){
               setProducts(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePages = (quantity) => {
       if(quantity === "increment" ){ 
          setPages(pages + 1);
       }
       else if(pages > 1){
          setPages(pages - 1)
       }
    }

    useEffect(()=>{
       getProductsPages();
    },[pages]);
 
    return (
    <>
       { load ? <Loader/> :

        <Container className={style.container} fluid > 
            <Row > 
                <Col lg={4} md={6} className="d-flex align-items-center justify-content-md-evenly pt-md-5 pb-3">
                    {location.pathname !== "/products" &&   
                       <div className={style.productsTitle}>                        
                          <h3>Descubre </h3>
                          <Link to="/products" className="fs-5">ver mas...</Link> 
                       </div>    
                    }  
                </Col>
            </Row>
            
            <Row>
                {  products.map((product)=>{
                    return(
                        <Col key={product.id}
                        lg={4} md={6} sm={6} 
                        className="d-flex align-items-center justify-content-evenly pb-md-4 pb-3"
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
                })}
            </Row>
            
            <Row>
                { location.pathname === "/products" &&
                    <div>
                        <div className={style.contPag} >
                            {pages > 1 && 
                              <Link onClick={()=>handlePages("decrement", handleLoader())} >...Ant</Link>
                            } 
                                <p >{pages}</p>
                            { pages < 8 && 
                             <Link onClick={()=>handlePages("increment", handleLoader())}>Prox...</Link>
                            } 
                        </div>
                    </div>
                }   
            </Row>
        </Container>
    }</>
    );
}

export default Products;