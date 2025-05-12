import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PacienteService } from '../services/paciente.service';
import { CreatePacienteDto } from '../dto/create-paciente.dto';
import { UpdatePacienteDto } from '../dto/update-paciente.dto';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post('post')
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacienteService.create(createPacienteDto);
  }

  @Get('get')
  findAll() {
    return this.pacienteService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.pacienteService.findById(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacienteService.update(+id, updatePacienteDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.pacienteService.remove(+id);
  }
}