import Cards from "../cards/Cards";
import style from "./searchProducts.module.css";
import { BiSearchAlt } from "react-icons/bi";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {  useState } from "react";
import FilterPricesProduct from "../filterPricesProduct/FilterPricesProduct";

const SearchProducts = ({productSearch, setProductSearch}) => {
    const [ price , setPrice ] = useState({
        older: "",
        less: ""
    });

    const handleOrder = (event) => {
        console.log(event.target.value)
        const productFilter = [...productSearch];
        if(event.target.value === "asc"){
            const product = productFilter.sort((a, b)=> a.price - b.price);
            setProductSearch(product);
        }
        else if(event.target.value === "desc"){
            const product = productFilter.sort((a, b)=> b.price - a.price);
            setProductSearch(product);
             
        }
    }

    const filterPrice = (event) => {
        event.preventDefault();
        const pricesFiltered = productSearch.filter(product=> 
            product.price >= price.less && product.price <= price.older
        );
        setProductSearch(pricesFiltered);
    }
    
    const handleInput = (event) => {
       setPrice({
          ...price,
          [event.target.name]: event.target.value
       })
    }

    return(
        <Container className={style.container} fluid>
           
            { productSearch.length > 0 && 
                <FilterPricesProduct
                handleOrder={handleOrder}
                handleInput={handleInput}
                filterPrice={filterPrice}
                price={price}
                />
            }
            <Row >
                {productSearch.length > 0 ? productSearch.map((product)=>{
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
                    )})
                : 
                <div className={style.notResult}>
                    <h4>No hay resultados </h4>
                    <BiSearchAlt className={style.iconSearch}/>
                </div>
            }  
            </Row>
        </Container>
    );
}

export default SearchProducts;