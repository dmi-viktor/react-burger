import { FC } from 'react';
import { Redirect, Route, RouteComponentProps, useLocation } from 'react-router-dom';
import { useSelector } from '../services/hooks';
import { RouteProps } from 'react-router';
import { TLocataionState } from '../utils/types';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const auth = useSelector(state => state.auth);

    const location = useLocation<TLocataionState>();

    return (
        <Route {...rest}>
            {
                <>
                    {
                        auth.isAuth ?
                        (children)
                        :
                        (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: location }
                                }}
                            />
                        )
                    }
                </>
            }
        </Route>
    );
}

export default ProtectedRoute;