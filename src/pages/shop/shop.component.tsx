import React from "react";
import { connect, ConnectedProps } from "react-redux";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import { selectCollections } from "../../redux/collection/collection.selectors";
import { RootState } from "../../redux/store";

const mapStateToProps = (state: RootState) => ({collections: selectCollections(state)})
const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

interface ShopPageProps extends PropsFromRedux{}

const ShopPage = ({collections}: ShopPageProps) => (
  <div className="shop-page">
    {collections.map((collection) => (
      <CollectionPreview
        key={collection.id}
        title={collection?.title}
        items={collection?.items}
      />
    ))}
  </div>
)

export default connector(ShopPage);
