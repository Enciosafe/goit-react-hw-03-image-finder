import React from "react";
import s from "./ImageGalleryItem.module.css"



const ImageGalleryItem = ({state, toggleModal}) => {

        return <>
            {state.data.map(({id, webformatURL, largeImageURL}) => (
                <li key={id} className={s.imageGalleryItem}>
                    <img onClick={toggleModal} src={webformatURL} alt={largeImageURL} className={s.imageGalleryItemImage} />
                </li>
            ))}
        </>
}

export default ImageGalleryItem
