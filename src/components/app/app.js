import React from 'react';
import style from './app.module.css';

import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage, PasswordRecoveryPage, PasswordRecovery2Page, ProfilePage, IngredientDetailsPage, NotFound404 } from '../../pages/index';

import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getIngredientsFromServer } from '../../services/actions/burger-ingredients';
import { getUserDataFromServer } from '../../services/actions/auth.js';

import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../protected-route.js';
import Preloader from '../preloader/preloader.js';

export default function App() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    // Инициализируем получение ингредиентов с сервера
    React.useEffect(() => {
        dispatch(getIngredientsFromServer());
        initAuth();
    }, []);

    // На тот случай если Redux потерял данные об авторизации,
    // Но у нас есть данные в cookie и localStorage соответственно
    const initAuth = () => {
        dispatch(getUserDataFromServer());
    };

    return (
        <>
        <Router>
            <div className={style.app}>
                <AppHeader />
                <div className={style.mainContentBox}>
                    <ModalSwitch />
                </div>
            </div>            
        </Router>
            {
                auth.isRequest && <Preloader description='Ожидайте...' />
            }
        </>
    );
}

function ModalSwitch() {
    let location = useLocation();
    let background = location.state && location.state.background;
    let history = useHistory();

    return (
        <>
            <Switch location={background || location}>
                <Route path="/" exact={true}>
                    <HomePage />
                </Route>

                <Route path="/login" exact={true}>
                    <LoginPage />
                </Route>

                <Route path="/register" exact={false}>
                    <RegistrationPage />
                </Route>

                <Route path="/forgot-password">
                    <PasswordRecoveryPage />
                </Route>

                <Route path="/reset-password">
                    <PasswordRecovery2Page />
                </Route>

                <ProtectedRoute path="/profile">
                    <ProfilePage />
                </ProtectedRoute>

                <Route path="/ingredients/:id">
                    <IngredientDetailsPage />
                </Route>

                <Route path={`*`}>
                    <NotFound404 />
                </Route>
            </Switch>

            {
                background &&
                <Route path="/ingredients/:id">
                    <Modal onClose={(e) => {
                        e.stopPropagation();
                        history.goBack();
                    }}>
                        <IngredientDetails />
                    </Modal>
                </Route>
            }
        </>
    );
}