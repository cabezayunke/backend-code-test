import { Response, Request } from "express";
import GeniallyRepository from "../../contexts/core/genially/domain/GeniallyRepository";
import RenameGeniallyService, {RenameGeniallyServiceRequest} from "../../contexts/core/genially/application/RenameGeniallyService";
import Uuid from "../../contexts/shared/domain/Uuid";
import GeniallyName from "../../contexts/core/genially/domain/values/GeniallyName";

export const renameGeniallyController = (repository: GeniallyRepository) => async (req: Request, res: Response) => {
    const service = new RenameGeniallyService(repository);
    const data = {
        id: req.params.id,
        newName: req.body.newName,
    };
    // we delegate the validation in our value objects
    // so we can reuse it in either the infrastructure our within the domain
    await service.execute({
        id: new Uuid(data.id),
        newName: new GeniallyName(data.newName),
    } as RenameGeniallyServiceRequest);
    // if we are thinking about introducing CQRS with async commands
    // it is probably a good idea to NOT return anything here
    // because that is what it will happen in that case
    res.status(200).send();
};
