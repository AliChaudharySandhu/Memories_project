import { AUTH, LOGOUT} from '../constants/ActionTpes'


const AuthReducer = (state = {authData: null}, action) => {
    switch(action.type){
        case AUTH :
            // action.payload === {...action?.payload}

            localStorage.setItem('profile', JSON.stringify({...action?.payload}));
            return {...state, authData: action?.payload}
        case LOGOUT:
            localStorage.clear('profile')
            return {...state, authData: null}
        default:
            return state
    }    
}

export default AuthReducer
