import Uuid from "../../../shared/domain/Uuid";
import GeniallyName from "./values/GeniallyName";
import GeniallyDescription from "./values/GeniallyDescription";
import GeniallyCreated from "./events/GeniallyCreated";
import AggregateRoot from "../../../shared/domain/AggregateRoot";

export default class Genially extends AggregateRoot {
  private _id: Uuid;
  private _name: GeniallyName;
  private _description: GeniallyDescription;
  private _createdAt: Date;
  private _modifiedAt: Date;
  private _deletedAt: Date;

  constructor(
      id: Uuid,
      name: GeniallyName,
      description: GeniallyDescription,
      createdAt: Date,
      modifiedAt?: Date,
      deletedAt?: Date,
  ) {
    super();
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = createdAt;
    this._modifiedAt = modifiedAt;
    this._deletedAt = deletedAt;
  }

  get id(): Uuid {
    return this._id;
  }

  get name(): GeniallyName {
    return this._name;
  }

  get description(): GeniallyDescription {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

    /**
     * Factory method to help us control the Genially creation
     * For example, in this case, moving the date here rather than doing new Date() within the constructor
     * will make it easier for us to create Geniallys in the past, if needed for testing
     * @param {Uuid} id
     * @param {GeniallyName} name
     * @param {GeniallyDescription} description
     */
  static create(id: Uuid, name: GeniallyName, description: GeniallyDescription) {
      const genially = new Genially(id, name, description, new Date());
      genially.registerEvent(
          new GeniallyCreated({
              id: genially.id.value,
              createdAt: genially.createdAt.getTime()
          })
      );
      return genially;
  }

  updateName(newName: GeniallyName) {
    this._name = newName;
    this._modifiedAt = new Date();
    // NOTE: no one is interested in knowing this, so no event needed here
  }

  delete() {
    this._deletedAt = new Date();
      // NOTE: no one is interested in knowing this, so no event needed here
  }
}
