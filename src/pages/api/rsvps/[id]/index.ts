import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { rsvpValidationSchema } from 'validationSchema/rsvps';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.rsvp
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getRsvpById();
    case 'PUT':
      return updateRsvpById();
    case 'DELETE':
      return deleteRsvpById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRsvpById() {
    const data = await prisma.rsvp.findFirst(convertQueryToPrismaUtil(req.query, 'rsvp'));
    return res.status(200).json(data);
  }

  async function updateRsvpById() {
    await rsvpValidationSchema.validate(req.body);
    const data = await prisma.rsvp.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteRsvpById() {
    const data = await prisma.rsvp.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
