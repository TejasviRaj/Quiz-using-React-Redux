// Author- Tejasvi Raj Pant

import React from 'react';
import classes from './Result.css';
import {Link} from 'react-router-dom';
const Result = (props) => {
    return (
        <React.Fragment>
        <div className={classes.quizBox}>
            <p className={classes.quizCaptionHeading}>Results </p>
            <br />
            <p className={classes.quizCaptionSH}>Score - {props.score} </p>
            <p className={classes.quizCaptionSH}>Total - 100 </p>

            <Link to="/">
            <button className={classes.submit}>HOME</button>
            </Link>
        </div>
    </React.Fragment>
    )
}

export default Result;