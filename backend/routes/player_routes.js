import express from 'express';
import Player from '../models/player.js';

const router = express.Router();

// Get all players
router.get('/', async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

// Create a new player
router.post('/', async (req, res) => {
  const { name, position } = req.body;
  const player = new Player({ name, position });
  await player.save();
  res.status(201).json(player);
});

// Update a player
router.put('/:id', async (req, res) => {
  const { name, position } = req.body;
  const player = await Player.findByIdAndUpdate(req.params.id, { name, position }, { new: true });
  res.json(player);
});

// Delete a player
router.delete('/:id', async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.json({ message: 'Player deleted' });
});

export default router;
