import style from "./imageSelector.module.css";

const ImageSelector = ({
    imgSelection, 
    setImgSelection, 
    name, 
    image, 
    image2, 
    image3, 
    image4, 
    carouselHiden, 
    setCarouselHiden}) => {
    return (
        <section className={style.container}>
            <div className={style.containerImagesSelect}>
                <article className={style.cardSelect}>
                    <img src={image} alt={name} onClick={()=>setImgSelection(image)}/>
                </article>
                <article className={style.cardSelect}>
                    <img src={image2} alt={name} onClick={()=>setImgSelection(image2)}/>
                </article>
                <article className={style.cardSelect}>
                    <img src={image3} alt={name} onClick={()=>setImgSelection(image3)}/>
                </article>
                <article className={style.cardSelect}>
                    <img src={image4} alt={name} onClick={()=> setImgSelection(image4)}/>
                </article>
            </div>
            <article className={style.containerImage}>
               <img 
                  src={imgSelection} 
                  alt={name} className={style.imageSelect} 
                  onClick={()=>setCarouselHiden(!carouselHiden)}
                /> 
            </article>
        </section>
    );
}

export default ImageSelector;