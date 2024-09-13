import { currentUser } from '../../data.json';
import { getTimeAgo } from '../../lib/utils';
import { useState } from 'react';

import DeleteModal from '../DeleteModal';
import IconButton from '../IconButton';
import Replies from '../Replies';
import Form from '../Form';
import './styles.css';

const Comment = ({ comment, onReply, onUpdate, onDelete, onUpVote, onDownVote }) => {
	const [replying, setReplying] = useState(false);
	const [editing, setEditing] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const timeAgo = getTimeAgo(comment.createdAt) || comment.createdAt;

	const addReply = ({ content }) => {
		onReply({ content, commentId: comment.id });
		setReplying(false);
	};

	const updateComment = ({ content }) => {
		onUpdate({
			content,
			commentId: comment.replyingToId || comment.id,
			replyId: comment.replyingToId ? comment.id : null
		});
		setEditing(false);
	};

	const deleteComment = () => {
		onDelete({
			commentId: comment.replyingToId || comment.id,
			replyId: comment.replyingToId ? comment.id : null
		});
		setDeleting(false);
	};

	const upVote = () => {
		onUpVote({
			commentId: comment.replyingToId || comment.id,
			replyId: comment.replyingToId ? comment.id : null
		});
	};

	const downVote = () => {
		if (comment.score <= 0) return;

		onDownVote({
			commentId: comment.replyingToId || comment.id,
			replyId: comment.replyingToId ? comment.id : null
		});
	};

	return (
		<>
			<li>
				<div className='comment'>
					<div className='comment__author'>
						<img src={comment.user.image.webp} alt='User Image' />
						<span>
							<h4>
								{comment.user.username}
								{comment.user.username === currentUser.username && <span>{'you'}</span>}
							</h4>
							<p>{timeAgo}</p>
						</span>
					</div>
					<div className='comment__content'>
						{!editing ? (
							<p>
								{comment.replyingTo && <span>@{comment.replyingTo}</span>} {comment.content}
							</p>
						) : (
							<Form
								label='UPDATE'
								className='form--update'
								onSubmit={updateComment}
								currentText={comment.content}
							/>
						)}
					</div>
					<div className='comment__votes'>
						<IconButton onClick={upVote} variant={'plus'} />
						<span>{comment.score}</span>
						<IconButton onClick={downVote} variant={'minus'} />
					</div>
					<div className='comment__actions'>
						{comment.user.username === currentUser.username ? (
							<>
								<IconButton onClick={() => setDeleting(!deleting)} variant={'delete'}>
									Delete
								</IconButton>
								<IconButton onClick={() => setEditing(!editing)} variant={'edit'}>
									Edit
								</IconButton>
							</>
						) : (
							!comment.replyingTo && (
								<IconButton onClick={() => setReplying(!replying)} variant={'reply'}>
									Reply
								</IconButton>
							)
						)}
					</div>
				</div>
				<Form
					label='REPLY'
					onSubmit={addReply}
					className={`form--animated ${replying ? 'form--visible' : 'form--hidden'}`}
				/>
				<Replies replyingToId={comment.id} replies={comment.replies} />
			</li>

			<DeleteModal
				visible={deleting}
				onDelete={deleteComment}
				onCancel={() => setDeleting(false)}
			/>
		</>
	);
};

export default Comment;
