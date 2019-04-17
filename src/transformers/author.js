export default (data) => ({
  id: data.id,
  name: data.name,
  created_at: data.createdAt ? data.createdAt : '-',
  updated_at: data.updatedAt ? data.updatedAt : '-'
});
