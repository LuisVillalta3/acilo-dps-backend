import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Especialidad } from './entities/specialties.entity';
import { SpecialtiesService } from './specialties.service';

@Controller({ version: '1', path: 'especialidades' })
@ApiTags('Especialidades')
export class SpecialtiesController {
  constructor(private especialidadService: SpecialtiesService) {}

  @Get()
  @ApiOkResponse({
    description: 'The list of all specialities',
    type: Especialidad,
    isArray: true,
  })
  findAll(): Promise<Especialidad[]> {
    return this.especialidadService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The speciality with the given id',
    type: Especialidad,
  })
  @ApiResponse({
    status: 404,
    description: 'Especialidad not found',
  })
  findOne(@Param('id') id: number): Promise<Especialidad> {
    return this.especialidadService.findOne(id);
  }
}
