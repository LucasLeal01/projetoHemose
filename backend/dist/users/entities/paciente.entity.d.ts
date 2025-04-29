import { Prescricao } from './prescricao.entity';
import { Internacao } from './internacao.entity';
export declare class Paciente {
    id: number;
    nome: string;
    data_nascimento: Date;
    cpf: string;
    telefone: string;
    endereco: string;
    tipo_sanguineo: string;
    alergias: string;
    historico_medico: string;
    prescricoes: Prescricao[];
    internacoes: Internacao[];
    created_at: Date;
    updated_at: Date;
}
