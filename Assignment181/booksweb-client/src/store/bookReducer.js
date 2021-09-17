import * as ActionNames from "./actions";

const createNewBookState=()=>({
    books:[],
    selectedBook:null
});

export const bookReducer=(initialState=createNewBookState(), action)=>{

    let newState = {
        ...initialState,
        books:[...initialState.books]
    };

    switch(action.type){
        case ActionNames.LIST_BOOKS:
            newState.books = action.payload;
            return newState;
        case ActionNames.BOOK_DETAILS:
            newState.selectedBook = action.payload;
            return newState;
        default:
            return initialState;
    }
}