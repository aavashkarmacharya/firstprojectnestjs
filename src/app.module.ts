import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { usermodule } from './user/user.module';
import { user } from './user/user.entity';
import { authmodule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { productmodule } from './product/products.module';
import { product } from './product/products.entity';
import { cartmodule } from './cart/cart.module';
import { cartentity } from './cart/cart.entity';
import { cartitem } from './cart/cart-item.entity';
configDotenv();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [user, product, cartentity, cartitem],
      synchronize: true,
    }),
    productmodule,
    usermodule,
    authmodule,
    PassportModule,
    cartmodule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
