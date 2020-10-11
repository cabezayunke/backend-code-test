
import DomainEventSubscriber from "../../contexts/shared/domain/DomainEventSubscriber";
import GeniallyStatsRepository from "../../contexts/analytics/genially/domain/GeniallyStatsRepository";
import IncreaseGeniallyCreatedStatsService from "../../contexts/analytics/genially/application/IncreaseGeniallyCreatedStats";
import DomainEvent from "../../contexts/shared/domain/DomainEvent";

export default class AnalyticsOnGeniallyCreatedSubscriber implements DomainEventSubscriber {

    constructor(private repository: GeniallyStatsRepository)

    async consume(event: DomainEvent): Promise<void> {
        const service = new IncreaseGeniallyCreatedStatsService(this.repository);
        // NOTE:
        // this is  simple case where we not need the event contents
        // but we could pass the event contents to the service here when needed
        await service.execute();
        return null;
    }
}

