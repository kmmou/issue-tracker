import { store } from '../../app/store';
import { issuesApiSlice } from '../issues/issuesApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        store.dispatch(issuesApiSlice.util.prefetch('getIssues', 'issuesList', { force: true }));
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }));
    }, [])

    return <Outlet />
}

export default Prefetch;