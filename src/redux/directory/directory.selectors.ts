import { createSelector } from "reselect";
import { RootState } from "../store";

const selectDirectory = (state: RootState) => state.directory

export const selectDirectories = createSelector([selectDirectory], directory => directory.directories)