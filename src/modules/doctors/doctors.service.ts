import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './entities/doctor.entity';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { defaultHorarios } from './constants';
import { Horario } from './entities/horarios.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { HorarioDto } from './dto/horarios-dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor)
    private doctorModel: typeof Doctor,
    private sequelize: Sequelize,
  ) {}

  async findAll(name?: string): Promise<Doctor[]> {
    const where: any = {};

    if (name) {
      where.nombre = {
        [Op.iLike]: `%${name}%`,
      };
    }

    return this.doctorModel.findAll({ where });
  }

  async findOne(id: number, includeHorarios?: boolean): Promise<Doctor> {
    const doctor = await this.doctorModel.findByPk(id, {
      include:
        String(includeHorarios) === 'true' ? [{ model: Horario }] : undefined,
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }

  async create(doctorDto: CreateDoctorDto): Promise<Doctor> {
    try {
      return await this.sequelize.transaction(async (transaction) => {
        const doctor = new Doctor();
        Object.assign(doctor, doctorDto);

        await doctor.save({ transaction });

        await this.sequelize.models.Horario.bulkCreate(
          defaultHorarios(doctor.id),
          { transaction },
        );

        return doctor;
      });
    } catch (error) {
      throw new HttpException('Error creating doctor', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, doctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = await this.findOne(id);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    Object.assign(doctor, doctorDto);
    return doctor.save();
  }

  async getHorarios(id: number): Promise<Horario[]> {
    const doctor = await this.findOne(id, true);

    return doctor.horarios;
  }

  async updateHorarios(
    doctorId: number,
    horarioDto: HorarioDto,
  ): Promise<Horario[]> {
    const doctor = await this.findOne(doctorId, true);

    const horario = doctor.horarios.find(
      (horario) => horario.dia === horarioDto.dia,
    );

    if (!horario) {
      throw new NotFoundException('Horario not found');
    }

    Object.assign(horario, horarioDto);

    await horario.save();

    return doctor.horarios;
  }
}
