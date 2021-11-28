import axios from 'axios'

export default axios.create({
    baseURL: 'https://bikes-cbb5f-default-rtdb.firebaseio.com/' 
})
