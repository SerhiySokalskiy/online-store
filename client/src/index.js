import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore.js';
import DeviceStore from './store/DeviceStore.js';

export const Context = React.createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={
      {user: new UserStore(),
        device: new DeviceStore()
      }
    }>
        <App />
    </Context.Provider>
  </React.StrictMode>
);
