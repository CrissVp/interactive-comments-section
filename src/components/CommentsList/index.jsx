import useComments from '../../hooks/useComments';
import Comment from '../Comment';
import Form from '../Form';
import './styles.css';

const CommentsList = () => {
	const {
		comments,
		addReply,
		addNewComment,
		updateComment,
		deleteComment,
		upVoteComment,
		downVoteComment
	} = useComments();

	return (
		<>
			<ul className='comments_list'>
				{comments.map((comment) => (
					<Comment
						key={comment.id}
						comment={comment}
						onReply={addReply}
						onUpdate={updateComment}
						onDelete={deleteComment}
						onUpVote={upVoteComment}
						onDownVote={downVoteComment}
					/>
				))}
			</ul>
			<Form onSubmit={addNewComment} />
		</>
	);
};

export default CommentsList;
