const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.post('/', (req, res) => {
    const accData = req.body;
    (!accData.name || !accData.budget)
		? res.status(400).json({ error: 'Include name and budget' })
		: db('accounts')
				.insert(accData, 'id')
				.then((account) => {
					res.status(200).json(account);
				})
				.catch((err) => {
					res.status(500).json(err);
				});
});

router.get('/', (req, res) => {
	db('accounts')
		.then((account) => {
			res.status(200).json(account);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	db
		.select('*')
		.from('posts')
		.where('id', id)
		.then((account) => {
			res.status(200).json(account);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});


module.exports = router;
