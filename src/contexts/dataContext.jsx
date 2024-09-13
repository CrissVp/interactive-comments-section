import { createContext, useReducer } from 'react';
import data from '../data.json';

const DataContext = createContext();

const commentsReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_COMMENT': {
			return [
				{
					score: 0,
					replies: [],
					content: action.content,
					user: data.currentUser,
					createdAt: new Date(),
					id: crypto.randomUUID()
				},
				...state
			];
		}
		case 'ADD_REPLY': {
			return state.map((comment) =>
				comment.id !== action.commentId
					? comment
					: {
							...comment,
							replies: [
								...comment.replies,
								{
									score: 0,
									user: data.currentUser,
									content: action.content,
									createdAt: new Date(),
									id: crypto.randomUUID(),
									replyingTo: comment.user.username
								}
							]
					  }
			);
		}
		case 'UPDATE': {
			// Update reply
			if (action.replyId) {
				return state.map((comment) =>
					comment.id !== action.commentId
						? comment
						: {
								...comment,
								replies: comment.replies.map((reply) =>
									reply.id !== action.replyId
										? reply
										: {
												...reply,
												content: action.content
										  }
								)
						  }
				);
			}

			// Update comment
			return state.map((comment) =>
				comment.id !== action.commentId
					? comment
					: {
							...comment,
							content: action.content
					  }
			);
		}
		case 'DELETE': {
			// Delete reply
			if (action.replyId) {
				return state.map((comment) =>
					comment.id !== action.commentId
						? comment
						: {
								...comment,
								replies: comment.replies.filter((reply) => reply.id !== action.replyId)
						  }
				);
			}

			// Delete comment
			return state.filter((comment) => comment.id !== action.commentId);
		}
		case 'UPVOTE': {
			// Add upvote to reply
			if (action.replyId) {
				return state.map((comment) =>
					comment.id !== action.commentId
						? comment
						: {
								...comment,
								replies: comment.replies.map((reply) =>
									reply.id !== action.replyId
										? reply
										: {
												...reply,
												score: reply.score + 1
										  }
								)
						  }
				);
			}

			// Add upvote to comment
			return state.map((comment) =>
				comment.id !== action.commentId
					? comment
					: {
							...comment,
							score: comment.score + 1
					  }
			);
		}
		case 'DOWNVOTE': {
			// Add downvote to reply
			if (action.replyId) {
				return state.map((comment) =>
					comment.id !== action.commentId
						? comment
						: {
								...comment,
								replies: comment.replies.map((reply) =>
									reply.id !== action.replyId
										? reply
										: {
												...reply,
												score: reply.score - 1
										  }
								)
						  }
				);
			}

			// Add downvote to comment
			return state.map((comment) =>
				comment.id !== action.commentId
					? comment
					: {
							...comment,
							score: comment.score - 1
					  }
			);
		}
	}
};

export const DataContextProvider = ({ children }) => {
	const { comments: initialComments } = data;

	const savedComments = localStorage.getItem('comments');

	const [comments, dispatch] = useReducer(
		commentsReducer,
		JSON.parse(savedComments) || initialComments
	);

	return <DataContext.Provider value={{ comments, dispatch }}>{children}</DataContext.Provider>;
};

export default DataContext;
