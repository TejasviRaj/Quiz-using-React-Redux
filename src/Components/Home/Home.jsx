 // Author- Tejasvi Raj Pant

 import React, { Component } from 'react';
import classes from './Home.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

let arr = [
    
    {
        "id": 18,
        "name": "Computers"
    },
    {
        "id": 24,
        "name": "Politics"
    },
    {
        "id": 19,
        "name": "Mathematics"
    },
    {
        "id": 21,
        "name": "Sports"
    },
    {
        "id": 30,
        "name": "Science"
    },
    {
        "id": 23,
        "name": "History"
    },
    
];

class Home extends Component {

    render() {

            return (
                <div className={classes.quizRow} > {
                    arr.map((item) =>
                    <Link to={process.env.PUBLIC_URL + '/' + item.id} class={classes.quizItem}>
                            <a class={classes.quizLink}
                                href="#" >
                                <div className={classes.quizHover} >
                                    <div className={classes.quizHoverContent} > Click to play this quiz </div> </div > <img className={classes.imgFluid}
                                        src={`assets/${item.name}.jpg`}
                                        alt="" />
                            </a>
                            <div className={classes.quizCaption} >
                                <div className={classes.quizCaptionHeading} > {item.name} </div>
                            </div >
                        </Link>)}
                </div>
            );
        }

}

export default Home;