
const initialState = {
    allCountries: [],
    renderedCountries: [],
    loadingHome: true,
    currentPage: 1,
    countryDetails: [],
    loadingDetails: true
}

export default function rootReducer(state = initialState, {type, payload}) {

    switch(type) {
        case 'GET_ALL_COUNTRIES':
            return {
                ...state,
                allCountries: payload,
                renderedCountries: payload,
                loadingHome: false,
                loadingDetails: true
            }
        case 'SET_PAGE':
            return {
                ...state,
                currentPage: payload
            }
        case 'SHOW_DETAILS':
            return {
                ...state,
                countryDetails: payload,
                loadingDetails: false,
                loadingHome: true
            }
        
        default:
            return state;
    }
    
}
