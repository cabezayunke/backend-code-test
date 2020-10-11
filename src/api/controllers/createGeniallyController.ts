import { Response, Request } from "express";
import CreateGeniallyService, {CreateGeniallyServiceRequest} from "../../contexts/core/genially/application/CreateGeniallyService";
import Uuid from "../../contexts/shared/domain/Uuid";
import GeniallyName from "../../contexts/core/genially/domain/values/GeniallyName";
import GeniallyDescription from "../../contexts/core/genially/domain/values/GeniallyDescription";
import GeniallyRepository from "../../contexts/core/genially/domain/GeniallyRepository";

export const createGeniallyController = (repository: GeniallyRepository) => async (req: Request, res: Response) => {
  const service = new CreateGeniallyService(repository);
  const { id, name, description } = req.body;
  // we delegate the validation in our value objects
  // so we can reuse it in either the infrastructure our within the domain
  await service.execute({
      id: new Uuid(id),
      name: new GeniallyName(name),
      description: new GeniallyDescription(description)
  } as CreateGeniallyServiceRequest);
  // if we are thinking about introducing CQRS with async commands
  // it is probably a good idea to NOT return anything here
  // because that it what it will happen in that case
  res.status(201).send();
};
