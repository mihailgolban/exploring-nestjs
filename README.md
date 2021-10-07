# Unit testing a Nestjs App

Automated testing is considered an essential part of any serious software development effort. The reason is simple. If you have tests, you do not fear making changes to the code! Here are some recommendations to ensure the best practices.

## In General

- controllers as clean as possible
- all business logic in services
- e2e tests with supertest
- unit tests with jest
- e2e tests only checks for response ( treats controller as black box)
- all other checks go into unit tests

## Keep controllers as clean as possible

Controllers are where you’ll define your routes and call their corresponding services. The idea is to keep controllers as clean and as independent from your external services as possible. Finally, services contain the core of your business logic and the focus of your tests.

Bad:

```js
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
```

Good:

```js
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
```

## Put all your business logic in services

The service layer is responsible for data storage and retrieval, and is designed to be used by the Controller.  
`tasks.service.ts` is a great candidate where to move the logic from the `tasks.controller.ts`.

## Unit tests with jest

Unit tests are typically automated tests written and run by software developers to ensure that a section of an application (known as the "unit") meets its design and behaves as intended.  
Jest is provided as the default testing framework.  
`tasks.controller.spec.ts` contains some basic tests of the TasksControler.

## e2e tests with supertest

While unit tests support developer productivity, End-to-end tests verify the behaviour of the system as a whole.  
End to End testign aims to replicate real user scenarios so that the system can be validated for integration and data integrity.

The e2e automation has to work with any resources/database/datatsore/message bus etc., and with any environmet including local/remote or cloud platforms

Tests should always clean up after themselves. If a test creates a `Task` that gets stored in the db. When the test is done running, that `Task` should be deleted from the db. If you aren't constant about this, you'll eventually run into bugs and issues where data is inconsistent. God forbid this happens in production.

Should e2e tests persist data in real databases?
https://stackoverflow.com/questions/55093017/should-e2e-tests-persist-data-in-real-databases

## e2e tests only checks for response ( treats controller as black box)

E2e should mimic production system as close as possible, so you should treat controller as black box.  
In e2e tests you should only check the response of the endpoint.

```js
describe('Tasks', () => {
  ...
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
```

## All other checks go into unit tests

Any other checks you're going to perform should go in unit tests.

## Conclusion

We have barely scratched the surface of this topic. Indeed there is a lot of articles out there about writing tests, so try as much as you can to follow these recommendations and keep your tests clean.
