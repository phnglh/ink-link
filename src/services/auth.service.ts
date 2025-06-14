import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RefreshToken } from "../entities/refresh-token.entity";
import { User } from "../entities/user.entity";
import { generateRefreshToken, generateToken } from "../utils/generateToken";
import bcrypt from "bcrypt";

export default class AuthService {
  private userRepository: Repository<User>;
  private refreshTokenRepository: Repository<RefreshToken>

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
    this.refreshTokenRepository = AppDataSource.getRepository(RefreshToken)
  }

  async register({name ,email, password}: {name: string, email: string; password: string}): Promise<void> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error(`User with email ${email} already exists`);
    }
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required for registration");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = this.userRepository.create({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      email,
      password: hashPassword,
    });
    await this.userRepository.save(newUser);

  }
  async login({email, password}: {email: string; password: string}) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

      const accessToken = generateToken(
      { userId: user.uid },
      process.env.JWT_SECRET || 'default_secret'
    );

    const refreshTokenStr = generateRefreshToken(
      { userId: user.uid },
      process.env.JWT_SECRET || 'default_secret'
    );
    
    const refreshToken = this.refreshTokenRepository.create({
      userId: user.uid,
      token: refreshTokenStr,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
    });
    await this.refreshTokenRepository.save(refreshToken);
    
    return {
      accessToken: accessToken,
      refreshToken: refreshToken.token,
    }
  }
}
