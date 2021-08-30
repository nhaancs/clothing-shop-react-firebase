import React, { ReactNode } from "react";
import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../components/collection-preview/collection-preview.component"

interface ShopPageProps {}

interface ShopPageState {
    collections: Collection[]
}

export interface Collection {
  id: number;
  title: string;
  routeName: string
  items: CollectionItem[]
}

export interface CollectionItem {
    id: number
    name: string
    imageUrl: string
    price: number
}

class ShopPage extends React.Component<ShopPageProps, ShopPageState> {
  constructor(props: ShopPageProps) {
    super(props);

    this.state = {
        collections: SHOP_DATA
    };
  }

  render(): ReactNode {
    const {collections} = this.state
    return (
      <div className="shop-page">
        {
          collections.map(collection => (
            <CollectionPreview title={collection?.title} items={collection?.items} /> 
          ))
        }
      </div>
    );
  }
}

export default ShopPage
