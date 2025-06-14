import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Document } from './document.entity';

export type BlockType = 'paragraph' | 'heading' | 'image' | 'list' | 'quote' | 'code';
export type ParagraphContent = { text: string };
export type HeadingContent = { text: string; level: number };
export type ImageContent = { url: string; caption?: string };
export type BlockContent =
  | ParagraphContent
  | HeadingContent
  | ImageContent;

@Entity('content_blocks')
export class Block {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  documentId: string;

  @ManyToOne(() => Document, (document) => document.blocks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: Document;

  @Column({
    type: 'enum',
    enum: ['paragraph', 'heading', 'image', 'list', 'quote', 'code'],
  })
  type: BlockType;

  @Column({ type: 'jsonb' }) 
  content: BlockContent;

  @Column()
  order: number;
}
