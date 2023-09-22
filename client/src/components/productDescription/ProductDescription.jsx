import style from "./productDescription.module.css";

const ProductDescription = ({name, brand, description, characterist}) => {
    return(
        <section className={style.containerDescription}>
            <h3>Decripción:</h3>
            <h6>{name} {brand}</h6>
            <h6>{description}</h6>
            <div  className={style.description}>
                <p>{characterist}</p>
            </div>
            
        </section>
    );
}

export default ProductDescription;