import {React,Component} from 'react'
import './HeaderStyles.css';

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
            <div >
                <ul id='navLinks' 
                className={this.state.clicked ? 
                "#navLinks active": "#navLinks"}
                >
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/products/:id">All Products</a>
                    </li>
                    <li>
                        <a href="/us">About Us</a>
                    </li>
                    <li>
                        <a href="/me"><i className="fa-solid fa-user"></i><span>Me</span></a>
                    </li>
                    <li>
                    <a id='cart' href="/cart"><i className="fa-sharp fa-solid fa-cart-shopping"></i><span>My Cart</span></a>
                    </li>
                </ul>
                
            </div>
            <div id="mobile" onClick={this.handleClick}>
               <i id='bar' className={this.state.clicked ?
               'fas fa-times':'fas fa-bars'}></i> 
            </div>
           </nav>
        </>
      )
}
  
}

export default Header;