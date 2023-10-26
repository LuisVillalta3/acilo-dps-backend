import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TipoCitasService } from './tipo_citas.service';
import { TipoCita } from './entities/cita_tipos.entity';

@Controller({ version: '1', path: 'tipo-citas' })
@ApiTags('Tipo de citas')
export class TipoCitasController {
  constructor(private tipoCitasService: TipoCitasService) {}

  @Get()
  @ApiOkResponse({
    description: 'The list of all specialities',
    type: TipoCita,
    isArray: true,
  })
  findAll(): Promise<TipoCita[]> {
    return this.tipoCitasService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The speciality with the given id',
    type: TipoCita,
  })
  @ApiResponse({
    status: 404,
    description: 'Especialidad not found',
  })
  findOne(@Param('id') id: number): Promise<TipoCita> {
    return this.tipoCitasService.findOne(id);
  }
}
