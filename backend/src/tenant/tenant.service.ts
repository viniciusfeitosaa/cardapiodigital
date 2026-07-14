import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const existingTenant = await this.tenantRepository.findOne({
      where: [{ slug: createTenantDto.slug }, { name: createTenantDto.name }],
    });

    if (existingTenant) {
      throw new NotFoundException('Tenant já existe com este nome ou slug');
    }

    const tenant = this.tenantRepository.create(createTenantDto);
    return await this.tenantRepository.save(tenant);
  }

  async findAll(): Promise<Tenant[]> {
    return await this.tenantRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ 
      where: { id },
      relations: ['users'],
    });
    
    if (!tenant) {
      throw new NotFoundException(`Tenant com ID ${id} não encontrado`);
    }
    
    return tenant;
  }

  async findBySlug(slug: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ 
      where: { slug },
      relations: ['users'],
    });
    
    if (!tenant) {
      throw new NotFoundException(`Tenant com slug ${slug} não encontrado`);
    }
    
    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(id);
    
    Object.assign(tenant, updateTenantDto);
    return await this.tenantRepository.save(tenant);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.tenantRepository.delete(id);
  }

  async activate(id: string): Promise<Tenant> {
    return this.update(id, { active: true });
  }

  async deactivate(id: string): Promise<Tenant> {
    return this.update(id, { active: false });
  }
}

export interface CreateTenantDto {
  name: string;
  slug: string;
  logo?: string;
  domain?: string;
  plan?: string;
}

export interface UpdateTenantDto {
  name?: string;
  slug?: string;
  logo?: string;
  domain?: string;
  active?: boolean;
  plan?: string;
}
