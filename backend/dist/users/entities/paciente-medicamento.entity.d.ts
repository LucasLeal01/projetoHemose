import { Paciente } from './paciente.entity';
import { Medicamento } from './medicamento.entity';
export declare class PacienteMedicamento {
    id: number;
    paciente: Paciente;
    medicamento: Medicamento;
    quantidade: number;
    data_administracao: Date;
}
