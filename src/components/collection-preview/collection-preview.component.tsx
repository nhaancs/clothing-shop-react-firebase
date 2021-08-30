import React from "react";
import { CollectionItem } from "../../pages/shop/shop.component";
import { CollectionItem as CollectionItemComponent } from "../collection-item/collection-item.component";

import './collection-preview.styles.scss'

interface CollectionPreviewProps {
    title: string
    items: CollectionItem[]
}

const CollectionPreview = (props: CollectionPreviewProps) => (
    <div className='collection-preview'>
        <h1 className='title'>{props.title?.toUpperCase()}</h1>
        <div className='preview'>
            {
                props.items?.filter((item, index) => index < 4).map(({ id, ...otherProps }) => (
                    <CollectionItemComponent key={id} {...otherProps} />
                ))
            }
        </div>
    </div>
)

export default CollectionPreview
