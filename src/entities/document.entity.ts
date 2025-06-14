import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Block } from "./content-block.entity";

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.documents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToMany(() => Block, (block) => block.document)
blocks: Block[];

  @Column()
  ownerId: string;

  @Column({type: 'date', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({type: 'date', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
}
