import React from "react";
import s from "./Button.module.css"

const Button = (props) => {
    return <div className={s.buttonContainer}>
        <button onClick={props.loadMoreButton} className={s.button} type={'button'}>Load More</button>
    </div>
}

export default Button