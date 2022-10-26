import { GlobalEnums, RootActions } from "../action/globalAction";

interface RootState {
    loading: boolean;
}

const initialState: RootState = {
    loading: false
}

export default (state = initialState, action: RootActions): RootState => {
    switch (action.type) {
        case GlobalEnums.SET_LOADING:
            state.loading = action.payload
            return state
            break;
        default:
            return state
            break;
    }
}