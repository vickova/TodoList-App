import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducers';
import axios from 'axios';
import { getToken } from './utils/common';


axios.interceptors.request.use((config)=>{
  const token = getToken();
  if(token){
    config.headers['Authorization'] = 'Bearer '+ getToken();
  }
  return config
}, 
error=>{
  Promise.reject(error)
})

axios.interceptors.response.use((response)=>{
  return response
}, 
function (error){
  return Promise.reject(error)
}
)

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
