import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { MenuItem } from './menu-item.entity';
import { MenuService } from './menu.service';
import { MenuItemService } from './menu-item.service';
import { MenuController } from './menu.controller';
import { MenuItemController } from './menu-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuItem])],
  controllers: [MenuController, MenuItemController],
  providers: [MenuService, MenuItemService],
  exports: [MenuService, MenuItemService],
})
export class MenuModule {}
