import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard, TenantGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.orderService.create(createOrderDto, req.user.tenantId);
  }

  @Get()
  findAll(@Request() req, @Query('status') status?: string) {
    return this.orderService.findAll(req.user.tenantId, status);
  }

  @Get('statistics')
  getStatistics(@Request() req) {
    return this.orderService.getStatistics(req.user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.orderService.findOne(id, req.user.tenantId);
  }

  @Get('number/:orderNumber')
  findByOrderNumber(@Param('orderNumber') orderNumber: string, @Request() req) {
    return this.orderService.findByOrderNumber(orderNumber, req.user.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Request() req) {
    return this.orderService.update(id, updateOrderDto, req.user.tenantId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto, @Request() req) {
    return this.orderService.updateStatus(id, updateOrderStatusDto, req.user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.orderService.remove(id, req.user.tenantId);
  }
}

// Controller público para clientes fazerem pedidos
@Controller('public/orders')
export class PublicOrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Query('tenantId') tenantId: string) {
    return this.orderService.create(createOrderDto, tenantId);
  }

  @Get('number/:orderNumber')
  findByOrderNumber(@Param('orderNumber') orderNumber: string, @Query('tenantId') tenantId: string) {
    return this.orderService.findByOrderNumber(orderNumber, tenantId);
  }
}
