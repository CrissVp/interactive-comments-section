import './styles.css';

const DeleteModal = ({ visible, onCancel, onDelete }) => {
	return (
		<dialog open={visible} className='modal'>
			<div className='modal__content'>
				<h2>Delete Comment</h2>
				<p>
					Are you sure you want to delete this comment? This will remove the comment and can&apos;t
					be undone.
				</p>
				<div className='modal__butons'>
					<button className='modal__btn' onClick={onCancel}>
						NO, CANCEL
					</button>
					<button className='modal__btn modal__btn--delete' onClick={onDelete}>
						YES, DELETE
					</button>
				</div>
			</div>
		</dialog>
	);
};

export default DeleteModal;
