import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto, tenantId: string) {
    const menu = this.menuRepository.create({
      ...createMenuDto,
      tenantId,
    });
    return this.menuRepository.save(menu);
  }

  async findAll(tenantId: string, status?: string) {
    const queryBuilder = this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.items', 'items')
      .where('menu.tenantId = :tenantId', { tenantId });

    if (status) {
      queryBuilder.andWhere('menu.status = :status', { status });
    }

    return queryBuilder.orderBy('menu.sortOrder', 'ASC').getMany();
  }

  async findOne(id: string, tenantId: string) {
    const menu = await this.menuRepository.findOne({
      where: { id, tenantId },
      relations: ['items'],
    });

    if (!menu) {
      throw new NotFoundException('Menu não encontrado');
    }

    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto, tenantId: string) {
    const menu = await this.findOne(id, tenantId);
    
    Object.assign(menu, updateMenuDto);
    return this.menuRepository.save(menu);
  }

  async remove(id: string, tenantId: string) {
    const menu = await this.findOne(id, tenantId);
    await this.menuRepository.remove(menu);
    return { message: 'Menu removido com sucesso' };
  }

  async findBySlug(slug: string, tenantId: string) {
    return this.findAll(tenantId, 'active');
  }
}
