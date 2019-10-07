const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.post('/', (req, res) => {
	const accData = req.body;
	!accData.name || !accData.budget
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
		.from('accounts')
		.where('id', '=', id)
		.first()
		.then((account) => {
			!account ? res.status(404).json({ error: 'id does not exist' }) : res.json(account);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	db('accounts')
		.where('id', '=', id)
		.del()
		.then((account) => {
			!account ? res.status(400).json({ error: 'id does not exist' }) : res.status(200).json(account);
		})
		.catch(() => {
			res.status(500).json({ error: 'could not delete' });
		});
});

router.put('/:id', (req, res) => {
	const update = req.body;
	const id = req.params.id;
	!update.name || !update.budget
		? res.status(400).json({ error: 'Include name and budget' })
		: db('accounts')
				.where({ id })
				.update(update)
				.then((account) => {
                    (!account) ? res.status(400).json({ error: 'id does not exist' }) :
					res.status(200).json(account);
				})
				.catch((err) => {
					res.status(500).json(err);
				});
});

module.exports = router;
