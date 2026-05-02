import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import FoodLog from './pages/FoodLog';
import ActivityLog from './pages/ActivityLog';
import Profile from './pages/Profile';
import Login from './pages/Login';

import Loading from './components/Loading';

import { useAppContext } from "./context/AppContext";

const App = () => {
  const { user, isUserFetched, onboardingCompleted } = useAppContext();

  if (!user) {
    return isUserFetched ? <Login /> : <Loading />
  }
  
  return ( 
    <Fragment>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='/food' element={<FoodLog />} />
          <Route path='/activity' element={<ActivityLog />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App
