import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import App from '../App';
import SignUpInForm from './SignUpInForm';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Todo from '../pages/Todo';

const Router = () => {
    const isToken = localStorage.getItem('token');

    const routes = useRoutes([
        { path: "/", element: <App /> },
        { index: true, element: isToken ? <Navigate replace to="/todo" /> : <SignUpInForm /> },
        {
            path: '/signup',
            element: isToken ? <Navigate replace to="/todo" /> : <SignUpInForm />,
        },
        {
            path: '/signin',
            element: isToken ? <Navigate replace to="/todo" /> : <SignUpInForm />,
        },
        {
            path: '/todo',
            element: isToken ? <Todo /> : <Navigate replace to="/signin" />,
        },
    ]);
    return routes;
};

export default Router;