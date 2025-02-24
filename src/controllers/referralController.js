const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getReferrals = async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany();
    res.json(referrals);
  } catch (error) {
    console.error('Error fetching referrals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createReferral = async (req, res) => {
  const { name, email, referredBy } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const referral = await prisma.referral.create({
      data: { name, email, referredBy },
    });
    res.status(201).json(referral);
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getReferrals, createReferral };