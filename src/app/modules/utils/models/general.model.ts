import { Card } from './cards.model';
import { Page } from './page.model';
import { Usuario } from './usuarios.model';

export class DataModal {
    titulo?: string;
    boton?: string;
    status?: boolean;
    username?: string;
    contra?: string;
}

export interface ResponseMensaje {
    mensaje?: string;
    cards?: Card[];
    pages?: Page[];
    usuarios?: Usuario[];
    username?: string;
    token?: string;
    rol?: string;
} 
export interface DataSelect{
    id: string;
    text: string;
}