import { PrismaClient } from '@prisma/client';
import { sendReferralEmail } from '../services/emailService.js';
import { referralSchema } from '../validators/referralValidator.js';
import logger from '../config/logger.js';

const prisma = new PrismaClient();

export const submitReferral = async (req, res, next) => {
  try {
    const { error, value } = referralSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const { referrerName, referrerEmail, referrerPhone, refereeName, refereeEmail, refereePhone, courseInterest } = value;

    const referral = await prisma.$transaction(async (prisma) => {
      return prisma.referral.create({
        data: { referrerName, referrerEmail, referrerPhone, refereeName, refereeEmail, refereePhone, courseInterest },
      });
    });

    await sendReferralEmail(refereeEmail, courseInterest);

    logger.info(`Referral submitted: ${referral.id}`);
    res.status(201).json({ success: true, data: referral });
  } catch (error) {
    logger.error(`Error in submitReferral: ${error.message}`);
    next(error);
  }
};