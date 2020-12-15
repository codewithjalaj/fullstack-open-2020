const { accessSync } = require('fs');

const dummy = (blog) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((acc, item) => {
		return acc + item.likes;
	}, 0);
};

const favouriteBlog = (blogs) => {
	return blogs.reduce((acc, item) => {
		return acc.likes > item.likes ? acc : item;
	}, {});
};

const mostBlogs = (blogs) => {
	const result = blogs.reduce((acc, blog) => {
		acc[blog.author] = acc[blog.author] || 0;
		acc[blog.author] = acc[blog.author] + 1;
		return acc;
	}, {});

	const result2 = Object.entries(result).reduce((acc, item) => {
		acc.push({ author: item[0], blogs: item[1] });
		return acc;
	}, []);

	return result2.reduce((acc, item) => {
		return acc.blogs > item.blogs ? acc : item;
	}, 0);
};

const mostLikes = (blogs) => {
	const result = blogs.reduce((acc, blog) => {
		acc[blog.author] = acc[blog.author] || 0;
		acc[blog.author] += blog.likes;
		return acc;
	}, {});

	return Object.entries(result)
		.map((item) => {
			return { author: item[0], likes: item[1] };
		})
		.reduce((acc, item) => {
			return acc.likes > item.likes ? acc : item;
		}, 0);
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
