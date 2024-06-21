import React from "react"; /*main React library to create react component */
import ReactDOM from "react-dom/client"; /*ReactDOM library fro renderign the component to the DOM*/
import App from "./App.jsx"; /*main App component of the application*/
import { store } from "./globalState/store.jsx"; /* Redux store which holds the global state of the applicaion*/
import { Provider } from "react-redux"; /* provider component from react-redux allow app to access Redux store*/

/* Finds HTML root ID and create root DOM to render app*/
/*Wrapper component to highlight problems in the app*/
/*Wraps provider, components have access to redux store*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
