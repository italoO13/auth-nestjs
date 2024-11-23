import { Module } from '@nestjs/common';
import { provideTypeOrm } from './database.providers';

@Module({
  providers: [provideTypeOrm],
  exports: [provideTypeOrm],
})
export class DataBaseCore {}
