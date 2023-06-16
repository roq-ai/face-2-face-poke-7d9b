import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { pokerMatchValidationSchema } from 'validationSchema/poker-matches';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.poker_match
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPokerMatchById();
    case 'PUT':
      return updatePokerMatchById();
    case 'DELETE':
      return deletePokerMatchById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPokerMatchById() {
    const data = await prisma.poker_match.findFirst(convertQueryToPrismaUtil(req.query, 'poker_match'));
    return res.status(200).json(data);
  }

  async function updatePokerMatchById() {
    await pokerMatchValidationSchema.validate(req.body);
    const data = await prisma.poker_match.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePokerMatchById() {
    const data = await prisma.poker_match.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
