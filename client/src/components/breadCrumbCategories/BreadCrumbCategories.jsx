import Breadcrumb from 'react-bootstrap/Breadcrumb';
import style from "./breadCrumCategories.module.css";

const BreadCrumb = ({filterCategory}) => {
  return (
    <div className={style.contCategory}> 
      <Breadcrumb className={style.category}>
        <Breadcrumb.Item href="" onClick={()=>filterCategory("Guitarras")}> Guitarras </Breadcrumb.Item>
        <Breadcrumb.Item href="" onClick={()=>filterCategory("Bajos")}> Bajos </Breadcrumb.Item>
        <Breadcrumb.Item href="" onClick={()=>filterCategory("Baterias")}> Baterias </Breadcrumb.Item>
        <Breadcrumb.Item href="" onClick={()=>filterCategory("Pianos")}> Pianos </Breadcrumb.Item>
        <Breadcrumb.Item href="" onClick={()=>filterCategory("Accesorios")}> Accesorios </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumb;

