import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { DoesUsernameExistResponse } from './dto/does-username-exist.response';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDoc } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDoc>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel<User>(createUserDto);
    await user.save();
  }

  async findOneByUid(uid: string) {
    return await this.userModel.findOne({ uid });
  }

  async doesUsernameExist(
    username: string,
  ): Promise<DoesUsernameExistResponse> {
    const user = await this.userModel.findOne({ username });

    if (user) {
      return { doesUsernameExist: false };
    }

    return { doesUsernameExist: true };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
