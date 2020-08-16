import { Entity, PrimaryColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Quote } from './Quote';

@ObjectType()
@Entity()
export class Author extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Quote, (quote: Quote) => quote.id)
  quote: Quote[];
}
