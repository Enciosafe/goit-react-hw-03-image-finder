import React from "react";
import s from "./ImageGalleryItem.module.css"



const ImageGalleryItem = ({data}) => {

        return <>
            {data.map(({id, webformatURL, tags}) => (
                <li key={id} className={s.imageGalleryItem}>
                    <img src={webformatURL} alt={tags} className={s.imageGalleryItemImage} />
                </li>
            ))}
        </>
}

export default ImageGalleryItem
