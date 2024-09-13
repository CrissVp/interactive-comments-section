import './styles.css';

const IconButton = ({ variant, onClick, children }) => {
	return (
		<button onClick={onClick} className={`btn btn--${variant}`}>
			<div className={'icon'}></div>
			{children}
		</button>
	);
};

export default IconButton;
