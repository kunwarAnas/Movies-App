import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
     <div style={{display:'flex',padding:0.2,justifyContent:'space-around'}}>
      <Link to="/" style={{textDecoration:"none"}} ><h1>Movies</h1></Link>
         <Link to="/Favrourite" style={{textDecoration:"none"}} ><h2 style={{marginLeft:'2rem',marginTop:'0.3rem'}}>Favrourite</h2> </Link>
     </div>
    )
  }
}
