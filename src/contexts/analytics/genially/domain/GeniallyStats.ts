
import AggregateRoot from "../../../shared/domain/AggregateRoot";
import StatsCount from "../../shared/domain/StatsCount";

export default class GeniallyStats extends AggregateRoot {
  private _count: StatsCount;

  constructor(count: StatsCount) {
    super();
    this._count = count;
  }

  get count(): StatsCount {
    return this._count;
  }

  static create(count: StatsCount) {
      return new GeniallyStats(count);
  }

  increase() {
    this._count.increase();
  }

}
