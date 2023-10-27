import { Controller, Get, Param, Query } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Consulta } from './entities/consulta.entity';

@Controller({ version: '1', path: 'consultas' })
@ApiTags('Consultas')
export class ConsultasController {
  constructor(private consultasService: ConsultasService) {}

  @Get('tipo-consultas')
  @ApiOkResponse({
    description: 'Lista de tipos de consultas',
    type: Array<{ id: string; nombre: string }>,
    isArray: true,
  })
  tipoConsultas(): Promise<Array<{ id: string; nombre: string }>> {
    return this.consultasService.tipoConsultas();
  }

  @Get()
  @ApiOkResponse({
    description: 'Lista de consultas',
    type: Consulta,
    isArray: true,
  })
  @ApiQuery({
    name: 'includeDoctor',
    required: false,
    description: 'Incluir el doctor',
  })
  @ApiQuery({
    name: 'includeEspecialidad',
    required: false,
    description: 'Incluir la especialidad',
  })
  @ApiQuery({
    name: 'includeTipoConsulta',
    required: false,
    description: 'Incluir el tipo de consulta',
  })
  @ApiQuery({
    name: 'includePaciente',
    required: false,
    description: 'Incluir el paciente',
  })
  findAll(
    @Query('includeDoctor') includeDoctor?: boolean,
    @Query('includeEspecialidad') includeEspecialidad?: boolean,
    @Query('includeTipoConsulta') includeTipoConsulta?: boolean,
    @Query('includePaciente') includePaciente?: boolean,
  ): Promise<Consulta[]> {
    return this.consultasService.findAll(
      includeDoctor,
      includeEspecialidad,
      includeTipoConsulta,
      includePaciente,
    );
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Consulta',
    type: Consulta,
  })
  @ApiResponse({
    status: 404,
    description: 'Doctor not found',
  })
  @ApiQuery({
    name: 'includeDoctor',
    required: false,
    description: 'Incluir el doctor',
  })
  @ApiQuery({
    name: 'includeEspecialidad',
    required: false,
    description: 'Incluir la especialidad',
  })
  @ApiQuery({
    name: 'includeTipoConsulta',
    required: false,
    description: 'Incluir el tipo de consulta',
  })
  @ApiQuery({
    name: 'includePaciente',
    required: false,
    description: 'Incluir el paciente',
  })
  findOne(
    @Param('id') id: number,
    @Query('includeDoctor') includeDoctor?: boolean,
    @Query('includeEspecialidad') includeEspecialidad?: boolean,
    @Query('includeTipoConsulta') includeTipoConsulta?: boolean,
    @Query('includePaciente') includePaciente?: boolean,
  ): Promise<Consulta> {
    return this.consultasService.findOne(
      id,
      includeDoctor,
      includeEspecialidad,
      includeTipoConsulta,
      includePaciente,
    );
  }
}
