import './styles.css';

const Textarea = ({ placeholder, value }) => {
	const handleAutoGrow = (e) => {
		e.target.style.height = 0;
		e.target.style.height = e.target.scrollHeight + 'px';
	};

	return (
		<textarea
			name='content'
			defaultValue={value}
			onInput={handleAutoGrow}
			className='form__textarea'
			placeholder={placeholder}
		></textarea>
	);
};

export default Textarea;
