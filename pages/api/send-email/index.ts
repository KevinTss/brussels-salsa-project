import type { NextApiRequest, NextApiResponse } from 'next';
import mailjet from 'node-mailjet';

const MAILJET_TEMPLATE_ID_CLASS_JOINED_EN = 3329921;

let mailjetConnection: any | null = null;
if (
  process.env.NEXT_PUBLIC_MAILJET_API_KEY &&
  process.env.NEXT_PUBLIC_MAILJET_API_SECRET
) {
  mailjetConnection = mailjet.connect(
    process.env.NEXT_PUBLIC_MAILJET_API_KEY as string,
    process.env.NEXT_PUBLIC_MAILJET_API_SECRET as string
  );
}

type ResponseObject = {
  message: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<ResponseObject>) => {
  if (!mailjetConnection) {
    res.status(500).json({ message: 'Not initialized' });
    return;
  }

  if (req.method !== 'POST') {
    res.status(401).json({ message: 'Method not allowed' });
    return;
  }

  const parsedBody = JSON.parse(req.body);

  if (!parsedBody.firstName || !parsedBody.date || !parsedBody.mailTo) {
    res.status(500).json({ message: 'Payload not valid' });
    return;
  }

  if (!['http://localhost:3000'].includes(req?.headers?.origin || '')) {
    res.status(500).json({ message: 'Something was wrong' });
    return;
  }

  mailjetConnection
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'kevin.tassi+salsa@gmail.com',
            Name: 'Brussels Salsa Project',
          },
          To: [
            {
              Email: parsedBody.mailTo,
              Name: parsedBody.firstName,
            },
          ],
          TemplateID: MAILJET_TEMPLATE_ID_CLASS_JOINED_EN,
          TemplateLanguage: true,
          Subject: `Hey {{var:firstname:"you"}},💃 you just subscribe to a Salsa class!`,
          Variables: {
            firstname: parsedBody.firstName,
            date: parsedBody.date,
          },
        },
      ],
    })
    .then((_result: any) => {
      res
        .status(200)
        .json({ message: `Message sent to ${parsedBody.firstName}` });
    })
    .catch((err: any) => {
      res.status(500).json({ message: err.message });
    });
};

export default handler;
