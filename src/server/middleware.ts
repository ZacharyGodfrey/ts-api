import { NextFunction, Request, Response } from 'express';
import * as uuid from 'uuid';

export const cors = (req: Request, res: Response, next: NextFunction) => {
  // Allow CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');

  // Remove headers that leak information
  res.removeHeader('x-powered-by');

  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
};

export const addRequestId = (req: Request, _: Response, next: NextFunction) => {
  (req as any).requestId = uuid.v4();

  next();
};

export const logRequest = (req: Request, _: Response, next: NextFunction) => {
  console.log({
    type: 'HTTP Request Received',
    time: new Date().toISOString(),
    uuid: uuid.v4(),
    data: {
      requestId: (req as any).requestId,
      host: req.hostname,
      path: req.path,
      urlParams: req.params,
      queryParams: req.query,
      cookies: req.signedCookies,
      body: req.body,
    },
  });

  next();
};

export const logResponse = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  onBody(res, (body: string) => {
    console.log({
      type: 'HTTP Response Sent',
      time: new Date().toISOString(),
      uuid: uuid.v4(),
      data: {
        requestId: (req as any).requestId,
        status: res.statusCode,
        body,
      },
    });
  });

  next();
};

const onBody = (res: Response, action: (body: string) => void) => {
  const oldWrite = res.write;
  const oldEnd = res.end;
  const chunks: Buffer[] = [];

  (res.write as unknown) = function (chunk: any) {
    chunks.push(Buffer.from(chunk));

    (oldWrite as Function).apply(res, arguments);
  };

  res.end = function (chunk: any) {
    if (chunk) {
      chunks.push(Buffer.from(chunk));
    }

    action(Buffer.concat(chunks).toString('utf8'));

    (oldEnd as Function).apply(res, arguments);
  };
};

export const logError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  next();
};
