import GeniallyStats from "../domain/GeniallyStats";
import GeniallyStatsRepository from "../domain/GeniallyStatsRepository";
import StatsCount from "../../shared/domain/StatsCount";

export default class InMemoryGeniallyStatsRepository implements GeniallyStatsRepository {
  private count: number;

  constructor() {
    this.count = 0;
  }

  async save(stats: GeniallyStats): Promise<void> {
    this.count = stats.count.value;
  }

  async find(): Promise<GeniallyStats> {
    return GeniallyStats.create(
        new StatsCount(this.count)
    );
  }

}
