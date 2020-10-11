import GeniallyStats from "../domain/GeniallyStats";
import GeniallyStatsRepository from "../domain/GeniallyStatsRepository";


export default class IncreaseGeniallyCreatedStatsService {
  constructor(private repository: GeniallyStatsRepository) {}

  public async execute(): Promise<GeniallyStats> {

    const stats = await this.repository.find();
    stats.increase();

    await this.repository.save(stats);

    return stats;
  }
}
