
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
        case 'ORDER':
            return {
                ...state,
                renderedCountries: [...state.renderedCountries].sort((a, b) => {
                    if (payload === 'AZ') return a.name.localeCompare(b.name);
                    if (payload === 'ZA') return b.name.localeCompare(a.name);
                    if (payload === '+') return b.population - a.population;
                    return payload === '-' && a.population - b.population;
                })
            }
        case 'REGION':
            return {
                ...state,
                renderedCountries: state.renderedCountries.filter(country => country.continent === payload)
            }
        

        default:
            return state;
    }
    
}
