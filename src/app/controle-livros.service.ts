import { Injectable } from '@angular/core';

export interface LivroMongo {
  _id: string;
  codigo: number;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ControleLivrosService {
  baseURL = 'http://localhost:3030/livros';

  async obterLivros(): Promise<LivroMongo[]> {
    const response = await fetch(this.baseURL);
    const data = await response.json();
    return data.data.map((livro: any) => {
      return {
        codigo: livro.codigo,
        codEditora: livro.codEditora,
        titulo: livro.titulo,
        resumo: livro.resumo,
        autores: livro.autores,
      };
    }) as LivroMongo[];
  }

  async incluir(livro: LivroMongo): Promise<boolean> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livro),
    };

    const response = await fetch(this.baseURL, options);
    const data = await response.json();
    return data.ok as boolean;
  }

  async excluir(codigo: string): Promise<boolean> {
    const url = `${this.baseURL}/${codigo}`;
    const response = await fetch(url, { method: 'DELETE' });
    const data = await response.json();
    return data.ok as boolean;
  }
}
