const ADD = '@avalon/games/ADD';

const initialState = {};
const reducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case ADD: return { ...state, ...payload };
        default: return state;
    }
}
export default reducer;

export const actions = {
    addGames: payload => ({ type: ADD, payload }),
};