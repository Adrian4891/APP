import style from "./filterPricesProduct.module.css";

const FilterPricesProduct = ({handleOrder, handleInput, filterPrice, price}) => {
    return (
        <div className={style.containerFilter}>
            <div className={style.containerSelect}>
                <h6 className={style.filterTitle}>Filtrar precios por :</h6>
                <select onChange={handleOrder} className={style.priceSelect}>
                    <option value="">opciones</option>
                    <option value="asc">min a max</option>
                    <option value="desc">max a min</option>
                </select>
            </div>
            <form className={style.searchForm} onSubmit={filterPrice}>
                <input 
                type="number" 
                name="less" 
                placeholder="$ val-min" 
                value={price.less} 
                onChange={handleInput}
                />
                <input 
                type="number" 
                name="older" 
                placeholder="$ val-max"                 
                value={price.older} 
                onChange={handleInput}
                />
                <button 
                disabled={price.older === "" || price.less === "" ? true  : false }
                >Filtrar</button>
            </form>       
        </div> 
    );
}

export default FilterPricesProduct;