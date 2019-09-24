const ADD = '@avalon/rooms/ADD';
const UPDATE = '@avalon/rooms/UPDATE';
const UPDATE_USER = '@avalon/rooms/UPDATE_USER';

const initialState = {};
const reducer = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case ADD: return { ...state, [payload._id]: { ...payload } };
        case UPDATE: return { ...state, [payload._id]: { ...payload } };
        case UPDATE_USER: {
            const { roomConnection: roomId, _id: userId } = payload;
            if (!roomId || !state[roomId]) return state;

            return {
                ...state,
                [roomId]: {
                    ...state[roomId],
                    users: state[roomId].users.filter(({ _id }) => _id !== userId ).concat(payload),
                }
            }
        }
        default: return state;
    }
}
export default reducer;

export const actions = {
    addRoom: payload => ({ type: ADD, payload }),
    updateRoom: payload => ({ type: UPDATE, payload }),
    updateRoomsUser: payload => ({ type: UPDATE_USER, payload }),
};