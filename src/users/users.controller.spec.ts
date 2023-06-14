import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import now = jest.now;

const createUserDto: CreateUserDto = {
  firstname: 'firstName #1',
  lastname: 'lastName #1',
  username: 'username #1',
  email: 'email #1',
  password: 'password #1',
  image: 'image #1',
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest
                .fn()
                .mockImplementation((user: CreateUserDto) =>
                    Promise.resolve({ id: '1', ...user }),
                ),
            findAll: jest.fn().mockResolvedValue([
              {
                firstname: 'firstname #1',
                lastname: 'lastname #1',
                username: 'username #1',
                email: 'email #1',
                password: 'password #1',
                image: 'image #1',
              },
              {
                firstname: 'firstname #2',
                lastname: 'lastname #2',
                username: 'username #2',
                email: 'email #2',
                password: 'password #2',
                image: 'image #2',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
                Promise.resolve({
                  firstname: 'firstname #1',
                  lastname: 'lastname #1',
                  username: 'username #1',
                  email: 'email #1',
                  password: 'password #1',
                  image: 'image #1',
                  id,
                }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      usersController.create(createUserDto);
      expect(usersController.create(createUserDto)).resolves.toEqual({
        id: '1',
        ...createUserDto,
      });
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(usersController.findOne('john')).resolves.toEqual({
        firstName: 'firstname #1',
        lastName: 'lastname #1',
        username: 'username #1',
        email: 'email #1',
        password: 'password #1',
        image: 'image #1',
        id: 1,
      });
      expect(usersService.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      usersController.remove('2');
      expect(usersService.remove).toHaveBeenCalled();
    });
  });
});