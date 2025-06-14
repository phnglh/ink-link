import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RefreshToken } from "./refresh-token.entity";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	uid: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({ default: true })
	isActive: boolean;

	@Column({ default: false })
	isDeleted: boolean;

	@Column({ default: false })
	isBanned: boolean;

	@OneToMany(
		() => RefreshToken,
		(refreshToken) => refreshToken.user,
	)
	refreshTokens: RefreshToken[];
}
