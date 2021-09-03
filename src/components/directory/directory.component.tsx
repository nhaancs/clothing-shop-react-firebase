import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { selectDirectories } from "../../redux/directory/directory.selectors";
import { RootState } from "../../redux/store";
import MenuItem from "../menu-item/menu-item.component";
import "./directory.styles.scss";

const mapStateToProps = (state: RootState) => ({
  directories: selectDirectories(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface DirectoryProps extends PropsFromRedux {}

const Directory = ({ directories }: DirectoryProps) => (
  <div className="directory-menu">
    {directories.map(({ id, ...otherProps }) => (
      <MenuItem key={id} {...otherProps} />
    ))}
  </div>
);

export default connector(Directory);
