const express = require('express');
const userDb = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
	// do your magic!
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
	// do your magic!
});

router.get('/', (req, res) => {
	userDb
		.get()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res.status(500).json({ error: 'Could not retrieve users data.', error });
		});
});

router.get('/:id', validateUserId, (req, res) => {
	userDb
		.getById(req.params.id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(error => {
			res.status(500).json({
				error: 'There was an issue with retrieving the user ID.',
				error
			});
		});
});

router.get('/:id/posts', validateUserId, (req, res) => {
	// do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
	// do your magic!
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
	// do your magic!
});

//custom middleware
function validateUserId(req, res, next) {
	const id = req.params.id;

	if (!id) {
		res.status(400).json({ error: 'Must include user ID in URL.' });
	} else {
		userDb
			.getById(id)
			.then(user => {
				if (user === undefined) {
					res.status(400).json({ error: 'User does not exist.' });
				} else {
					next();
				}
			})
			.catch(error => {
				res.status(500).json({
					error: 'There was an issue with retrieving the user ID.',
					error
				});
			});
	}
}

function validateUser(req, res, next) {
	const body = req.body;
	const name = req.body.name;

	if (!body) {
		res.status(400).json({ error: 'Missing user data.' });
	} else if (!name) {
		res.status(400).json({ error: 'Missing required name field.' });
	} else {
		next();
	}
}

function validatePost(req, res, next) {
	const body = req.body;
	const text = req.body.text;

	if (!body) {
		res.status(400).json({ error: 'Missing post data.' });
	} else if (!text) {
		res.status(400).json({ error: 'Missing required text field.' });
	} else {
		next();
	}
}

module.exports = router;
