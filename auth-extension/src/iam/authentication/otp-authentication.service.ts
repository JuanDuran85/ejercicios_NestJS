import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateSecret, generateURI } from 'otplib';
import { Repository } from 'typeorm';
import { envs } from '../../config';
import { User } from '../../users';

@Injectable()
export class OtpAuthenticationService {
  private readonly logger = new Logger(OtpAuthenticationService.name);
  private readonly appName = envs.tfaAppName;
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async generateSecret(email: string): Promise<{
    secret: string;
    uri: string;
  }> {
    const secret: string = generateSecret();
    const uri: string = generateURI({
      issuer: this.appName,
      label: email,
      secret,
    });
    return { secret, uri };
  }
}
