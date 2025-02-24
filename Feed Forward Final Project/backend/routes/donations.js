const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: String,
  foodType: String,
  quantity: Number,
  contact: String,
  expiryTime: Number,
  rewardPoints: { type: Number, default: 10 }
});

const Donation = mongoose.model('Donation', donationSchema);

// GET all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).json({ message: 'Error fetching donations' });
  }
});

// POST a new donation
router.post('/', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.json({ message: 'Donation Registered! Bless you for your generosity!', donation });
  } catch (err) {
    console.error('Error saving donation:', err);
    res.status(500).json({ message: 'Error saving donation' });
  }
});

// PUT (Update) donation
router.put('/:id', async (req, res) => {
  try {
    const updatedDonation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json({ message: 'Donation updated successfully!', updatedDonation });
  } catch (err) {
    console.error('Error updating donation:', err);
    res.status(500).json({ message: 'Error updating donation' });
  }
});

// DELETE a donation
router.delete('/:id', async (req, res) => {
  try {
    const deletedDonation = await Donation.findByIdAndDelete(req.params.id);
    if (!deletedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json({ message: 'Donation deleted successfully!' });
  } catch (err) {
    console.error('Error deleting donation:', err);
    res.status(500).json({ message: 'Error deleting donation' });
  }
});

// GET total rewards
router.get('/rewards/total', async (req, res) => {
  try {
    const donations = await Donation.find();
    const totalPoints = donations.reduce((sum, donation) => sum + (donation.rewardPoints || 0), 0);
    res.json({ totalPoints });
  } catch (err) {
    console.error('Error calculating rewards:', err);
    res.status(500).json({ message: 'Error calculating rewards' });
  }
});

module.exports = router;