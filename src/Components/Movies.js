import React, { Component } from 'react'
import axios from 'axios';

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      hover:"",
      parr:[1],
      currpage:1,
      fav:[]
    }
  }
  async componentDidMount() {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ce6209f7dfaa899c87c99651fc320c45&language=en-US&page=${this.state.currpage}`)
    let data = res.data
    this.setState({
      movies: [...data.results]
    })
  }

  changeMovies = async ()=>{
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ce6209f7dfaa899c87c99651fc320c45&language=en-US&page=${this.state.currpage}`)
    let data = res.data
    this.setState({
      movies: [...data.results]
    })
  }

  handleRight=()=>{
  let tempArr = [...this.state.parr];
  tempArr.push(tempArr.length+1);
  this.setState({
    parr:[...tempArr],
    currpage: this.state.currpage+1
  },this.changeMovies)
  }

  handleLeft=()=>{
    if(this.state.currpage !=1){
      this.setState({
        currpage:this.state.currpage-1,
      },this.changeMovies)
    }
  }
  
  handleClick= (value)=>{
    if(value != this.state.currpage){
      this.setState({
        currpage:value,
      },this.changeMovies)
    }
  }

  handleFav = (movie)=>{
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");    
    if(this.state.fav.includes(movie.id)){
      oldData = oldData.filter((m)=>m.id!=movie.id)
    }else{
      oldData.push(movie)
    }
    localStorage.setItem("movies" , JSON.stringify(oldData));
    this.handleFavState();
  }

  handleFavState=()=>{
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]"); 
    let temp = oldData.map((movie)=>movie.id);
    this.setState({
      fav:[...temp]
    })
  }

  render() {
    return (
      <>
        {
          this.state.movies.length === 0 ?
            <div class="spinner-border text-warning" role="status">
              <span class="sr-only"></span>
            </div>

            :

            <div className='movieslist'>
              {
                this.state.movies.map((moviesObj) => (
                  <div className="card movies-card" onMouseEnter={()=>this.setState({hover:moviesObj.id})} onMouseLeave={()=>this.setState({hover:""})}>
                    <img src={`https://image.tmdb.org/t/p/original/${moviesObj.backdrop_path}`} style={{ width: '20vw' , height:'30vh' }} class="card-img-top movies-img" alt="..." />

                    <h5 class="card-title movies-title">{moviesObj.original_title}</h5>
                    {/* <p class="card-text">{moviesObj.overview}</p> */}
                    <div class="btn-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
                     {
                       this.state.hover==moviesObj.id &&
                       <a class="btn btn-primary movie-btn" onClick={()=>this.handleFav(moviesObj)} >{this.state.fav.includes(moviesObj.id)?"remove":"add"}</a>
                     }

                    </div>
                  </div>
                ))
              }
            </div>

        }

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
            {
              this.state.parr.map((value)=>(
                <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
              ))
            }
              <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
            </ul>
          </nav>
        </div>
      </>

    )
  }
}
