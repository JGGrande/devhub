import "reflect-metadata";
import { describe, it, expect, beforeEach } from 'vitest';
import { CreateDesenvolvedorUseCase } from './create-desenvolvedor.usecase';
import { IDesenvolvedorRepository } from '@modules/desenvolvedores/domain/repositories/desenvolvedor.repository';
import { INivelRepository } from '@modules/niveis/domain/repositories/nivel.repository';
import AppError from '@shared/errors/AppError';
import { desenvolvedorTestContainer } from "@modules/desenvolvedores/infra/di/desenvolvedor.test.container";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";

describe('CreateDesenvolvedorUseCase', () => {
  let desenvolvedorRepository: IDesenvolvedorRepository;
  let nivelRepository: INivelRepository;

  beforeEach(() => {
    desenvolvedorRepository = desenvolvedorTestContainer.get<IDesenvolvedorRepository>('DesenvolvedorRepository');
    nivelRepository = desenvolvedorTestContainer.get<INivelRepository>('NivelRepository');
  });

  it('should create a new desenvolvedor successfully', async () => {
    const { id: nivelId } = await nivelRepository.create({ nivel: "Pleno 1" });

    const createDesenvolvedorUseCase = new CreateDesenvolvedorUseCase(
      desenvolvedorRepository,
      nivelRepository
    );

    const desenvolvedor = await createDesenvolvedorUseCase.execute({
      nome: 'John Doe',
      dataNascimento: new Date('1990-01-01'),
      hobby: 'Coding',
      nivelId: nivelId,
      sexo: 'M'
    });

    const desenvolvedorInstance = new Desenvolvedor({
      id: 1,
      nome: 'John Doe',
      dataNascimento: new Date('1990-01-01'),
      hobby: 'Coding',
      nivelId: 1,
      sexo: 'M'
    });

    expect(desenvolvedor).toBeInstanceOf(Desenvolvedor);
    expect(desenvolvedor).toEqual(desenvolvedorInstance);
  });

  it('should throw an error if nivel does not exist', async () => {
    const createDesenvolvedorUseCase = new CreateDesenvolvedorUseCase(
      desenvolvedorRepository,
      nivelRepository
    );

    await expect(
      createDesenvolvedorUseCase.execute({
        nome: 'John Doe',
        dataNascimento: new Date('1990-01-01'),
        hobby: 'Coding',
        nivelId: 1,
        sexo: 'M'
      })
    ).rejects.toThrow(AppError);

    try {
      await createDesenvolvedorUseCase.execute({
        nome: 'John Doe',
        dataNascimento: new Date('1990-01-01'),
        hobby: 'Coding',
        nivelId: 1,
        sexo: 'M'
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
    }
  });

  it('should throw an error if desenvolvedor age is letter than 16 year', async () => {
    const { id: nivelId } = await nivelRepository.create({ nivel: "Pleno 1" });

    const createDesenvolvedorUseCase = new CreateDesenvolvedorUseCase(
      desenvolvedorRepository,
      nivelRepository
    );

    try{
      await createDesenvolvedorUseCase.execute({
        nome: 'John Doe',
        dataNascimento: new Date('2023-01-01'),
        hobby: 'Coding',
        nivelId: nivelId,
        sexo: 'M'
      });
    }catch(error){
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 400);
    }

  })
});