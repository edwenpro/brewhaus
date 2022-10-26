import { RootState } from "../store/configureStore";

export const selectLoadingStatus = (state: RootState) => state.root.loading;