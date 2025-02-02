 // Author- Tejasvi Raj Pant

import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Quiz from '../Quiz/Quiz';
import classes from './App.css';
import Home from '../Home/Home'
import Title from '../Title/Title'

class App extends Component {
    render() {
        return (
            <React.Fragment >
                <Title></Title>
                <section >
                    <div class={classes.quizContainer} >
                      
                        <Route exact path={process.env.PUBLIC_URL + "/"}
                        component={Home} >

                        </Route>
                    </div>
                </section>

                <div>
                    <Route exact path={process.env.PUBLIC_URL + "/:id"}
                        component={Quiz} />
                </div>
            </React.Fragment>
        );
    }
}

export default App;