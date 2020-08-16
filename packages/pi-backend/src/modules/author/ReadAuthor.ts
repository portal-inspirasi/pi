import { Resolver, Query, Arg } from 'type-graphql';
import { Author } from '../../entity/Author';

@Resolver(Author)
export class ReadAuthorResolver {
  /* ------------------------------------
  => Get author by id
  ------------------------------------ */
  @Query(() => Author, { nullable: true })
  async author(@Arg('id') id: string): Promise<Author | null> {
    const author = await Author.findOne({ where: { id } });
    if (!author) {
      return null;
    }
    return author;
  }

  /* ------------------------------------
  => Get all authors
  ------------------------------------ */
  @Query(() => [Author])
  async allAuthor(
    @Arg('page', { nullable: true }) page: number,
    @Arg('rowPerPage', { nullable: true }) rowPerPage: number
  ): Promise<Author[] | null> {
    console.log('rowPerPage', rowPerPage);
    let authors = [];
    if (rowPerPage === 0) {
      authors = await Author.find();
    } else {
      authors = await Author.find({
        skip: (page - 1) * rowPerPage,
        take: rowPerPage
      });
    }
    if (!authors) {
      return null;
    }
    return authors;
  }
}
