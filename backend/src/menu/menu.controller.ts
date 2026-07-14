import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';

@Controller('menu')
@UseGuards(JwtAuthGuard, TenantGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto, @Request() req) {
    return this.menuService.create(createMenuDto, req.user.tenantId);
  }

  @Get()
  findAll(@Request() req, @Query('status') status?: string) {
    return this.menuService.findAll(req.user.tenantId, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.menuService.findOne(id, req.user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto, @Request() req) {
    return this.menuService.update(id, updateMenuDto, req.user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.menuService.remove(id, req.user.tenantId);
  }

  @Get('public/:slug')
  findBySlug(@Param('slug') slug: string, @Request() req) {
    return this.menuService.findBySlug(slug, req.user.tenantId);
  }
}
