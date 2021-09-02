import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { CartItem } from "../../models/cart.model";
import { CollectionItem } from "../../models/collection.model";
import { addCartItem } from "../../redux/cart/cart.actions";
import CustomButton from "../custom-button/custom-button.component";

import './collection-item.styles.scss'

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addCartItem: (item: CollectionItem) => {
        const cartItem: CartItem = {
            ...item,
            quantity: 1
        }
        return dispatch(addCartItem(cartItem))
    }
})

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface CollectionItemProps extends PropsFromRedux {
    item: CollectionItem
}

const CollectionItemCmp = ({ item, addCartItem }: CollectionItemProps) => (
  <div className="collection-item">
    <div
      className="image"
      style={{ backgroundImage: `url(${item?.imageUrl})` }}
    ></div>
    <div className="collection-footer">
      <span className="name">{item?.name}</span>
      <span className="price">{item?.price}</span>
    </div>
    <CustomButton onClick={() => addCartItem(item)} inverted>Add to cart</CustomButton>
  </div>
);

export default connector(CollectionItemCmp)
