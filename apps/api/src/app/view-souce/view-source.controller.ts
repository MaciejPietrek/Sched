import {
  Controller,
  UseGuards,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, FilterQuery, UpdateQuery, Schema } from 'mongoose';
import { GenericRepo } from '../auth/generic-repo';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { IViewSource } from '../schemes/view-source.schema';

@Controller('viewSource')
export class ViewSourceController {
  constructor(
    @InjectModel('ViewSource') private readonly viewSource: Model<IViewSource>,
    @InjectConnection() private connection: Connection
  ) {}

  private readonly repo = new GenericRepo(this.viewSource);

  @UseGuards(JwtAuthGuard)
  @Get('getByName/:name')
  async getByName(@Param() param: { name: string }) {
    const document = await this.repo.findOneByField('name', param.name);
    const object = await document?.toObject();
    if (!object)
      throw new NotFoundException({
        message: 'Datasource not found',
        description: `Datasource by the name '${param.name}' could not be found`,
      });
    return { data: object };
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  async getAll() {
    const document = await this.repo.getAll();
    if (!document)
      throw new NotFoundException({
        message: 'Datasource not found',
        description: `Datasource could not be found`,
      });
    return { data: document };
  }

  @UseGuards(JwtAuthGuard)
  @Get('getByID/:ID')
  async getByID(@Param() param: { ID: string }) {
    const document = await this.repo.findOneByField('_id', param.ID);
    const object = await document?.toObject();
    if (!object)
      throw new NotFoundException({
        message: 'Datasource not found',
        description: `Datasource of the ID '${param.ID}' could not be found`,
      });
    return { data: object };
  }

  @UseGuards(JwtAuthGuard)
  @Post('data/all')
  async all(@Body() body: IViewSource) {
    const model = this.getModel(body);
    const result = await model.find().exec();
    if (!result)
      throw new NotFoundException({
        message: 'Dataset not found',
        description: `Dataset for the datasource '${body.name}' could not be found`,
      });
    return { data: result };
  }

  @UseGuards(JwtAuthGuard)
  @Get('data/find')
  async find(@Body() body: { source: IViewSource; filter: FilterQuery<any> }) {
    const model = this.getModel(body.source);
    const result = await model.find(body.filter);
    if (!result)
      throw new NotFoundException({
        message: 'Data not found',
        description: `Data for the datasource '${body.source.name}' could not be found`,
      });
    return { data: result };
  }

  @UseGuards(JwtAuthGuard)
  @Get('data/findById')
  async findById(@Body() body: { source: IViewSource; ID: string }) {
    const model = this.getModel(body.source);
    const result = await model.findById(body.ID);
    if (!result)
      throw new NotFoundException({
        message: 'Data not found',
        description: `Data for the datasource '${body.source.name}' could not be found`,
      });
    return { data: result };
  }

  @UseGuards(JwtAuthGuard)
  @Get('data/findOne')
  async findOne(
    @Body() body: { source: IViewSource; filter: FilterQuery<any> }
  ) {
    const model = this.getModel(body.source);
    const result = await model.findOne(body.filter);
    if (!result)
      throw new NotFoundException({
        message: 'Data not found',
        description: `Data for the datasource '${body.source.name}' could not be found`,
      });
    return { data: result };
  }

  @UseGuards(JwtAuthGuard)
  @Get('data/findByIdAndDelete')
  async findByIdAndDelete(@Body() body: { source: IViewSource; ID: string }) {
    const model = this.getModel(body.source);
    const result = await model.findByIdAndDelete(body.ID);
    if (!result)
      throw new NotFoundException({
        message: 'Data not found',
        description: `Data for the datasource '${body.source.name}' could not be found`,
      });
    return { data: result };
  }

  @UseGuards(JwtAuthGuard)
  @Get('data/findByIdAndRemove')
  async findByIdAndRemove(@Body() body: { source: IViewSource; ID: string }) {
    const model = this.getModel(body.source);
    const result = await model.findByIdAndRemove(body.ID);
    if (!result)
      throw new NotFoundException({
        message: 'Data not found',
        description: `Data for the datasource '${body.source.name}' could not be found`,
      });
    return { data: result };
  }

  @UseGuards(JwtAuthGuard)
  @Post('data/findByIdAndUpdate')
  async findByIdAndUpdate(
    @Body() body: { source: IViewSource; ID: string; update: UpdateQuery<any> }
  ) {
    const model = this.getModel(body.source);
    const result = await model.findByIdAndUpdate(body.ID, body.update);
    if (!result)
      throw new NotFoundException({
        message: 'Data not found',
        description: `Data for the datasource '${body.source.name}' could not be found`,
      });
    return { data: result };
  }

  private getModel(source: IViewSource) {
    return (
      this.connection.models[source.options.collection] ??
      this.createModel(source)
    );
  }

  private createModel(source: IViewSource) {
    return this.connection.model(
      source.options.collection,
      this.createSchema(source)
    );
  }

  private createSchema(source: IViewSource) {
    const isValid = this.validateStructure(source);
    const structure = isValid ? source.structure : ({} as any);
    return new Schema(structure, source.options);
  }

  private validateStructure(source: IViewSource) {
    const structure = source.structure;
    if (!structure) return false;
    if (typeof structure != 'object') return false;
    if (Object.keys(structure).length == 0) return false;
    return true;
  }
}
