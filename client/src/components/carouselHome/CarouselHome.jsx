import Carousel from "react-bootstrap/Carousel";
import Cartel1 from "../../images/cartel1.png"
import Cartel2 from "../../images/cartel2.png"
import Cartel3 from "../../images/cartel3.jpg"
import Cartel4 from "../../images/cartel4.png"

const CarouselHome = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100 "
                src={Cartel1}
                />  
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100 "
                src={Cartel2}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={Cartel3}
                />        
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={Cartel4}
                />        
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselHome;