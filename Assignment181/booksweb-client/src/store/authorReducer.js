import * as ActionNames from "./actions";

const createNewAuthorState=()=>({
    authors:[],
    selectedAuthor:null
});

const initState = createNewAuthorState();

export const authorReducer=(initialState=initState, action)=>{

    let newState = {
        ...initialState,
        authors:[...initialState.authors]
    };

    switch(action.type){
        case ActionNames.LIST_AUTHORS:
            newState.authors = action.payload;
            return newState;
        case ActionNames.AUTHOR_DETAILS:
            newState.selectedAuthor = action.payload;
            return newState;
        default:
            return initialState;
    }
}