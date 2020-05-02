import { Router } from 'express';
import { computeBunchProposal } from './helper';
import { t, validate } from '../type-validation';

export const router = Router();

router.get('/generate', async (req, res) => {
  const startBlockNumber: number = +req.query.startBlockNumber;
  const bunchDepth: number = +req.query.bunchDepth;

  // throw error if the types are not numbers
  validate(startBlockNumber, t.number);
  validate(bunchDepth, t.number);

  const bunchProposal = await computeBunchProposal(
    startBlockNumber,
    bunchDepth
  );

  res.json(bunchProposal);
});
