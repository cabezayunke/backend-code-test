import GeniallyStats from "./GeniallyStats";

interface GeniallyStatsRepository {
  save(stats: GeniallyStats): Promise<void>;

  find(): Promise<GeniallyStats>;
}

export default GeniallyStatsRepository;
