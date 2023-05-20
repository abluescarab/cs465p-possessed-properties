import { initializeApp } from "firebase/app";

const firebase = {
  apiKey: "AIzaSyD6Ej38YMNVj7NJUQSDHcQPhy82s1KIVdg",
  authDomain: "possessed-props.firebaseapp.com",
  projectId: "possessed-props",
  storageBucket: "possessed-props.appspot.com",
  messagingSenderId: "862990631293",
  appId: "1:862990631293:web:598cab5efff8d8c3480c14",
};

const firebaseApp = initializeApp(firebase);

export default firebaseApp;
