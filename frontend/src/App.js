import '../src/css/App.css';
import { BrowserRouter, Routes, Route, Navigate,Link } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home'
import UserAccount from './components/UserAccount'
import Portfolio from './components/Portfolio'
import Watchlist from './components/Watchlist'
import Transactions from './components/Transactions'
import Analytics from './components/Analytics'
import Alerts from './components/Alerts'
import Signup from './components/Signup';
import Logout from './components/Logout';
import Notifications from './components/Notifications';
import React, {useState} from 'react';
import StockInfo from './components/StockInfo';

function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  const [ticker, setTicker] = useState('');
  const [notification, setNotification] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);


  return (
      
      <BrowserRouter>
        <nav className ="navbar-2">
          <div className ="container-xxl">
          {loggedIn && <Link className='logout-btn btn' to="/logout"><i className="fas fa-power-off"></i></Link>}
          </div>
        </nav>
          <Routes>
              <Route exact path="/" element={loggedIn ? <Navigate to="/home" /> : <Login fxn={setLoggedIn} />}/>
              <Route path="/home" element={loggedIn ? <Home setNotification={setNotification} setIsNotificationVisible={setIsNotificationVisible} onChangeName={(newName)=>{setTicker(newName)}}/> : <Login fxn={setLoggedIn} />}>
                <Route path="user" element={loggedIn ? <UserAccount /> : <Login fxn={setLoggedIn} />}/>
                <Route path="portfolio" element={loggedIn ? <Portfolio onChangeName={(newName)=>{setTicker(newName)}} /> : <Login fxn={setLoggedIn} />} />
                <Route path="watchlist" element={loggedIn ? <Watchlist onChangeName={(newName)=>{setTicker(newName)}} /> : <Login fxn={setLoggedIn} />} />
                <Route path="transactions" element={loggedIn ? <Transactions  onChangeName={(newName)=>{setTicker(newName)}} /> : <Login fxn={setLoggedIn} /> } />
                <Route path="analytics" element={loggedIn ? <Analytics /> : <Login fxn={setLoggedIn} />} />
                <Route path="alerts" element={loggedIn ? <Alerts onChangeName={(newName)=>{setTicker(newName)}}/> : <Login fxn={setLoggedIn} />} />
                <Route path="stock" element={loggedIn ? <StockInfo ticker={ticker} /> : <Login fxn={setLoggedIn} />} />
                <Route path="notifications" element={loggedIn ? <Notifications /> : <Login fxn={setLoggedIn} />} />
              </Route>
              <Route path="/signup" element={loggedIn ? <Navigate to="/home" /> : <Signup fxn={setLoggedIn} />} />
              <Route path="/logout" element={<Logout fxn={setLoggedIn} />} />
          </Routes>
          {isNotificationVisible && <div className='notification'> 
            <div className='notification-close-btn-div' onClick={()=>{setIsNotificationVisible(false)}}><div className='notification-close-btn'> x </div></div>
            <div className='notification-popup-heading'>New notification</div>
            <div className='notification-popup-message'>{notification}</div>
          </div>}
        </BrowserRouter>
    
  );
}

export default App;