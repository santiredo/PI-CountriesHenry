import axios from 'axios'

export const getAllCountries = () => {
    return (dispatch) => {
        try {
            const response = axios('http://localhost:3001/countries').then(({data}) => {
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

            const response = await axios(`http://localhost:3001/countries/${id}`)
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

export const createActivity = (activity) => {
    return async(dispatch) => {

        try {

            const {name, difficulty, season, Countries, duration} = activity

            const response = await axios.post('http://localhost:3001/activities', {name, difficulty, season, Countries, duration})
            const dbActivity = response.data

            alert('Congratulations, your activity is created')
            return dispatch({
                type: 'CREATE_ACTIVITY',
                payload: dbActivity
            })
            
        } catch (error) {
            alert('Some data is missing')
        }
    }
}

export const getActivities = () => {
    return async(dispatch) => {

        try {
            const response = await axios('http://localhost:3001/activities')
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

            const response = await axios(`http://localhost:3001/country?name=${name}`)
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

export const deleteActivity = (id) => {

    return async(dispatch) => {
        try {

            const response = await axios.delete(`http://localhost:3001/activities/${id}`)

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