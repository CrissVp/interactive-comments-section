import './styles.css';

const FormButton = ({ children, onClick }) => {
	return (
		<button className='form__btn' onClick={onClick}>
			{children}
		</button>
	);
};

export default FormButton;
