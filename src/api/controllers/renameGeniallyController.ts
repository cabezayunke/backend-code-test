import { Response, Request } from "express";

export const createGeniallyController = service => async (req: Request, res: Response) => {
  await service.execute();
  res.status(201).send();
};
