import React, { Component } from 'react'

export default class Banner extends Component {
    render() {
        let movies = "kuch Hai";
        return (
            <>
                {
                    movies === "" ?
                        <div class="spinner-border text-warning" role="status">
                            <span class="sr-only"></span>
                        </div> 
                        
                        :

                        <div className="card banner-card">
                            <img src="https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg" className="card-img-top banner-img" alt="..." />

                                <h3 className="card-title banner-title">Spider-Man: No Way Home</h3>
                                <p className="card-text banner-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                    
                }
            </>
        )
    }
}
