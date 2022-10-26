export interface IAction<T, P> {
    readonly type: T;
    readonly payload: P;
}
export function createAction<T extends string, P>(
    type: T,
    payload: any,
): IAction<T, P> {
    return { type, payload };
}