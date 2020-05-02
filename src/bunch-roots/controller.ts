import { Router } from 'express';
import { computeBunchProposal } from './helper';
import { t, validate } from '../type-validation';

export const router = Router();

router.get('/generate', async (req, res, next) => {
  const startBlockNumber: number = +req.query.startBlockNumber;
  const bunchDepth: number = +req.query.bunchDepth;

  // throw error if the types are not numbers
  const valid: boolean =
    validate(startBlockNumber, t.number, next) &&
    validate(bunchDepth, t.number, next);

  // stop function execution if error
  if (!valid) return;

  const bunchProposal = await computeBunchProposal(
    startBlockNumber,
    bunchDepth
  );

  res.json(bunchProposal);
});
