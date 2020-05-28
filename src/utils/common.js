import axios from 'axios';
import buildQueryUrl from './buildQueryUrl'

export const getData = (queryName) => {
    const response =  axios.get(buildQueryUrl(queryName))
    return response
}
