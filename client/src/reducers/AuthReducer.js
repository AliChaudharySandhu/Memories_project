import { AUTH, LOGOUT,SIGNIN, SIGNUP} from '../constants/ActionTpes'


const AuthReducer = (state = {authData: null}, action) => {
    switch(action.type){
        case SIGNUP:
            case SIGNIN:
                case AUTH:
            // action.payload === {...action?.payload}
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action?.data}
        
            case LOGOUT:
            localStorage.clear('profile')
            return {...state, authData: null}
        default:
            return state
    }    
}

export default AuthReducer
