import {
  Controller,
  Put,
  Get,
  Param,
  Query,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Consulta } from './entities/consulta.entity';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { ReagendarDto } from './dto/reagendar.dto';
import { CompletarCitaDto } from './dto/completarCita.dto';

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
  @ApiQuery({
    name: 'proximasCitas',
    required: false,
    description: 'Incluir solo las proximas citas',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'limit',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'status',
  })
  findAll(
    @Query('includeDoctor') includeDoctor?: boolean,
    @Query('includeEspecialidad') includeEspecialidad?: boolean,
    @Query('includeTipoConsulta') includeTipoConsulta?: boolean,
    @Query('includePaciente') includePaciente?: boolean,
    @Query('proximasCitas') proximasCitas?: boolean,
    @Query('limit') limit?: number,
    @Query('status') status?: number,
  ): Promise<Consulta[]> {
    return this.consultasService.findAll(
      includeDoctor,
      includeEspecialidad,
      includeTipoConsulta,
      includePaciente,
      proximasCitas,
      limit,
      status,
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

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Consulta,
  })
  @ApiBody({ type: CreateConsultaDto })
  create(@Body() createConsultaDto: CreateConsultaDto): Promise<Consulta> {
    return this.consultasService.create(createConsultaDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Consulta',
    type: Consulta,
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta not found',
  })
  remove(@Param('id') id: number): Promise<Consulta> {
    return this.consultasService.cancelarCita(id);
  }

  @Put('/comenzar-cita/:id')
  @ApiOkResponse({
    description: 'Consulta',
    type: Consulta,
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta not found',
  })
  comenzarCita(@Param('id') id: number): Promise<Consulta> {
    return this.consultasService.comenzarConsulta(id);
  }

  @Put('/completar-cita/:id')
  @ApiOkResponse({
    description: 'Consulta',
    type: Consulta,
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta not found',
  })
  @ApiBody({ type: CompletarCitaDto })
  completarCita(
    @Param('id') id: number,
    @Body() completarCitaDto: CompletarCitaDto,
  ): Promise<Consulta> {
    return this.consultasService.completarCita(id, completarCitaDto);
  }

  @Delete('/terminar-cita/:id')
  @ApiOkResponse({
    description: 'Consulta',
    type: Consulta,
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta not found',
  })
  terminarCita(@Param('id') id: number): Promise<Consulta> {
    return this.consultasService.terminarConsulta(id);
  }

  @Put('/reagendar/:id')
  @ApiOkResponse({
    description: 'Consulta',
    type: Consulta,
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta not found',
  })
  @ApiBody({ type: ReagendarDto })
  reagendarCita(
    @Param('id') id: number,
    @Body() reagendarCitaDto: ReagendarDto,
  ): Promise<Consulta> {
    return this.consultasService.reagendarCita(id, reagendarCitaDto);
  }

  @Post('/agendar-consulta/:id')
  @ApiOkResponse({
    description: 'Consulta',
    type: Consulta,
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta not found',
  })
  @ApiBody({ type: ReagendarDto })
  agendarProximaCita(
    @Param('id') id: number,
    @Body() reagendarCitaDto: ReagendarDto,
  ): Promise<Consulta> {
    return this.consultasService.agendarProximaCita(id, reagendarCitaDto);
  }

  @Get('/get-by-paciente/:id')
  @ApiOkResponse({
    description: 'Consultas',
    type: [Consulta],
  })
  @ApiResponse({
    status: 404,
    description: 'Consultas not found',
  })
  getByPaciente(@Param('id') id: number): Promise<Consulta[]> {
    return this.consultasService.getConsultasByPaciente(id);
  }

  @Get('/get-by-doctor/:id')
  @ApiOkResponse({
    description: 'Consultas',
    type: [Consulta],
  })
  @ApiResponse({
    status: 404,
    description: 'Consultas not found',
  })
  getByDoctor(@Param('id') id: number): Promise<Consulta[]> {
    return this.consultasService.getConsultasByDoctor(id);
  }

  @Get('/get-by-paciente-and-especialidad/:idPaciente/:idEspecialidad')
  @ApiOkResponse({
    description: 'Consultas',
    type: [Consulta],
  })
  @ApiResponse({
    status: 404,
    description: 'Consultas not found',
  })
  @ApiQuery({
    name: 'excludeConsulta',
    required: false,
    description: 'Excluir consulta',
  })
  getByPacienteAndEspecialidad(
    @Param('idPaciente') idPaciente: number,
    @Param('idEspecialidad') idEspecialidad: number,
    @Query('excludeConsulta') excludeConsulta?: number,
  ): Promise<Consulta[]> {
    return this.consultasService.getConsultasByPacienteAndEspecialidad(
      idPaciente,
      idEspecialidad,
      excludeConsulta,
    );
  }
}
