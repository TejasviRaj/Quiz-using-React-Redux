 // Author- Tejasvi Raj Pant

import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Quiz from '../Quiz/Quiz';
import classes from './App.css';

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

class App extends Component {
    render() {
        return (
            <React.Fragment >
                <section >
                    <div class={classes.quizContainer} >
                        <div style={{ textAlign: "center", }} >
                            <h2 class="section-heading"
                                style={{ textTransform: "uppercase" }} > Quiz </h2>
                            <h3 class="section-subheading"
                                style={{ color: "#6c757d" }} > Select a Quiz Category
                                </h3>
                        </div >
                        <div className={classes.quizRow} > {
                            arr.map((item) =>
                                < div class={classes.quizItem} >
                                    <a class={classes.quizLink}
                                        href="#" >
                                        <div className={classes.quizHover} >
                                            <div className={classes.quizHoverContent} > Click to play this quiz </div> </div > <img className={classes.imgFluid}
                                                src={`assets/${item.name}.jpg`}
                                                alt="" />
                                    </a>
                                    <div className={classes.quizCaption} >
                                        <div className={classes.quizCaptionHeading} > {item.name} </div>
                                        {/* <div className={classes.quizCaptionSH} > Illustration </div> */}
                                    </div >
                                </div>)}
                        </div>
                    </div>
                </section>

                <div>
                    <Route path="/"
                        component={Quiz} />
                </div>
            </React.Fragment>
        );
    }
}

export default App;