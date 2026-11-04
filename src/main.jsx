import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Router from './Router/Router.jsx'
import { Provider } from 'react-redux';
import store from './redux/Store.js';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <Router/>
  </Provider>
)
