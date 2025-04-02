
import AppRouter from "./components/AppRouter.jsx";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/navBar.jsx";
import Footer from "./components/footer.jsx";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./main.jsx";

const App = observer(() =>{

    const [loading, setLoading] = useState(true);
    const {user} = useContext(Context);

    useEffect(() => {
        const checkAuth = async () => {
            await user.checkToken(); // Дожидаемся проверки токена
            setLoading(false); // Только потом выключаем загрузку
        };

        checkAuth().finally(() => {setLoading(false)}); // После проверки выключаем загрузку
    }, []);

    if(loading){
        return (<p>Страница загружается</p>)
    }
  return (
    <BrowserRouter>

      <NavBar/>
      <AppRouter />
        <Footer />
    </BrowserRouter>
  )
})

export default App
