import axios from "axios";
import React,{ useState, useEffect } from "react";
import Cookies from "js-cookie";
import ProfileForm from "../../components/profileForm/ProfileForm";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import Loader from "../../components/loader/Loader";

const Profile = ({load, handleLoader}) => {
  const [ userData, setUserData ] = useState({});
  const [edit , setEdit ] = useState(false)
  const userId = Cookies.get("userId");

  const getProfile = async () => {
    try {
      const {data} = await axios(`/profile/${userId}`);
      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getProfile();
    handleLoader();
  },[]);

  if(load)
  return(
    <Loader/>
  )
    
  return (
    <>
      {
        userData.complete === false || edit ? 
        <ProfileForm userData={userData}  setUserData={setUserData} edit={edit} setEdit={setEdit}/>
        : 
        <ProfileInfo userData={userData} edit={edit} setEdit={setEdit}/>
      }
    </>
        
  );
}

export default Profile;
