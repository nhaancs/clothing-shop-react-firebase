import React, { ReactNode } from "react";
import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import { Collection } from "../../models/collection.model";

interface ShopPageProps {}

interface ShopPageState {
  collections: Collection[];
}

class ShopPage extends React.Component<ShopPageProps, ShopPageState> {
  constructor(props: ShopPageProps) {
    super(props);

    this.state = {
      collections: SHOP_DATA,
    };
  }

  render(): ReactNode {
    const { collections } = this.state;
    return (
      <div className="shop-page">
        {collections.map((collection) => (
          <CollectionPreview
            key={collection.id}
            title={collection?.title}
            items={collection?.items}
          />
        ))}
      </div>
    );
  }
}

export default ShopPage;
