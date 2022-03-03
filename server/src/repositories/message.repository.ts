import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RealtimeDatabaseDataSource} from '../datasources';
import {Message, MessageRelations} from '../models';

export class MessageRepository extends DefaultCrudRepository<
  Message,
  typeof Message.prototype.id,
  MessageRelations
> {
  constructor(
    @inject('datasources.realtime_database') dataSource: RealtimeDatabaseDataSource,
  ) {
    super(Message, dataSource);
  }
}
