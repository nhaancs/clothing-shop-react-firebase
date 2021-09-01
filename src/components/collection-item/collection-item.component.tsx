import React from "react";
import CustomButton from "../custom-button/custom-button.component";

import './collection-item.styles.scss'

interface CollectionItemProps {
    name: string
    price: number   
    imageUrl: string
}

export const CollectionItem = (props: CollectionItemProps) => (
    <div className='collection-item'>
        <div
            className='image'
            style={{backgroundImage: `url(${props?.imageUrl})`}}
            ></div>
        <div className="collection-footer">
            <span className='name'>{props?.name}</span>
            <span className='price'>{props?.price}</span>
        </div>
        <CustomButton>Add to cart</CustomButton>
    </div>
)
