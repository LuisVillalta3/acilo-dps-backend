import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './entities/doctor.entity';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Op } from 'sequelize';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor)
    private doctorModel: typeof Doctor,
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

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorModel.findByPk(id);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }

  async create(doctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = new Doctor();
    Object.assign(doctor, doctorDto);
    console.log(doctor);
    return doctor.save();
  }

  async update(id: number, doctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = await this.findOne(id);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    Object.assign(doctor, doctorDto);
    return doctor.save();
  }
}
