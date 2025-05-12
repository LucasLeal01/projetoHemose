import { Module } from '@nestjs/common';
import { PacienteService } from '../services/paciente.service';
import { PacienteController } from '../controllers/paciente.controller';

@Module({
  controllers: [PacienteController],
  providers: [PacienteService],
  exports: [PacienteService]
})
export class PacienteModule {}
