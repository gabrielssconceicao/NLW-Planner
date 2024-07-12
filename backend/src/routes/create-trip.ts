import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { getMailClient } from '../lib/mail';
import { dayjs } from '../lib/dayjs';
import nodemailer from 'nodemailer';
import { ClientError } from '../errors/client-error';
import { env } from '../env';

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips',
    {
      schema: {
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
          owner_name: z.string(),
          owner_email: z.string().email(),
          emails_to_invite: z.array(z.string().email()),
        }),
      },
    },
    async (request) => {
      const {
        destination,
        ends_at,
        starts_at,
        owner_email,
        owner_name,
        emails_to_invite,
      } = request.body;

      if (dayjs(starts_at).isBefore(new Date())) {
        throw new ClientError('Invalid trip start date');
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        throw new ClientError('Invalid trip end date');
      }

      const trip = await prisma.trip.create({
        data: {
          destination,
          starts_at,
          ends_at,
          participants: {
            createMany: {
              data: [
                {
                  email: owner_email,
                  name: owner_name,
                  is_owner: true,
                  is_confirmed: true,
                },
                ...emails_to_invite.map((email) => {
                  return { email };
                }),
              ],
            },
          },
        },
      });

      const formattedStartDate = dayjs(starts_at).format('LL');
      const formattedEndtDate = dayjs(ends_at).format('LL');

      const confirmationLink = `${env.API_BASE_URL}/trips/${trip.id}/confirm`;
      const mail = await getMailClient();

      const message = await mail.sendMail({
        from: {
          name: 'Equipe plann.er',
          address: 'vXyDc@plann.er',
        },
        to: {
          name: owner_name,
          address: owner_email,
        },
        subject: `Confirme sua viagem para ${destination}`,
        html: `
          <div style="font-family: sans-serif; font-size: 16px;line-height: 1.6;">
            <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate} até ${formattedEndtDate}</strong></p>
            <br>
            <p>Para confirmar sua viagem, clique no link abaixo:</p>
            <br>
            <p><a href="${confirmationLink}">Confirmar viagem</a></p>
            <br>
            <p>Caso não saiba do que se trata esse email, paneas ignore esse email</p>
          </div>
        `.trim(),
      });

      console.log(nodemailer.getTestMessageUrl(message));

      return {
        tripId: trip.id,
      };
    }
  );
}
