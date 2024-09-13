import useComments from '../../hooks/useComments';
import Comment from '../Comment';
import './styles.css';

const Replies = ({ replies, replyingToId }) => {
	const { updateComment, deleteComment, upVoteComment, downVoteComment } = useComments();

	if (!replies?.length) return null;

	return (
		<ul className='replies'>
			{replies?.map((reply) => (
				<Comment
					key={reply.id}
					onUpdate={updateComment}
					onDelete={deleteComment}
					onUpVote={upVoteComment}
					onDownVote={downVoteComment}
					comment={{ ...reply, replyingToId }}
				/>
			))}
		</ul>
	);
};

export default Replies;
