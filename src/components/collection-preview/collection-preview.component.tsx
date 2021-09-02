import React from "react";
import { CollectionItem } from "../../models/collection.model";
import CollectionItemCmp from "../collection-item/collection-item.component";

import './collection-preview.styles.scss'

interface CollectionPreviewProps {
    title: string
    items: CollectionItem[]
}

const CollectionPreview = (props: CollectionPreviewProps) => (
  <div className="collection-preview">
    <h1 className="title">{props.title?.toUpperCase()}</h1>
    <div className="preview">
      {props.items
        ?.filter((item, index) => index < 4)
        .map((item) => (
          <CollectionItemCmp key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default CollectionPreview
