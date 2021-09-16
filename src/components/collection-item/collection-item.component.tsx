import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { CartItem } from "../../models/cart.model";
import { CollectionItem } from "../../models/collection.model";
import { addCartItemAction } from "../../redux/cart/cart.actions";
import { AddButton, BackgroundImage, CollectionFooterContainer, CollectionItemContainer, NameContainer, PriceContainer } from "./collection-item.styles";

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addCartItem: (item: CollectionItem) => {
        const cartItem: CartItem = {
            ...item,
            quantity: 1
        }
        return dispatch(addCartItemAction(cartItem))
    }
})

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface CollectionItemProps extends PropsFromRedux {
  item: CollectionItem
}

const CollectionItemCmp = ({ item, addCartItem }: CollectionItemProps) => {
  const { name, price, imageUrl } = item;
  return (
    <CollectionItemContainer>
      <BackgroundImage className='image' imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton onClick={() => addCartItem(item)} inverted>
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
}

export default connector(CollectionItemCmp)
