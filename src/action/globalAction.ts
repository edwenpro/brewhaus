import { createAction, IAction } from "./action.types";

export enum GlobalEnums {
    SET_LOADING = 'SET_LOADING',
}
export type SetLoadingStatusAction = IAction<
    typeof GlobalEnums.SET_LOADING,
    boolean
>;

export const setLoadingStatus = (
    flag: boolean,
): SetLoadingStatusAction =>
    createAction(GlobalEnums.SET_LOADING, flag);


export type RootActions = SetLoadingStatusAction;