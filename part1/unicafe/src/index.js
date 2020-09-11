import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Title = ({ title }) => {
	return <h1>{title}</h1>;
};

const Button = ({ title, handleClick }) => {
	return <button onClick={handleClick}>{title}</button>;
};

const Statistic = ({ title, value }) => {
	return (
		<tr>
			<td>{title}</td>
			<td> </td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({ feedback }) => {
	const total = feedback.good + feedback.bad + feedback.neutral;
	const good = feedback.good;
	const bad = feedback.bad;
	const neutral = feedback.neutral;
	const average = (feedback.good - feedback.bad) / total;
	const positive = (feedback.good / total) * 100;

	if (feedback.good || feedback.bad || feedback.neutral) {
		return (
			<>
				<table>
					<tbody>
						<Statistic title="good" value={good} />
						<Statistic title="neutral" value={neutral} />
						<Statistic title="bad" value={bad} />
						<Statistic title="all" value={total} />
						<Statistic title="average" value={average} />
						<Statistic title="postive" value={positive} />
					</tbody>
				</table>
			</>
		);
	} else {
		return <p>No Feedback Given</p>;
	}
};

const App = () => {
	const [feedback, setFeedback] = useState({
		good: 0,
		neutral: 0,
		bad: 0,
	});

	const handleClick = (type) => {
		console.log('clicked', type);
		setFeedback({ ...feedback, [type]: feedback[type] + 1 });
	};

	return (
		<>
			<Title title="Give Feedback" />
			<Button title="good" handleClick={() => handleClick('good')} />
			<Button title="neutral" handleClick={() => handleClick('neutral')} />
			<Button title="bad" handleClick={() => handleClick('bad')} />
			<Title title="Statistics" />
			<Statistics feedback={feedback} />
		</>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
