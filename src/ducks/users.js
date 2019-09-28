const ADD = '@avalon/users/ADD';
const UPDATE = '@avalon/users/UPDATE';

const initialState = {};
const reducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case ADD: return { ...state, ...payload };
        case UPDATE: return { ...state, [payload._id]: { ...payload } };
        default: return state;
    }
}
export default reducer;

export const actions = {
    addUsers: payload => ({ type: ADD, payload }),
    updateUser: payload => ({ type: UPDATE, payload }),
};