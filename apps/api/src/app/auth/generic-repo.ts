import { Model } from 'mongoose';

export class GenericRepo<RepoType> {
  constructor(public model: Model<RepoType>) {}

  async getByID(ID: string) {
    return await this.model.findById(ID).exec();
  }

  async getByIDs(IDs: string[]) {
    return await this.model.find({ id: { $in: IDs } }).exec();
  }

  async create(object: RepoType) {
    return await this.model.create(object);
  }

  async findOneByField(field: string, value: any) {
    const query = { [field]: { $eq: value } };
    //@ts-ignore
    return await this.model.findOne(query).exec();
  }

  async findOneByFields(entries: [string, any][]) {
    const query = {};
    entries.forEach((entry) => (query[entry[0]] = { $eq: entry[1] }));
    //@ts-ignore
    return await this.model.findOne(query).exec();
  }

  async findByField(field: string, value: any) {
    const query = { [field]: { $eq: value } };
    //@ts-ignore
    return await this.model.find(query).exec();
  }

  async findByFields(entries: [string, any][]) {
    const query = {};
    entries.forEach((entry) => (query[entry[0]] = { $eq: entry[1] }));
    //@ts-ignore
    return await this.model.find(query).exec();
  }

  async removeByID(ID: string) {
    return await this.model.remove({ _id: { $eq: ID } }).exec();
  }
}
