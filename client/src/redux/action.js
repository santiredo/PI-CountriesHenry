import axios from 'axios'

export const getAllCountries = () => {
    return async (dispatch) => {
        try {
            const response = await axios('http://localhost:3001/countries')
            const data = response.data
            return dispatch({
                type: 'GET_ALL_COUNTRIES',
                payload: data
            })
            
        } catch (error) {
            alert(error.message)
        }
    }
}

export const setPage = (direction, currentPage, countriesPerPage, countries) => {
    return (dispatch) => {
        try {
            
            if(direction === -1 || (countriesPerPage * currentPage) < countries.length){
                
                if(currentPage + direction > 0){
                    const newPage = currentPage + direction
                    return dispatch({
                        type: 'SET_PAGE',
                        payload: newPage
                    })
                }
            }
            throw new Error(`Page N°${currentPage + direction} is empty`)
        } catch (error) {
            alert(error.message)
        }
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