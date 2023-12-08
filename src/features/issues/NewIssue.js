import NewIssueForm from './NewIssueForm';
import { useGetUsersQuery } from '../users/usersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';

const NewIssue = () => {
    useTitle("Create New Issue");
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    });

    if (!users?.length) return <PulseLoader color={"#FFF"} />;

    const content = <NewIssueForm users={users} />
    return content;
}
export default NewIssue;