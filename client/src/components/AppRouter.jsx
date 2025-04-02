import React, {useContext} from 'react';
import {Context} from "../main.jsx";
import {HOME_ROUTE, RECALL_ROUTE} from "../utils/consts.js";
import {privateRoutes, publicRoutes} from "../routes.js";
import {Navigate, Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";


const AppRouter = observer(() => {
    const {user} = useContext(Context);
    return (
        <Routes key={user.isAuth ? true : !user.isAuth}>
            {user.isAuth &&
                privateRoutes.map(({ path, Element, role }) =>
                    role.includes(user.role) ? (
                        <Route key={path} path={path} element={<Element />} />
                    ) : null
                )}
            {publicRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={<Element />} />
            ))}
            <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;