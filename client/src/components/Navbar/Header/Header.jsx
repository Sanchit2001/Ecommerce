import {React,Component} from 'react'
import './HeaderStyles.css';
import Search from '../Search/Search';
import {Route,Link} from 'react-router-dom';
class Header extends Component {
    state = {clicked:false};
    handleClick = () =>{
        this.setState({clicked:!this.state.clicked})
    }
render(){
    return (
        <>
           <nav> 
            <a href="/" className='logo-icon'>
            <h2>GAC</h2>
            </a>
            {window.innerWidth>769?<Search/>:""}
            <div >
                <ul id='navLinks' 
                className={this.state.clicked ? 
                "#navLinks active": "#navLinks"}
                >
                    <li>
                        <Link className="link" to={"/"}  onClick={this.handleClick}>Home</Link>
                    </li>
                    <li>
                        <Link className="link" to={"/products"}  onClick={this.handleClick}>All Products</Link>
                    </li>
                    <li>
                        <Link className="link" to={"/us"}  onClick={this.handleClick}>About Us</Link>
                    </li>
                    <li>
                        <Link className="link" to={"/login"}  onClick={this.handleClick}><i className="fa-solid fa-user"></i><span>Account</span></Link>
                    </li>
                    <li>
                    <Link className="link" id='cart' to={"/cart"}  onClick={this.handleClick}><i className="fa-sharp fa-solid fa-cart-shopping"></i><span>My Cart</span></Link>
                    </li>
                </ul>
                
            </div>
            <div id="mobile" onClick={this.handleClick}>
               <i id='bar' className={this.state.clicked ?
               'fas fa-times':'fas fa-bars'}></i> 
            </div>
            
           </nav>
           {window.innerWidth<769?<Search/>:""}
        </>
      )
}
  
}

export default Header;