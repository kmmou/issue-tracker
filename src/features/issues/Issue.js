import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useGetIssuesQuery } from './issuesApiSlice';
import { memo } from 'react';

const Issue = ({ issueId }) => {
    const { issue } = useGetIssuesQuery("issuesList", {
        selectFromResult: ({ data }) => ({
            issue: data?.entities[issueId]
        }),
    });

    const navigate = useNavigate();

    if (issue) {
        const created = new Date(issue.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' });
        const updated = new Date(issue.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' });
        const handleEdit = () => navigate(`/dash/issues/${issueId}`);

        return (
            <tr className="table__row">
                <td className="table__cell issue__title">{issue.title}</td>
                <td className="table__cell issue__status">
                    {issue.completed
                        ? <span className="issue__status--completed">Completed</span>
                        : <span className="issue__status--open">Open</span>
                    }
                </td>
                <td className="table__cell issue__created">{created}</td>
                <td className="table__cell issue__updated">{updated}</td>
                <td className="table__cell issue__username">{issue.username}</td>
                
                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else return null;
}

const memoizedIssue = memo(Issue);
export default memoizedIssue;