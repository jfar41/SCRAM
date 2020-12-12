import React, { useReducer, createContext } from 'react';

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
    const [state, dispatch] = useReducer(authReducer, { user: null});

    function login(userData) {
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout() {
        dispatch({ type: 'LOGOUT'});
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout}}
            {...props}
            />
    )
}

export { AuthContext, AuthProvider }