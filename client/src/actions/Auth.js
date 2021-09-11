import * as api from '../api/index'
import { SIGNIN, SIGNUP} from '../constants/ActionTpes'

export const signUp = (formData, history) => async dispatch =>{
    
    try {
        const {data} = await api.signUp(formData)
        console.log(data)
        dispatch({type: SIGNUP, data})
        history.push('/')
    } catch (error) {
        console.log(error)
    }

}
export const signIn = (formData, history) => async dispatch =>{

    try {
        const {data} = await api.signIn(formData)

        dispatch({type: SIGNIN, data})
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}