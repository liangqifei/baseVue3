import { postRequest } from '../utils/request'

export const getUsers=async()=>{
   return postRequest('/api/users',{})
}