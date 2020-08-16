import { Resolver, Query } from 'type-graphql';

@Resolver()
export class SayHelloResolver {
  /* ------------------------------------
  => Get author by id
  ------------------------------------ */
  @Query()
  hello(): string {
    return 'Hello World!';
  }
}
