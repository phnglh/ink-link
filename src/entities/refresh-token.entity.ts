import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  token: string;
  @Column()
  expiresAt: Date;
  @Column({ default: false })
  isRevoked: boolean;
  @Column({ default: false })
  isUsed: boolean;
  @Column({ default: false })
  isBlacklisted: boolean;

  @ManyToOne(() => User, (user) => user.refreshTokens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' }) 
  user: User;
}
