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
                  <div style={{ textAlign: "center", }} >
                            <h2 class="section-heading"
                                style={{ textTransform: "uppercase" }} > Quiz </h2>
                            <h3 class="section-subheading"
                                style={{ color: "#6c757d" }} > TEST YOUR KNOWLEDGE
                                </h3>
                        </div >
                <section >
                    <div class={classes.quizContainer} >
                      
                        <Route path="/cat"
                        component={Home} >

                        </Route>
                    </div>
                </section>

                <div>
                    <Route path="/quiz"
                        component={Quiz} />
                </div>
            </React.Fragment>
        );
    }
}

export default App;