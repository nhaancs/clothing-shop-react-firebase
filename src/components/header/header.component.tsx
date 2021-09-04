import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { auth } from "../../firebase/firebase.utils";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { RootState } from "../../redux/store";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from "../cart-icon/cart-icon.component";
import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from "./header.styles";

const mapStateToProps = (state: RootState) => ({
  currentUser: selectCurrentUser(state),
  cartHidden: selectCartHidden(state),
});
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface HeaderProps extends PropsFromRedux {}

const Header = (props: HeaderProps) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">
        SHOP
      </OptionLink>
      <OptionLink to="/shop">
        CONTACT
      </OptionLink>

      {props.currentUser ? (
        <OptionLink as='div' onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">
          SIGN IN
        </OptionLink>
      )}

      <CartIcon />
    </OptionsContainer>

    {
      !props.cartHidden ? <CartDropdown /> : null
    }
  </HeaderContainer>
);

export default connector(Header);
