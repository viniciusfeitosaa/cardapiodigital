import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto, UpdateMenuItemDto } from './dto/menu-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';

@Controller('menu-items')
@UseGuards(JwtAuthGuard, TenantGuard)
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto, @Request() req) {
    return this.menuItemService.create(createMenuItemDto, req.user.tenantId);
  }

  @Get()
  findAll(@Query('menuId') menuId: string, @Request() req, @Query('status') status?: string) {
    return this.menuItemService.findAll(menuId, req.user.tenantId, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.menuItemService.findOne(id, req.user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuItemDto: UpdateMenuItemDto, @Request() req) {
    return this.menuItemService.update(id, updateMenuItemDto, req.user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.menuItemService.remove(id, req.user.tenantId);
  }
}
