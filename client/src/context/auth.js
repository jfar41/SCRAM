import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
}

if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

    //expiration data stored in exp, hence decodedToken.exp
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})  //our createContext will initially hold a user object

//will create reducer that receives action and type with a payload
function authReducer(state, action) {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

//useReducer hook takes in a reducer and returns a state and dispatch. Inital state here is a user of null
function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData) {
        localStorage.setItem("jwtToken", userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout() {
        localStorage.removeItem("jwtToken");
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout}}
            {...props}
            />
    )
}

export { AuthContext, AuthProvider }