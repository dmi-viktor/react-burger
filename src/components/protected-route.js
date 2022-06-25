import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function ProtectedRoute({ children, ...rest }) {
    const auth = useSelector(state => state.auth);

    return <Route {...rest} render={({ location }) => auth.isAuth ?
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

    } />;
}