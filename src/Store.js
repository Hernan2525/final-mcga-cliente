import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {
  email: undefined,
  password: undefined,
  logged: false,
  message: undefined,
  isLogging: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_CHANGE_EMAIL':
      return {
        ...state,
        email: action.payload,
        logged: false,
        message: undefined
      }
    case 'ON_CHANGE_PASSWORD':
      return {
        ...state,
        password: action.payload,
        logged: false,
        message: undefined
      }
    case 'LOGIN_PENDING':
      return {
        ...state,
        isLogging: true,
      }
    case 'LOGIN_SUCCESS':
      localStorage.setItem('Token', action.payload.token)
      return {
        ...state,
        isLogging: false,
        logged: true
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        isLogging: false,
        message: action.payload.message
      }
      case "GETTING_CLIENTS":
      return {
        ...state,
        isLoading: true
      };
    case "GOT_CLIENTS":
      return {
        ...state,
        isLoading: false,
        products: action.payload
      };
    case "ERROR_GETTING_CLIENTS":
      return {
        ...state,
        isLoading: false,
        message: action.payload.message
      };
    default:
      return state
  }
}

export const onChangeEmail = (event) => {
  const text = event.target.value
  return {
    type: 'ON_CHANGE_EMAIL',
    payload: text
  }
}

export const onChangePassword = (event) => {
  const text = event.target.value
  return {
    type: 'ON_CHANGE_PASSWORD',
    payload: text
  }
}

export const handleLogin = (email, password) => {

  return (dispatch) => {
    dispatch({
      type: 'LOGIN_PENDING',
    })

    const options = {
      baseURL: 'https://final2020-mcga-servidor.herokuapp.com/',
      timeout: 25000,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    return fetch('https://final2020-mcga-servidor.herokuapp.com/login', { ...options, body: JSON.stringify({ email, password }) })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(data => {
        console.log(data)
        if (!data.success) {
          return Promise.reject(data)
        }
        return dispatch({
          type: 'LOGIN_SUCCESS',
          payload: data,
        })
      })
      .catch(error => {
        console.log(error)
        return dispatch({
          type: 'LOGIN_ERROR',
          payload: error,
        })
      })
  }

}

export const getClients = () => {
  return dispatch => {
    dispatch({
      type: "GETTING_CLIENTS"
    });
    const options = {
      timeout: 25000,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };

    return fetch('https://final2020-mcga-servidor.herokuapp.com/getclients', { ...options })
      .then(res => res.json())
      .then(data => {
        console.log("GETTING_CLIENTS", data);
        if (!data.length) {
          return Promise.reject(data);
        }

        return dispatch({
          type: "GOT_CLIENTS",
          payload: data
        });
      })
      .catch(error => {
        return dispatch({
          type: "ERROR_GETTING_CLIENTS",
          payload: error
        });
      });
  };
};


export const remClient = cuit => {
  return dispatch => {
    dispatch({
      type: "REMOVING_CLIENT"
    });

    const options = {
      timeout: 25000,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cuit })
    };

    return fetch('https://final2020-mcga-servidor.herokuapp.com/remclient', options)
      .then(res => res.json())
      .then(data => {
        console.log("REMOVING_CLIENT", data);
        if (!Object.entries(data).length) {
          return Promise.reject(data);
        }

        return dispatch({
          type: "CLIENT_REMOVED",
          payload: {
            code: data.code
          }
        });
      })
      .catch(error => {
        return dispatch({
          type: "ERROR_REMOVING_CLIENT",
          payload: error
        });
      });
  };
};


const middleware = [thunk]

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middleware),
));

export default store
