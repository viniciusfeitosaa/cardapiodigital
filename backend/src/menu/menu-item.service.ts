import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { CreateMenuItemDto, UpdateMenuItemDto } from './dto/menu-item.dto';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto, tenantId: string) {
    const menuItem = this.menuItemRepository.create({
      ...createMenuItemDto,
    });
    return this.menuItemRepository.save(menuItem);
  }

  async findAll(menuId: string, tenantId: string, status?: string) {
    const queryBuilder = this.menuItemRepository
      .createQueryBuilder('menuItem')
      .leftJoinAndSelect('menuItem.menu', 'menu')
      .where('menu.tenantId = :tenantId', { tenantId })
      .andWhere('menuItem.menuId = :menuId', { menuId });

    if (status) {
      queryBuilder.andWhere('menuItem.status = :status', { status });
    }

    return queryBuilder.orderBy('menuItem.sortOrder', 'ASC').getMany();
  }

  async findOne(id: string, tenantId: string) {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id },
      relations: ['menu'],
    });

    if (!menuItem || menuItem.menu.tenantId !== tenantId) {
      throw new NotFoundException('Item do menu não encontrado');
    }

    return menuItem;
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto, tenantId: string) {
    const menuItem = await this.findOne(id, tenantId);
    
    Object.assign(menuItem, updateMenuItemDto);
    return this.menuItemRepository.save(menuItem);
  }

  async remove(id: string, tenantId: string) {
    const menuItem = await this.findOne(id, tenantId);
    await this.menuItemRepository.remove(menuItem);
    return { message: 'Item do menu removido com sucesso' };
  }
}
