import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const Welcome = () => {
    useTitle("Issue Tracker - Dashboard");

    const { username, isManager, isAdmin } = useAuth();

    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);

    const content = (
        <section className="welcome">
            <p>{today}</p>

            <h1>Welcome {username}!</h1>

            <p><Link to="/dash/issues">Issues</Link></p>

            <p><Link to="/dash/issues/new">Create New Issue</Link></p>

            {(isManager || isAdmin) && <p><Link to="/dash/users">Users</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Create New User</Link></p>}
        </section>
    )

    return content;
}

export default Welcome;