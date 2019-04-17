export default (data) => ({
  id: data.id,
  authorId: data.authorId,
  bookId: data.bookId,
  created_at: data.createdAt ? data.createdAt : '-',
  updated_at: data.updatedAt ? data.updatedAt : '-'
});
