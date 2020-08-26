import {SET_HEADER_TITLE,RECEIVE_USER,SHOW_ERROR,LOGOUT} from './action-types'
import {reqLogin} from '../api'
import storageUtils from '../utils/storageUtils'
export const setHeaderTitle=(headerTitle)=>({type:SET_HEADER_TITLE,data:headerTitle})

export const recelveUser=(user)=>({type:RECEIVE_USER,user})
export const showError=(errorMsg)=>({type:SHOW_ERROR,errorMsg})
export const logout=()=>{
    storageUtils.removeUser()
    return {type:LOGOUT }
}

export function login(username,password){
    return async dispatch=>{
        const result=await reqLogin(username,password)
        if(result.status===0){
            const user= result.data
            storageUtils.saveUser(user)
            dispatch(recelveUser(user))
        }else{
            const msg=result.msg
            dispatch(showError(msg))
        }
    }
}