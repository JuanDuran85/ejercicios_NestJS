import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv: boolean = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath: string = __dirname + '/../../.env';
      const existsPath = fs.existsSync(envFilePath);

      if (!existsPath) {
        console.log('El archivo .env no existe');
        process.exit(0);
      }

      //estamos en desarrollo
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  get(key: string): string {
      return this.envConfig[key];
  }
}
