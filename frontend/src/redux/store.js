import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productSlice from './productSlice'
import {persistReducer,persistStore,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from "redux-persist";
// import storage from "redux-persist/lib/storage";  //by default storage=localstorage -->but this lib not working here 

 const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  product:productSlice
}); //we can place multiple reducer inside it eg user reducer,cartreducer

const persistedReducer = persistReducer(persistConfig, rootReducer);//2nd Main


const store = configureStore({
  reducer: persistedReducer, //userReducer function,next will be added AddCart reducer
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:{
    ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
  }}),
});//MAin create redux store 

export const persistor=persistStore(store)

export default store;

//Notes--->1)Redux Toolkit = creates and manages Redux store easily ,React Redux = connects Redux store to React components
//2) If you need reducer (store.js)--->If you need reducer (store.js)
//3) If you need action -->Iimport { setUser } from "./userSlice";
//4)getItem--> is called during app start (rehydration)
//5)setItem called-->redux state changes --> dispatch(setUser({ name: "Yogesh" }))


//Que-->why we use Redux store and redux persist not only Localstorage?-----------ANS-->1)by using dispatch whenever state will get changed component will get rendered-->2)we have to use localstoaege.getItem in every component where we wanto use that user--3)in redux by using Provider we are available all these state to all component and by using UseSelector we can access that state in Component---->4)