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
  findAll(@Query('name') name?: string): Promise<Doctor[]> {
    return this.doctorsService.findAll(name);
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
  findOne(@Param('id') id: number): Promise<Doctor> {
    return this.doctorsService.findOne(id);
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
}
