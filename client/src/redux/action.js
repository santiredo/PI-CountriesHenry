import axios from 'axios'

export const getAllCountries = () => {
    return (dispatch) => {
        try {
            const response = axios('https://pi-countrieshenry-production.up.railway.app/countries').then(({data}) => {
                return dispatch({
                    type: 'GET_ALL_COUNTRIES',
                    payload: data
                })
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export const setPage = (newPage) => {
    return {
        type: 'SET_PAGE',
        payload: newPage
    }
}

export const showDetails = (id) => {
    return async(dispatch) => {
        try {

            const response = await axios(`https://pi-countrieshenry-production.up.railway.app/countries/${id}`)
            const data = response.data
            return dispatch({
                type: 'SHOW_DETAILS',
                payload: data
            })

            
        } catch (error) {
            alert(error.message)
        }
    }
}

export const orderCountries = (order) => {
    return {
        type: 'ORDER',
        payload: order
    }
}

export const orderByRegion = (region) => {
    return {
        type: 'REGION',
        payload: region
    }
}

export const orderByActivity = (activity) => {
    return {
        type: 'ACTIVITY',
        payload: activity
    }
}

export const getActivities = (id) => {
    return async(dispatch) => {

        try {
            const response = await axios(`https://pi-countrieshenry-production.up.railway.app/activities/${id}`)
            const activities = response.data

            return dispatch({
                type: 'GET_ACTIVITIES',
                payload: activities
            })
            
        } catch (error) {
            alert(error.message)
        }
    }
}

export const searchByName = (name) => {
    return async(dispatch) => {
        try {

            const response = await axios(`https://pi-countrieshenry-production.up.railway.app/country?name=${name}`)
            const countries = response.data
            console.log(countries.length)
            if(countries.length === 0 || countries.length === 250) {
                throw new Error('That search doesent match any country')
            }  
            return dispatch({
                type: 'SEARCH_BY_NAME',
                payload: countries
            })
            
        } catch (error) {
            alert(error.message)
        }
    }
}

export const deleteActivity = (id, UserId) => {

    return async(dispatch) => {
        try {

            const response = await axios.delete(`https://pi-countrieshenry-production.up.railway.app/activities/${id}/${UserId}`)

            console.log(response.data)

            return dispatch({
                type: 'DELETE_ACTIVITY',
                payload: response.data
            })
            
        } catch (error) {
            alert(error.message)
        }
    }
}