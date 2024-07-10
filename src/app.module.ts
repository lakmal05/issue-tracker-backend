import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleDestroy,
} from "@nestjs/common";
import databaseConfig from "./database/config/database.config";
import appConfig from "./config/app.config";
import path from "path";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { I18nModule } from "nestjs-i18n/dist/i18n.module";
import { HeaderResolver } from "nestjs-i18n";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { DataSource, DataSourceOptions } from "typeorm";
import { AllConfigType } from "./config/config.type";
import { MongooseModule } from "@nestjs/mongoose";
import { StaffModule } from "./staff/staff.module";
import { AuthModule } from "./auth-management/auth/auth.module";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role-permission-management/role/role.module";
import { PermissionModule } from "./role-permission-management/permission/permission.module";

import { CacheMiddleware } from "./utils/common/middleware/cache/cache.middleware";
import { CleanupService } from "./cleanup.service";
import { CacheModule } from "./utils/common/middleware/cache/cache.module";

import { RolePermissionModule } from "./role-permission-management/role-permission/role-permission.module";

import { IssueModule } from "./issue/issue.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: [".env"],
    }),
    // (databaseConfig() as DatabaseConfig).isDocumentDatabase
    //   ? MongooseModule.forRootAsync({
    //       useClass: MongooseConfigService,
    //     })
    //   :
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow("app.fallbackLanguage", {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, "/i18n/"), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get("app.headerLanguage", {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    StaffModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,

    CacheModule,

    RolePermissionModule,

    IssueModule,
  ],
  providers: [CleanupService, CacheMiddleware],
  exports: [CleanupService],
})
export class AppModule implements NestModule, OnModuleDestroy {
  constructor(private readonly cleanupService: CleanupService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CacheMiddleware).forRoutes("*");
  }
  onModuleDestroy() {
    this.cleanupService.destroy();
  }
}
