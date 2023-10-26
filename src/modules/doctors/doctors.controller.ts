/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Patch,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Doctor } from './entities/doctor.entity';
import { DoctorsService } from './doctors.service';
import { ApiTags, ApiOkResponse, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Horario } from './entities/horarios.entity';
import { HorarioDto } from './dto/horarios-dto';

@Controller({ version: '1', path: 'doctors' })
@ApiTags('Doctores')
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Get()
  @ApiOkResponse({
    description: 'The list of all doctors',
    type: Doctor,
    isArray: true,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'The name of the doctor',
  })
  @ApiQuery({
    name: 'especialidad',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'includeHorarios',
    required: false,
    description: 'Include the horarios of the doctor',
  })
  @ApiQuery({
    name: 'includeEspecialidad',
    required: false,
    description: 'Incluir la especialidad del doctor',
  })
  findAll(
    @Query('name') name?: string,
    @Query('name') especialidad?: number,
    @Query('includeHorarios') includeHorarios?: boolean,
    @Query('includeEspecialidad') includeEspecialidad?: boolean,
  ): Promise<Doctor[]> {
    return this.doctorsService.findAll(name, especialidad, includeHorarios, includeEspecialidad);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The doctor with the given id',
    type: Doctor,
  })
  @ApiResponse({
    status: 404,
    description: 'Doctor not found',
  })
  @ApiQuery({
    name: 'includeHorarios',
    required: false,
    description: 'Include the horarios of the doctor',
  })
  @ApiQuery({
    name: 'includeEspecialidad',
    required: false,
    description: 'Incluir la especialidad del doctor',
  })
  findOne(
    @Param('id') id: number,
    @Query('includeHorarios') includeHorarios: boolean,
    @Query('includeEspecialidad') includeEspecialidad: boolean,
  ): Promise<Doctor> {
    return this.doctorsService.findOne(id, includeHorarios, includeEspecialidad);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The doctor has been successfully created',
    type: Doctor,
  })
  create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorsService.create(createDoctorDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDoctorDto: CreateDoctorDto,
  ): Promise<Doctor> {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Get(':id/horarios')
  @ApiOkResponse({
    description: 'Los horarios del doctor',
    type: [Horario],
  })
  @ApiResponse({
    status: 404,
    description: 'Doctor not found',
  })
  getHorarios(@Param('id') id: number): Promise<Horario[]> {
    return this.doctorsService.getHorarios(id);
  }

  @Patch(':id/horarios')
  @ApiOkResponse({
    description: 'Los horarios del doctor',
    type: [Horario],
  })
  @ApiResponse({
    status: 404,
    description: 'Doctor not found',
  })
  updateHorarios(
    @Param('id') id: number,
    @Body() horario: HorarioDto,
  ): Promise<Horario[]> {
    return this.doctorsService.updateHorarios(id, horario);
  }
}
