import React from 'react';
import style from './app.module.css';

import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage, PasswordRecoveryPage, PasswordRecovery2Page, ProfilePage, IngredientDetailsPage, NotFound404, OrderFeedPage, OrderStatusDetailsPage } from '../../pages/index';

import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getIngredientsFromServer } from '../../services/actions/burger-ingredients';
import { getUserDataFromServer } from '../../services/actions/auth';
import { useSelector, useDispatch } from '../../services/hooks';
import ProtectedRoute from '../protected-route';
import Preloader from '../preloader/preloader';
import OrderStatusDetails from '../order-status-details/order-status-details';
import { Location } from 'history';
import { ORDER_FEED_URL } from '../../utils/burger-api';
import { wsConnect as wcConnectOrderFeed } from '../../services/actions/wsOrderFeedTypes';

type TLocataionState = {
    background: Location
}

export default function App() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);    

    // Инициализируем получение ингредиентов с сервера
    React.useEffect(() => {
        // @ts-ignore
        dispatch(getIngredientsFromServer());
        initAuth();

        // Инициализируем загрузку данных для "Лента заказов"
        dispatch(wcConnectOrderFeed(ORDER_FEED_URL));
    }, []);

    // На тот случай если Redux потерял данные об авторизации,
    // Но у нас есть данные в cookie и localStorage соответственно
    const initAuth = () => {
        // @ts-ignore
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
    const history = useHistory();
    const location = useLocation<TLocataionState>();
    const background = location.state && location.state.background;

    return (
        <>
            <Switch location={background || location}>
                <Route path="/" exact={true}>
                    <HomePage />
                </Route>

                <Route path="/login" exact={true}>
                    <LoginPage />
                </Route>

                <Route path="/register" exact={true}>
                    <RegistrationPage />
                </Route>

                <Route path="/forgot-password">
                    <PasswordRecoveryPage />
                </Route>

                <Route path="/reset-password">
                    <PasswordRecovery2Page />
                </Route>

                <ProtectedRoute path="/profile/orders/:id">
                    <OrderStatusDetailsPage />
                </ProtectedRoute>

                <ProtectedRoute path="/profile/orders" exact={true}>
                    <ProfilePage />
                </ProtectedRoute>

                <ProtectedRoute path="/profile" exact={true}>
                    <ProfilePage />
                </ProtectedRoute>

                <Route path="/ingredients/:id">s
                    <IngredientDetailsPage />
                </Route>

                <Route path="/feed/" exact={true}>
                    <OrderFeedPage />
                </Route>

                <Route path="/feed/:id">
                    <OrderStatusDetailsPage />
                </Route>

                <Route path={`*`}>
                    <NotFound404 />
                </Route>
            </Switch>

            {
                background &&
                <Route path="/ingredients/:id">
                    <Modal onClose={(e) => {                        
                        e?.stopPropagation();
                        history.goBack();
                    }}>
                        <IngredientDetails />
                    </Modal>
                </Route>
            }

            {
                background &&
                <Route path="/feed/:id">
                    <Modal onClose={(e) => {                        
                        e?.stopPropagation();
                        history.goBack();
                    }}>
                        <OrderStatusDetails />
                    </Modal>
                </Route>
            }

            {
                background &&
                <Route path="/profile/orders/:id">
                    <Modal onClose={(e) => {                        
                        e?.stopPropagation();
                        history.goBack();
                    }}>
                        <OrderStatusDetails />
                    </Modal>
                </Route>
            }
        </>
    );
}