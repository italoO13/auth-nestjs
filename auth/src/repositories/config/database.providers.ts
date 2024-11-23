import { DataSource, DataSourceOptions } from 'typeorm';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const provideTypeOrm: Provider = {
  provide: 'DATA_PROVIDE',
  useFactory: async (configService: ConfigService) => {
    const dataSource = new DataSource({
      type: configService.get<string>('DB_TYPE', 'mysql'),
      host: configService.get<string>('DB_HOST', 'db'),
      port: configService.get<number>('DB_PORT', 3306),
      username: configService.get<string>('DB_USERNAME', 'root'),
      password: configService.get<string>('DB_PASSWORD', 'pass'),
      database: configService.get<string>('DB_DATABASE', 'auth'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    } as DataSourceOptions);

    return dataSource.initialize();
  },
  inject: [ConfigService],
};
