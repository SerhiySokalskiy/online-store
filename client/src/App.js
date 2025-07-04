import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {observer} from 'mobx-react-lite'
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {Context} from './index'
import { check } from "./http/userApi";
import { Spinner } from "react-bootstrap";

const App = observer(()=> {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  check()
    .then(() => {
      user.setUser(true);
      user.setIsAuth(true);
    })
    .catch((e) => {
      user.setIsAuth(false);
      console.warn('Користувач не авторизований');
    })
    .finally(() => setLoading(false));
  }, []);


  if (loading){
    return <Spinner animation={"grow"}/>
  }
  
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
