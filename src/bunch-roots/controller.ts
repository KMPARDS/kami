import { Router } from 'express';
import { computeBunchProposal } from './helper';

export const router = Router();

router.get('/generate', async (req, res) => {
  const startBlockNumber: number = +req.query.startBlockNumber;
  const bunchDepth: number = +req.query.bunchDepth;

  console.log({ startBlockNumber, bunchDepth });

  // return res.json({ hi: 'hi' });

  const bunchProposal = await computeBunchProposal(
    startBlockNumber,
    bunchDepth
  );

  res.json(bunchProposal);
});
