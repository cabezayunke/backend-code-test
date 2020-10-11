import { Response, Request } from "express";
import GeniallyRepository from "../../contexts/core/genially/domain/GeniallyRepository";
import DeleteGeniallyService, {DeleteGeniallyServiceRequest} from "../../contexts/core/genially/application/DeleteGeniallyService";
import Uuid from "../../contexts/shared/domain/Uuid";

export const createGeniallyController = (repository: GeniallyRepository) => async (req: Request, res: Response) => {
    const service = new DeleteGeniallyService(repository);
    const { id } = req.params;
    await service.execute({
        id: new Uuid(id),
    } as DeleteGeniallyServiceRequest);
    res.status(204).send();
};
