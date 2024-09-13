import { currentUser } from '../../data.json';
import FormButton from '../FormButton';
import Textarea from '../Textarea';
import './styles.css';

const Form = ({ label = 'SEND', onSubmit, className = '', currentText }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!e.target.content.value) return;

		onSubmit({ content: e.target.content.value });
		e.target.content.style.height = 0;
		e.target.reset();
	};

	return (
		<div className={`form-container ${className}`}>
			<form onSubmit={handleSubmit} className={`form`}>
				<img src={currentUser.image.webp} alt='User Image' />
				<Textarea
					value={currentText}
					placeholder={label === 'SEND' ? 'Add a comment...' : 'Add a reply...'}
				/>
				<FormButton>{label}</FormButton>
			</form>
		</div>
	);
};

export default Form;
