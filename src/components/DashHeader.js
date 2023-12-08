import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faFilePen, faUserGear, faUserPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth';

const DASH_REGEX = /^\/dash(\/)?$/;
const ISSUES_REGEX = /^\/dash\/issues(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth();

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);

    const onNewIssueClicked = () => navigate('/dash/issues/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onIssuesClicked = () => navigate('/dash/issues')
    const onUsersClicked = () => navigate('/dash/users')

    let dashClass = null;
    if (!DASH_REGEX.test(pathname) && !ISSUES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small";
    }

    let newIssueButton = null
    if (ISSUES_REGEX.test(pathname)) {
        newIssueButton = (
            <button
                className="icon-button"
                title="New Issue"
                onClick={onNewIssueClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        );
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        );
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            );
        }
    }

    let issuesButton = null
    if (!ISSUES_REGEX.test(pathname) && pathname.includes('/dash')) {
        issuesButton = (
            <button
                className="icon-button"
                title="Notes"
                onClick={onIssuesClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        );
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen";

    let buttonContent;
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"} />;
    } else {
        buttonContent = (
            <>
                {newIssueButton}
                {newUserButton}
                {issuesButton}
                {userButton}
                {logoutButton}
            </>
        );
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to="/dash">
                        <h1 className="dash-header__title">Issue Tracker</h1>
                    </Link>
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    )

    return content;
}

export default DashHeader;