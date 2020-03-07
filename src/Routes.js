import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Admin from './components/Admin/Admin'
import NotFound from "./components/NotFound/NotFound";
import { AuthenticatedRoute, PublicRoute } from './AuthenticatedRoute';

export default function Routes() {
  return (
    <Router>
    <PublicRoute exact path={'/'} component={Home} />
    <PublicRoute exact path={'/login'} component={Login} />
    <PublicRoute exact path={'/NotFound'} component={NotFound} />
    <AuthenticatedRoute exact path={'/admin'} component={Admin} />
    </Router>
  );
}
