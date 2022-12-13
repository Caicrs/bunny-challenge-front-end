import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { RoutePath } from "types/routes";
import Home from "pages/Home/index";
import Login from "pages/Login/index";
import RegisterPage from "pages/Register";
import { Auth } from "helpers/Auth";
import { CrudPage } from "pages/create/create";
import { EditUserPage } from "pages/Edit/editUsers";



const AuthenticatedRoutes = () => {
  const isAuthenticated = Auth.isAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={RoutePath.LOGIN} />;
};

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.LOGIN} element={<Login />} />
      <Route path={RoutePath.REGISTER} element={<RegisterPage />} />
      <Route path="/" element={<AuthenticatedRoutes />}>
        <Route path={RoutePath.HOME} element={<Home />} />
        <Route path={RoutePath.CRUD} element={<CrudPage/>}/>
        <Route path={RoutePath.EDITUSER} element={<EditUserPage/>}/>
      </Route>
    </Routes>
  );
};

export default Router;
