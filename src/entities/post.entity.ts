export class Post {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string | null,
    public readonly published: boolean,
    public readonly authorId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
  ) {}

  toPersistence() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      published: this.published,
      authorId: this.authorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
