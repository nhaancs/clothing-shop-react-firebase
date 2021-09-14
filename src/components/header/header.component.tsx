import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { RootState } from "../../redux/store";
import { signOutStartAction } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from "../cart-icon/cart-icon.component";
import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from "./header.styles";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOutStart: () => dispatch(signOutStartAction())
})
const mapStateToProps = (state: RootState) => ({
  currentUser: selectCurrentUser(state),
  cartHidden: selectCartHidden(state),
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface HeaderProps extends PropsFromRedux {}

const Header = ({currentUser, cartHidden, signOutStart}: HeaderProps) => (
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

      {currentUser ? (
        <OptionLink as='div' onClick={() => signOutStart()}>
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
      !cartHidden ? <CartDropdown /> : null
    }
  </HeaderContainer>
);

export default connector(Header);
