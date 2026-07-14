import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { CreateOrderDto, UpdateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private dataSource: DataSource,
  ) {}

  private generateOrderNumber(): string {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${year}${month}${day}-${random}`;
  }

  async create(createOrderDto: CreateOrderDto, tenantId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderNumber = this.generateOrderNumber();
      
      let subtotal = 0;
      const orderItemsData = createOrderDto.items.map(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
        return {
          ...item,
          subtotal: itemSubtotal,
        };
      });

      const total = subtotal + createOrderDto.deliveryFee;

      const order = this.orderRepository.create({
        orderNumber,
        customerName: createOrderDto.customerName,
        customerPhone: createOrderDto.customerPhone,
        customerEmail: createOrderDto.customerEmail,
        deliveryAddress: createOrderDto.deliveryAddress,
        deliveryNeighborhood: createOrderDto.deliveryNeighborhood,
        deliveryNumber: createOrderDto.deliveryNumber,
        deliveryComplement: createOrderDto.deliveryComplement,
        paymentMethod: createOrderDto.paymentMethod,
        deliveryFee: createOrderDto.deliveryFee,
        subtotal,
        total,
        notes: createOrderDto.notes,
        estimatedDeliveryTime: createOrderDto.estimatedDeliveryTime ? new Date(createOrderDto.estimatedDeliveryTime) : null,
        tenantId,
        items: orderItemsData,
      });

      const savedOrder = await queryRunner.manager.save(order);
      await queryRunner.commitTransaction();
      
      return this.findOne(savedOrder.id, tenantId);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(tenantId: string, status?: string) {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'items')
      .where('order.tenantId = :tenantId', { tenantId })
      .orderBy('order.createdAt', 'DESC');

    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string, tenantId: string) {
    const order = await this.orderRepository.findOne({
      where: { id, tenantId },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
  }

  async findByOrderNumber(orderNumber: string, tenantId: string) {
    const order = await this.orderRepository.findOne({
      where: { orderNumber, tenantId },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, tenantId: string) {
    const order = await this.findOne(id, tenantId);
    
    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto, tenantId: string) {
    const order = await this.findOne(id, tenantId);
    
    order.status = updateOrderStatusDto.status;
    if (updateOrderStatusDto.notes) {
      order.notes = (order.notes || '') + '\n' + updateOrderStatusDto.notes;
    }
    
    return this.orderRepository.save(order);
  }

  async remove(id: string, tenantId: string) {
    const order = await this.findOne(id, tenantId);
    await this.orderRepository.remove(order);
    return { message: 'Pedido removido com sucesso' };
  }

  async getStatistics(tenantId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalOrders, pendingOrders, totalRevenue] = await Promise.all([
      this.orderRepository.count({ where: { tenantId } }),
      this.orderRepository.count({ where: { tenantId, status: OrderStatus.PENDING } }),
      this.orderRepository
        .createQueryBuilder('order')
        .select('SUM(order.total)', 'total')
        .where('order.tenantId = :tenantId', { tenantId })
        .andWhere('order.createdAt >= :today', { today })
        .getRawOne(),
    ]);

    return {
      totalOrders,
      pendingOrders,
      totalRevenue: parseFloat(totalRevenue?.total || 0),
      todayOrders: await this.orderRepository.count({
        where: { tenantId, createdAt: require('typeorm').MoreThanOrEqual(today) },
      }),
    };
  }
}
