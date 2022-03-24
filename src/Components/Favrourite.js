import React, { Component } from 'react'
import axios from 'axios';

export default class Favrourite extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            currText:"",
            limit:5,
            currpage:1,
        }
    }
    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ce6209f7dfaa899c87c99651fc320c45&language=en-US&page=${this.state.currpage}`)
        let data = JSON.parse(localStorage.getItem("movies")) || "[]"

        this.setState({
            movies: [...data]
        })
    }
    handlePopularityAssen = ()=>{
        let temp = this.state.movies
        temp.sort((a,b)=>{
            return a.popularity-b.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePopularityDssen=()=>{
        let temp = this.state.movies
        temp.sort((a,b)=>{
            return b.popularity-a.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePageChange = (page)=>{
        console.log("41");
        this.setState({
            currpage:page,
        })
    }
    handleDelete = (movie)=>{
        console.log("delete");
        let deletedMov = [];
        deletedMov = this.state.movies.filter((movieObj)=>{
            return movieObj.id!=movie.id;
        })
        this.setState({
            movies:[...deletedMov]
        })
        localStorage.setItem('movies',JSON.stringify(deletedMov))
    }
    render() {
        let newMovie = [];
        if(this.state.currText===""){
            newMovie = this.state.movies;
        }else{
            newMovie = this.state.movies.filter((movieObj)=>{
                let title =movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase())

            })
        }

        let pages = Math.ceil(newMovie.length/this.state.limit);
        
        let pageArr = []
       for(let i=1 ; i<=pages ; i++){
           pageArr.push(i)
       }


        let si = (this.state.currpage-1)*this.state.limit;
        let ei = si+this.state.limit;
        newMovie = newMovie.slice(si,ei);



        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className="col-3"><ul class="list-group fav-genre-list">
                            <li class="list-group-item">All Genre</li>
                            <li class="list-group-item">Action</li>
                            <li class="list-group-item">Comedy</li>
                            <li class="list-group-item">Horror</li>
                            <li class="list-group-item">Thrill</li>
                        </ul></div>
                        <div className="col-9 fav-input-text">
                            <div className="row">
                                <input type="text" className='input-group-text col'placeholder='Search Movies' onChange={(e)=>{this.setState({currText:e.target.value})}} />
                                <input type="Number" className='input-group-text col'placeholder='Row Count'value={this.state.limit} onChange={(e)=>{this.setState({limit:parseInt(e.target.value)})}} />
                            </div>
                            <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col"> <i class="fa-solid fa-angle-up" onClick={this.handlePopularityAssen} ></i> Popularity <i class="fa-solid fa-angle-down" onClick={this.handlePopularityDssen}></i> </th>
                                            <th scope="col">Rating</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            newMovie.map((moviesObj) => (
                                                <tr>
                                                    <td> <img src= {`https://image.tmdb.org/t/p/original/${moviesObj.backdrop_path}`} style={{width:"4rem"}} alt="" /> {moviesObj.original_title}</td>
                                                    <td>{moviesObj.popularity}</td>
                                                    <td>{moviesObj.vote_average}</td>
                                                    <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(moviesObj)} >Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                   { pageArr.map((page)=>(
                                        <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)} >{page}</a></li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
