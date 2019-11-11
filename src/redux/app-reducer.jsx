const SET_INITIALIZE = "SET_INITIALIZE";

let initialState = {
    initialized:false
};

export const appReducer = (state = initialState,action ) => {
    switch(action.type){
        case SET_INITIALIZE:
            return {
                ...state,
                initialized: true,
            };
        default: return state;
    }

};

export let setInitialize = () =>({type: SET_INITIALIZE});
