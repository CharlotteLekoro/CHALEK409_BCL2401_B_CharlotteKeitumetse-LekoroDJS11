import "./App.css"; /*for styling*/
import React, {
  useEffect,
} from "react"; /*react Library, useEffect hook for handling side effects*/
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom"; /*imports comps for handling client side routing*/
// routes
import {
  Home,
  Signup,
  SinglePodcast,
  Login,
  Favourites,
  PageNotFound,
} from "./pages";
import supabase from "./supabase/client";
// redux
import {
  useSelector,
  useDispatch,
} from "react-redux"; /*import hooks to interact with the Redux store, useSelector= access state an useDispatch=dispatch actions*/
import {
  /*list all podcast, loading state, set podcast displayed, data set, check account, favourite and sort*/
  setAllPodcasts,
  setIsLoading,
  setHomePageDisplayedPodcasts,
  setUserDataFromDB,
  setHasAccount,
  setFavourites,
  setSortSearchFavouritesArray,
} from "./globalState/reducers/podcastsReducer";
/*picks up data from Redux store and sends action to update*/
function App() {
  const { favourites, favouriteSwitch } = useSelector(
    (state) => state.podcastsReducer
  );

  const dispatch = useDispatch();

  /*fetches and manages podcast, updates UI and state based on fetched results*/
  useEffect(() => {
    dispatch(setIsLoading(true));
    const getPodcasts = async () => {
      const response = await fetch("https://podcast-api.netlify.app/shows");
      const result = await response.json();

      if (result) {
        dispatch(setHomePageDisplayedPodcasts(result));
        dispatch(setAllPodcasts(result));

        dispatch(setIsLoading(false));
      } else {
        console.log("error");
      }
      return result;
    };
    getPodcasts();
  }, []);
  /*used when you need to fetch data from backend services and manage it using Redux storefor state management*/
  const fetchLoginData = async () => {
    const { data, error } = await supabase.from("user_login_data").select();
    if (error) {
      console.log(error);
    }
    if (data.length !== 0) {
      dispatch(setUserDataFromDB(data));
      dispatch(setHasAccount(true));
    }
  };
  /*use async and await to fetch and manage data. ensure app starts by initializing user data and updates favourite based on triggers*/
  useEffect(() => {
    fetchLoginData();
  }, []);

  const fetchFavouritesFromDB = async () => {
    const { data, error } = await supabase.from("userFavourites").select();
    if (data) {
      dispatch(setFavourites(data));
    }
  };
  useEffect(() => {
    fetchFavouritesFromDB();
  }, [favouriteSwitch]);

  /*This enables navigation between different views/pages based on url changes providing SPA*/
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/podcast/:id" element={<SinglePodcast />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
