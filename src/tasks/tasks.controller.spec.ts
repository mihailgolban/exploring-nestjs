import { TasksController } from './tasks.controller';
import { TestingModule, Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksController = app.get<TasksController>(TasksController);
    tasksService = app.get<TasksService>(TasksService);
  });

  describe('getTasks', () => {
    it('should return all tasks', () => {
      const tasks: Task[] = [
        {
          id: 'ddc64626-25bd-11ec-9621-0242ac130002',
          title: 'My first task',
          description: 'First task description',
          status: TaskStatus.OPEN,
        },
      ];
      jest.spyOn(tasksService, 'getAllTasks').mockImplementation(() => tasks);
      expect(tasksController.getTasks({})).toBe(tasks);
    });
  });

  describe('getTaskById', () => {
    it('should return task by id', () => {
      const task: Task = {
        id: 'ddc64626-25bd-11ec-9621-0242ac130002',
        title: 'My first task',
        description: 'First task description',
        status: TaskStatus.OPEN,
      };
      jest.spyOn(tasksService, 'getTaskById').mockImplementation(() => task);
      expect(
        tasksController.getTaskById('ddc64626-25bd-11ec-9621-0242ac130002'),
      ).toBe(task);
    });
  });
});
