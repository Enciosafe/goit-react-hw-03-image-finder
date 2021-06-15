import React from "react";
import s from './ImageGallery.module.css'
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";


const  ImageGallery = (props) => {
    return <ul onClick={props.openModal} className={s.imageGallery}>
        <ImageGalleryItem state={props.state}
                          toggleModal={props.onClick}/>
    </ul>
}


export default ImageGallery