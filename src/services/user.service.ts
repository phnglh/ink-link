import type { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

export default class UserService {
	private userRepository: Repository<User>;

	constructor() {
		this.userRepository = AppDataSource.getRepository(User);
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.userRepository.findOne({ where: { email } });
		if (!user) {
			throw new Error(`User with email ${email} not found`);
		}
		return user;
	}

	async findAll(): Promise<User[]> {
		const users = await this.userRepository.find();
		if (!users || users.length === 0) {
			throw new Error("No users found");
		}
		return users;
	}
}
