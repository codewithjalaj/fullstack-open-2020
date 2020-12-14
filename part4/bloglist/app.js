const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

// Models
const blog = require('./models/Blog');
// Routers
const blogsRouter = require('./controllers/blogs');

const app = express();

logger.info(`Connecting to MongoDB...`);
mongoose
	.connect(config.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		logger.info(`Connected to MongoDB`);
	})
	.catch((error) => {
		logger.error('Error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
