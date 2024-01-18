import React,{ useState, useEffect } from 'react'
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./components/sign up/SignUp";
import Login from './components/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Cart from './components/cart/Cart';
import Offers from './components/offers/Offers';
import Header from "./components/header/Header";
import Category from "./components/category/Category";
import ProductInfo from './pages/productInfo/ProductInfo';
import Cookies from 'js-cookie';
import Favorites from './components/favorites/Favorites';
import SearchProducts from './components/searchProducts/SearchProducts';
import Products from './components/products/Products';
import Footer from './components/footer/Footer';
import NotFound from './components/notFound/NotFound';
import Shoping from "./components/shoping/Shoping";
import PaymentDetaill from "./components/paymentsDetails/PaymentDetaill";
import FormPayment from './components/formPayment/FormPayment';
import HeaderMobile from './components/headerMobile/HeaderMobile';
import MenuMobile from './components/menuMobile/MenuMobile';    
import ScoresProduct from './components/scoresProduct/ScoresProduct';
import Notifications from './components/notifications/Notifications';
import UserQuestions from './components/userQuestions/UserQuestions';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getUserRoll } from './redux/actions';
import  axios from "axios";
axios.defaults.baseURL='https://barekintrumentsapp-production.up.railway.app/';

function App() {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [ productSearch, setProductSearch] = useState([]); 
  const navigate = useNavigate();
  const [hiden , setHiden] = useState(true);
  const [ pathPage, setPathPage ] = useState(true);
  const [ load, setLoad ] = useState(false);
  const [ countNotification, setCountNotification ] = useState(0);
  const location = useLocation()
  const dispatch = useDispatch()
  const admData = useSelector(state=> state.admData);
  const id = Cookies.get("userId");
  const token = Cookies.get("token");
  
  const  signUp = async (userData) => {
    try {
      const { data } = await axios.post(`/user/signUp`,userData);
      if(data) return data;
    } catch (error) {
      return error.response; 
    }
  }

  const login = async (userData) => {
    try {
      const {data} = await axios.post(`/user/login`, userData);
      if(data.id) {
        Cookies.set("userId", data.id , {expires: 1});
        Cookies.set("userName",data.userName, {expires: 1})
        Cookies.set("token",data.resToken, {expires: 1});
        Cookies.set("userEmail",data.email, {expires: 1});
        return data;
      }
    } catch (error) {
      return error;
    } 
  }

  const handleSearch = async (name) => {
    try {
      const { data } = await axios(`/products/search?name=${name}`);
      if(data){
        setProductSearch(data);
        navigate(`/product/search`);
      }
    } catch (error) {
      console.log(error);
    }
 }

  const getNotifications = async () => {
    if (!token) return;
    try {
      const { data } = await axios(`/notifications/${id}`);
      console.log(data)
      if(!data[0].id) throw error("No hay notificaciones");
      let cont = 0;
      data.forEach((dat)=>{
      if(admData.userRoll && !dat.verified){
        ++cont;
      }
      else if(!admData.userRoll && !dat.userChecked){
        ++cont;
      }
      })
      setCountNotification(cont);
       
    } catch (error) {
    console.log(error);
    }
  }

  const getAllProducts = async () => {
    try {
      const { data } = await axios(`/products`); 
      if(data) setProducts(data);
    } catch (error) {
      console.log(error);
    } 
  }

  const handleLoader =()=>{
    setLoad(true)
    setTimeout(() => {
      setLoad(false)
    }, 1500);
  }

  useEffect(()=>{
    getAllProducts();
    handleLoader();
    dispatch(getUserRoll(id));
  },[]);
  
  useEffect(()=>{
    const path =  location.pathname;
    if(path === "/login" ||  path === "/signUp" || path === "/payment/in/progress" ){
      setPathPage(false);
    }
    else setPathPage(true);
  },[location.pathname]);

  const filterCategory = (category) => {
    try {
      const result = products.filter(item=>item.category === category);
      setCategories(result);
      navigate("/category");
      setHiden(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {!load && pathPage &&
       <Header 
       filterCategory={filterCategory} 
       handleSearch={handleSearch} 
       countNotification={countNotification}
       setCountNotification={setCountNotification}
       getNotifications={getNotifications}
       handleLoader={handleLoader}
      />}
      {!load && pathPage && 
      <HeaderMobile 
       setHiden={setHiden} 
       hiden={hiden} 
       handleSearch={handleSearch} 
       handleLoader={handleLoader}
      />}
      <MenuMobile 
       hiden={hiden} 
       setHiden={setHiden} 
       filterCategory={filterCategory}
       countNotification={countNotification}
       setCountNotification={setCountNotification}
       getNotifications={getNotifications}
       handleLoader={handleLoader}
      />
      <Routes>
        <Route path="/" element={<Home load={load} handleLoader={handleLoader}/>}/>
        <Route path="/signUp" element={ <SignUp signUp={signUp}/> } />
        <Route path="/login" element={ <Login login={login}/> }/>
        <Route path="/profile" element={<Profile load={load} handleLoader={handleLoader}/>}/>
        <Route path="/cart" element={<Cart load={load} setLoad={setLoad} handleLoader={handleLoader}/>}/>
        <Route path="/offers" element={<Offers load={load} handleLoader={handleLoader}/>}/>
        <Route path="/category" element={<Category categories={categories} />}/>
        <Route path="/cart" element={<Cart load={load} handleLoader={handleLoader}/>}/>
        <Route path="/product/:id" element={<ProductInfo load={load} handleLoader={handleLoader}/>}/>
        <Route path="/favorites" element={<Favorites load={load} handleLoader={handleLoader}/>}/>
        <Route 
         path= "/product/search" 
         element={
         <SearchProducts 
           productSearch={productSearch} 
           setProductSearch={setProductSearch}/>}
        />
        <Route path="/products" element={<Products load={load} handleLoader={handleLoader}/>}/>
        <Route path="/shoping" element={<Shoping load={load} handleLoader={handleLoader}/>}/>
        <Route path="/payment/in/progress" element={< FormPayment/>}/>
        <Route path="/payment/details/:id" element={<PaymentDetaill load={load} handleLoader={handleLoader}/>}/>
        <Route path="/scores/product/:id" element={<ScoresProduct/>}/>
        <Route path="/notifications" element={<Notifications load={load} handleLoader={handleLoader}/>}/>
        <Route 
         path="/user/questions/:id" 
         element={
         <UserQuestions 
           load={load} 
           handleLoader={handleLoader} 
           products={products}
          />}
        />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {!load && pathPage && <Footer/> }
    </>
  );
}

export default App
