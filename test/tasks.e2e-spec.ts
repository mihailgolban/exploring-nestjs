import { INestApplication } from '@nestjs/common';
import { TasksService } from '../src/tasks/tasks.service';
import { Task } from '../dist/tasks/task.model';
import { TaskStatus } from '../src/tasks/task.model';
import { Test } from '@nestjs/testing';
import { TasksController } from '../src/tasks/tasks.controller';
import * as request from 'supertest';

describe('Tasks', () => {
  let app: INestApplication;
  const sampleTask = {
    id: 'ddc64626-25bd-11ec-9621-0242ac130002',
    title: 'Book flight to London',
    description: 'Buy a flight ticket to London',
    status: TaskStatus.OPEN,
  };

  const tasksService = {
    createTask: (): Task => sampleTask,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    })
      .overrideProvider(TasksService)
      .useValue(tasksService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST /tasks', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: 'Book flight to London',
        description: 'Buy a flight ticket to London',
      })
      .expect(201)
      .expect(sampleTask);
  });
});
