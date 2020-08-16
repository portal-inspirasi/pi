import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Author } from './Author';
import { Language } from './Language';

@ObjectType()
@Entity()
export class Quote extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  content: string;

  @ManyToOne(() => Author, (author: Author) => author.id)
  @JoinColumn()
  author: Author;

  @ManyToOne(() => Language, (language: Language) => language.id)
  @JoinColumn()
  language: Language;

  @Field()
  @Column()
  status: boolean;

  @Field()
  @Column()
  isDeleted: boolean;
}
