import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EntityManager, MoreThan, Repository } from 'typeorm';
import { hashPassword } from 'src/utils/guard/crypt';
import { Roles } from './entities/user-roles.enum';
import { ErrorUtils } from 'src/utils/error-utils';
import { SubscriptionPlanEntity } from 'src/subscription-plan/entities/subscription-plan.entity';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { RequestResetPasswordDto, ResetPasswordDto } from './dto/reset.password';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly paymentService: PaymentService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriptionPlanEntity)
    private readonly subscriptionPlanRepository: Repository<SubscriptionPlanEntity>,

  ) { }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
      // Validate subscription plan ID if user role is present
      if (createUserDto.roles.includes(Roles.USER) && !createUserDto.subscription_plan_id) {
        ErrorUtils.throwInternalServerError("User subscription_plan_id is required.");
      }

      // Hash the user's password
      const hashedPassword = await hashPassword(createUserDto.password);

      // Create the new user data object
      const newUserDto: CreateUserDto = {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
        roles: createUserDto.roles,
      };

      let plan;
      if (createUserDto.roles.includes(Roles.USER)) {
        // Find the subscription plan
        plan = await transactionalEntityManager.findOne(SubscriptionPlanEntity, { where: { id: createUserDto.subscription_plan_id } });
        if (!plan) {
          throw new Error('Subscription plan not found.');
        }

        newUserDto.subscriptionPlanId = createUserDto.subscription_plan_id;
        newUserDto.credits = plan.credits;
        newUserDto.subscription_expiration = this.calculateExpirationDate(plan.duration);


      }else{
        newUserDto.has_access = true;
      }

      const userRepository = transactionalEntityManager.getRepository(UserEntity);

      const newUser = userRepository.create({ ...newUserDto, subscription_plan: plan });
      
      const savedUser = await userRepository.save(newUser);
      let link = 'https://mercago/users'
      // if (createUserDto.roles.includes(Roles.USER)) {

      //    link = await this.paymentService.createPaymentLink(plan, newUser, "mercado_pago")
      // }


      return { ...savedUser, link };
    });


  }

  private calculateExpirationDate(duration: number): Date {
    const now = new Date();
    const expirationDate = new Date(now.setMonth(now.getMonth() + duration));
    return expirationDate;
  }

  async findAll(params) {
    const where = {}

    if (params.id) where['id'] = params.id

    if (params.username) where['username'] = params.username
    if (params.email) where['email'] = params.email
    if (params.roles) where['roles'] = params.roles

    const resultCreateUser = await this.userRepository.find({
      where,
      select: [
        'id',
        'username',
        'email',
        'active',
        'credits',
        'roles',
        'subscription_expiration',
        'created_at',
        'updated_at',
        'subscription_plan',
        
      ],
      relations: ['credit_usages', 'payments'], 
    });
    return resultCreateUser;
  }


  async findOne(id: number, params) {

    const where = {}

    if (id) where['id'] = id

    if (params.username) where['username'] = params.username
    if (params.email) where['email'] = params.email
    if (params.roles) where['roles'] = params.roles


    return await this.userRepository.findOne({
      where,
      select: [
        'id',
        'username',
        'email',
        'active',
        'credits',
        'roles',
        'subscription_expiration',
        'created_at',
        'updated_at',
        'subscription_plan',
        
      ],
      relations: ['credit_usages', 'payments'], 
    });

  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    return await this.userRepository.delete(id)
  }

  async findOneEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async findOneUsername(username: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async requestPasswordReset(requestResetPasswordDto: RequestResetPasswordDto): Promise<void> {
    const { email, username } = requestResetPasswordDto;
    const where = { email }
    if (username) { where["username"] = username }
    const user = await this.userRepository.findOne({ where });

    if (!user) {
      throw new Error('User not found');
    }

    // Gerar um token de recuperação
    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // Token expira em 1 hora

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await this.userRepository.save(user);

    // Enviar o e-mail com o token
    await this.sendResetPasswordEmail(user.email, token);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { token, newPassword } = resetPasswordDto;
    const user = await this.userRepository.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: MoreThan(new Date()) // Verifica se o token não expirou
      }
    });

    if (!user) {
      throw new Error('Token is invalid or has expired');
    }

    user.password = newPassword; // Hash a senha antes de salvar, se necessário
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await this.userRepository.save(user);
  }

  private async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use o serviço de e-mail de sua preferência
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const resetUrl = `http://your-frontend-url/reset-password?token=${token}`;

    await transporter.sendMail({
      to: email,
      from: 'no-reply@yourapp.com',
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
    });
  }
}

