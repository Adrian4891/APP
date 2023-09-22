import style from "./offers.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cards from "../cards/Cards";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from "../loader/Loader";

const Offers = ({load, handleLoader}) => {

  const [ offers, setOffers ] = useState([]);
  const location = useLocation();
  const [ page , setPage] = useState(1)
  
  const getOffers = async () => {
    try {
      const { data } = await axios(`/offers?page=${page}`);
      if(data) setOffers(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handlePages = (value) => {
    if(value === "increment" ){ 
      setPage(page + 1);
    }
    else if(page > 1){
      setPage(page - 1)
    }
 }

  useEffect(()=>{
    getOffers();
  },[page]);

  return (
    <>
    { load ? <Loader/> :
      <Container className={style.container} fluid >  
        <Row>
          <Col lg={4} md={6} className="d-flex align-items-center justify-content-md-evenly pt-md-5 pb-3">
            { location.pathname !== "/offers" &&  
              <div className={style.offerTitle}>
                <h3 >Ofertas </h3> 
                <Link to="/offers" className="fs-5">ver mas...</Link> 
              </div>
            } 
          </Col>
        </Row>
        <Row>
          { offers.map((ofer)=>{
            return(
              <Col key={ofer.id}
              lg={4} md={6} sm={6}
              className="d-flex align-items-center justify-content-evenly pb-md-5 pb-3"
              >
                <Cards
                  id={ofer.id}
                  image={ofer.image}
                  name={ofer.name}
                  price={ofer.price}
                  brand={ofer.brand}
                  amount={ofer.amount}
                  description={ofer.description}
                  category={ofer.category}
                />
              </Col>
            )
          })}
        </Row>
        { location.pathname === "/offers" &&
          <div className={style.rowButtons}>
            {page !== 1 &&  
             <Link 
             onClick={()=>handlePages("decrement",handleLoader())} 
             className={style.btnPageOffer}
             >...Ant</Link>
            }
            <p>{page}</p>
            {page < 2 && 
             <Link 
             onClick={()=>handlePages("increment",handleLoader())}
             className={style.btnPageOffer}
             >Prox...</Link>
            }
          </div>
        }
      </Container>
    }
    </>
  );
}

export default Offers;