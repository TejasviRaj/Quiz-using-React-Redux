 // Author- Tejasvi Raj Pant

import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Quiz from '../Quiz/Quiz';
import classes from './App.css';
import Home from '../Home/Home'

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
                        <Route path="/cat"
                        component={Home} />
                    </div>
                </section>

                <div>
                    <Route path="/home"
                        component={Quiz} />
                </div>
            </React.Fragment>
        );
    }
}

export default App;