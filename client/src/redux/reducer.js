
const initialState = {
    allCountries: [],
    renderedCountries: [],
    loadingHome: true,
    currentPage: 1,
    countryDetails: [],
    loadingDetails: true,
    loadingActivities: true,
    activities: []
}

export default function rootReducer(state = initialState, {type, payload}) {

    switch(type) {
        case 'GET_ALL_COUNTRIES':
            return {
                ...state,
                allCountries: payload,
                renderedCountries: payload,
                loadingHome: false,
                loadingDetails: true,
                loadingActivities: true
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
                loadingHome: true,
                loadingActivities: true
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
                renderedCountries: state.allCountries.filter(country => country.continent === payload ),
                currentPage: 1
            }
        case 'ACTIVITY' :
            let activity = state.activities.find(activity => activity.name === payload)

            return {
                ...state,
                renderedCountries: state.allCountries.filter(country => activity.Countries.includes(country.name)),
                currentPage: 1
            }       

        case 'CREATE_ACTIVITY':
            return {
                ...state,
                activities: [payload, ...state.activities]
            }
        case 'GET_ACTIVITIES':
            return {
                ...state,
                activities: payload,
                loadingActivities: false
            }
        case 'SEARCH_BY_NAME':
            if(payload.length === 0) {
                return {...state, currentPage: 1}
            } else{
                return {
                    ...state,
                    renderedCountries: payload,
                    currentPage: 1
                }
            }

        default:
            return state;
    }
    
}
