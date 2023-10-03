import React, { Fragment, useEffect } from 'react'
import {Link, redirect} from 'react-router-dom';
import './UserAccount.css';
import { logout } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const UserAccount = () => {
  const {user,isAuthenticated} =  useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/login',{replace:true});
    }
  },[]);
  const avatar ='https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1682190558~exp=1682191158~hmac=9fc192f0c8668282d8737e1ca80d6dc3c97cce5eb555bf8005eba30bea1f9342';     
  return (
    <Fragment>
    {isAuthenticated?(
      <div className='account'>
      <div className='left'>
        <div className='greet'>
        <img  src='https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1682190558~exp=1682191158~hmac=9fc192f0c8668282d8737e1ca80d6dc3c97cce5eb555bf8005eba30bea1f9342'
        alt="profile image"/>
          <div>
            <p>Hello,</p>
            <h3>{user.name}</h3>
          </div>
        </div>
        <div className='menu'>
          <ul>
            <li><Link 
            className='menu-item'
            to={"/orders"}
            ><i className="fa-solid fa-list-check"></i><span>My Orders<hr/></span></Link></li>
            {user.role==="admin"?(<li><Link
             className='menu-item'
             to={"/dashboard"}
             ><i className="fa-solid fa-table-cells"></i><span>Dashboard<hr/></span></Link></li>):
            (null)}
            
            <li><Link
             className='menu-item'
             to={"/cart"}
             ><i className="fa-solid fa-cart-shopping"></i><span>Go to Cart<hr/></span></Link></li>
             <li><Link 
             className='menu-item' 
             to="/password/update"
             ><i className="fa-solid fa-key"></i><span>Change Password<hr/></span></Link> </li>  
          </ul>
          <button onClick={()=>{dispatch(logout()); navigate('/')}}
          ><i className="fa-sharp fa-solid fa-right-from-bracket"></i><span>Logout</span></button>
        </div>
      </div>
      <div className='right'>
        <div className='greet'>
            <img  src={avatar}alt="profile image"/>
            <div>
              <p>Hello,</p>
              <h3>{user.name}</h3>
            </div>
        </div>
        <div className="profileContainer">
          <div className='myProfile'>
            <h1>My Profile</h1>
            <img src={avatar} alt={user.name}/>
              <Link className='btn' to="/me/update">Edit Profile</Link> 
          </div>
          <div className='profileDetails'>
            <div>
              <h4>User Name:</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4>Email:</h4>
              <p>{user.email}</p>
            </div> 
            <div>
              <h4>Contact:</h4>
              <p>{user.contact? user.contact:"Not available"}</p>
            </div>
        </div>
          </div>

      </div>
    </div>
        
    ):(<></>)}
    </Fragment>
  )
}

export default UserAccount;