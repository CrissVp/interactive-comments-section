import DataContext from '../contexts/dataContext';
import { useCallback, useContext, useEffect } from 'react';

const useComments = () => {
	const { comments, dispatch } = useContext(DataContext);

	useEffect(() => {
		localStorage.setItem('comments', JSON.stringify(comments));
	}, [comments]);

	const addNewComment = useCallback(
		({ content }) => {
			dispatch({ type: 'ADD_COMMENT', content });
		},
		[dispatch]
	);

	const addReply = useCallback(
		({ content, commentId }) => {
			dispatch({ type: 'ADD_REPLY', commentId, content });
		},
		[dispatch]
	);

	const updateComment = useCallback(
		({ content, commentId, replyId }) => {
			dispatch({ type: 'UPDATE', content, commentId, replyId });
		},
		[dispatch]
	);

	const deleteComment = useCallback(
		({ commentId, replyId }) => {
			dispatch({ type: 'DELETE', commentId, replyId });
		},
		[dispatch]
	);

	const upVoteComment = useCallback(
		({ commentId, replyId }) => {
			dispatch({ type: 'UPVOTE', commentId, replyId });
		},
		[dispatch]
	);

	const downVoteComment = useCallback(
		({ commentId, replyId }) => {
			dispatch({ type: 'DOWNVOTE', commentId, replyId });
		},
		[dispatch]
	);

	return {
		comments: comments.sort((a, b) => a.score - b.score),
		addNewComment,
		addReply,
		updateComment,
		deleteComment,
		upVoteComment,
		downVoteComment
	};
};

export default useComments;
