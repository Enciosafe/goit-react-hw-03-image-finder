import React from "react";
import {createPortal} from "react-dom";
import s from "./Modal.module.css"

const modalRoot = document.querySelector('#modal-root')

export default class Modal extends React.Component {


    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown )
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose()
        }
    }

    handleOverlayClick = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose()
        }

    }

    render() {
        console.log(this.props)
        return createPortal (

            <div className={s.Overlay} onClick={this.handleOverlayClick} >
                <div className={s.Modal}>
                    <img src={this.props.bigPicUrl} alt=""/>
                    <h2>{this.props.bigPicUrl}</h2>
                </div>
            </div>, modalRoot
        );
    }

}


