import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../cards/Cards";
import style from "./category.module.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Category = ({categories}) => {

  const navigate = useNavigate();

  useEffect(()=>{
    if(!categories.length)  {
      navigate("/")
    } 
  },[categories]);

  return(
    <Container className={style.container} fluid>
      <Row>
        {
          categories.map((category)=>{
          return(
            <Col key={category.id} 
            lg={4} md={6} sm={6}
            className="d-flex align-items-center justify-content-evenly pb-md-5 pb-3"
            >
              <Cards
                key={category.id}
                id={category.id}
                image={category.image}
                price={category.price}
                name={category.name}
                brand={category.brand}
                amount={category.amount}
                description={category.description}
                category={category.category}
              />
            </Col> 
          )
          })
        }
      </Row>
    </Container>
  );
}

export default Category;