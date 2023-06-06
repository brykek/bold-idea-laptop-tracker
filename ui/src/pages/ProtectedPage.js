import { Navigate } from 'react-router-dom';
import { loggedIn } from '../util/helpers';

const Protected = ({ children }) => {
    if (!loggedIn()) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default Protected;
