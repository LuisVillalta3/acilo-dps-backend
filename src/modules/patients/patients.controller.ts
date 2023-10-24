import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Paciente } from './entities/patient.entity';
import { ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePacienteDto } from './dto/create-paciente.dto';

@Controller({ version: '1', path: 'pacientes' })
@ApiTags('Pacientes')
export class PatientsController {
  constructor(private pacientesService: PatientsService) {}

  @Get()
  @ApiOkResponse({
    description: 'The list of all patients',
    type: Paciente,
    isArray: true,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'The name of the paciente',
  })
  findAll(@Query('name') name?: string): Promise<Paciente[]> {
    return this.pacientesService.findAll(name);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The paciente with the given id',
    type: Paciente,
  })
  @ApiResponse({
    status: 404,
    description: 'paciente not found',
  })
  findOne(@Param('id') id: number): Promise<Paciente> {
    return this.pacientesService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The doctor has been successfully created',
    type: Paciente,
  })
  create(@Body() createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    return this.pacientesService.create(createPacienteDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePacienteDto: CreatePacienteDto,
  ): Promise<Paciente> {
    return this.pacientesService.update(id, updatePacienteDto);
  }
}
