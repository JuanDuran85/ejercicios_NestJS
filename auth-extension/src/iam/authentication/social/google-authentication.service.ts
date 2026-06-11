import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { Repository } from 'typeorm';
import { envs } from '../../../config';
import { User } from '../../../users';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class GoogleAuthenticationService {
  private oauthClient = {} as OAuth2Client;
  private readonly clientId: string = envs.googleClientId;
  private readonly clientSecret: string = envs.googleClientSecret;
  private readonly logger: Logger = new Logger(
    GoogleAuthenticationService.name,
  );
  private email: string | undefined = '';
  private sub: string | undefined = '';

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public onModuleInit() {
    this.oauthClient = new OAuth2Client(this.clientId, this.clientSecret);
  }

  public async authenticate(token: string) {
    try {
      const loginTicket: LoginTicket = await this.oauthClient.verifyIdToken({
        idToken: token,
      });

      const googlePayload: TokenPayload | undefined = loginTicket.getPayload();
      this.email = googlePayload?.email;
      this.sub = googlePayload?.sub;

      this.logger.verbose(
        `User: ${this.email} logged in with googleId: ${this.sub}`,
      );
      const user: User | null = await this.userRepository.findOneBy({
        googleId: this.sub,
      });
      if (user) {
        return this.authService.generateTokens(user);
      } else {
        const newUser = await this.userRepository.save({
          email: this.email,
          googleId: this.sub,
        });
        return this.authService.generateTokens(newUser);
      }
    } catch (error) {
      const finalError = error as Error;
      this.logger.error(`Error verifying access token: ${finalError.message}`);
      throw error;
    }
  }
}
