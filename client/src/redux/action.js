import axios from 'axios'

export const getAllCountries = () => {
    return async (dispach) => {
        try {
            const response = await axios('http://localhost:3001/countries')
            const data = response.data
            return dispach({
                type: 'GET_ALL_COUNTRIES',
                payload: data
            })
            
        } catch (error) {
            alert(error.message)
        }
    }
}