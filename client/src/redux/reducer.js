
const initialState = {
    allCountries: [],
    renderedCountries: [],
    loading: true,
    currentPage: 1
}

export default function rootReducer(state = initialState, {type, payload}) {

    switch(type) {
        case 'GET_ALL_COUNTRIES':
            return {
                ...state,
                allCountries: payload,
                renderedCountries: payload,
                loading: false
            }
        case 'SET_PAGE':
            return {
                ...state,
                currentPage: payload
            }
        
        default:
            return state;
    }
    
}
