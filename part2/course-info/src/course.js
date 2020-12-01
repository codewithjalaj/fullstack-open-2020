import React from 'react';

const Header = ({ name }) => {
	return <h1>{name}</h1>;
};

const Part = ({ name, exercises }) => {
	return (
		<p>
			{name} {exercises}
		</p>
	);
};

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => {
				return <Part key={part.id} name={part.name} exercises={part.exercises} />;
			})}
		</>
	);
};

const Total = ({ parts }) => {
	const total = parts.reduce((acc, item) => (acc += item.exercises), 0);

	return <strong>Number of exercises: {total}</strong>;
};

const Course = ({ courses }) => {
	return courses.map((course) => {
		return (
			<div key={course.id}>
				<Header name={course.name} />
				<Content parts={course.parts} />
				<Total parts={course.parts} />
			</div>
		);
	});
};

export default Course;
