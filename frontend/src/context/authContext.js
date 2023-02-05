import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_ADMIN':
      return { user: action.payload, isAdmin: true }
    case 'LOGIN':
      return { user: action.payload, isAdmin: false }
    case 'LOGOUT':
      return { user: null }
    case 'UPDATE_USER':
      let {name, email, events, isAdmin, token} = {...state.user}
      console.log(action.payload.user.events)
      events = action.payload.user.events
      return { user: {name, email, events, token}, isAdmin: state.isAdmin }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    isAdmin: false
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user!=null)
      dispatch({type: 'LOGIN', payload: user})
  },[])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}