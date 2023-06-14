import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {DataSource, Repository} from "typeorm";
import {User} from "./entities/user.entity";

// export type Users = any;
@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
      private dataSource: DataSource
  ) {}

<<<<<<< HEAD
  private readonly users = [
    {
      firstname: 'John',
      lastname: 'Mayer',
      username: 'john-mayer',
      email: 'john@mayer.com',
      password: 'john',
      image: 'john.img',
    },
    {
      firstname: 'Maria',
      lastname: 'Vania',
      username: 'mariavania',
      email: 'maria@vania.com',
      password: 'john',
      image: 'john.img',
    },
  ];


=======
>>>>>>> 9d5a5e95fab2128f681f6690d5d8627bfb0aa333
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.image = createUserDto.image;
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string) {
    // return this.users.find(user => user.username === username);
    return await this.usersRepository.findOne({
      select: ['firstname', 'lastname', 'username', 'email', 'password', 'image'],
      where: [
        {username},
      ],
    });
  }

  async findOneId(id: number){
    return await this.usersRepository.findOne({
      select:['firstname', 'lastname', 'username', 'email', 'password', 'image'],
    where: [{id},
    ]
  });
  }

  update(username: string, updateUserDto: UpdateUserDto) {

    return `This action updates a #${username} user with dbo : #${UpdateUserDto}`;
  }

  async remove(username: string): Promise<void> {
    await this.usersRepository.delete(username);
  }

  async createMany(users: User[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(users[0]);
      await queryRunner.manager.save(users[1]);

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

}
