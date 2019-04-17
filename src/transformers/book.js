export default (data) => ({
  id: data.id,
  name: data.name,
  page_no: data.page_no,
  read: data.read,
  created_at: data.createdAt ? data.createdAt : '-',
  updated_at: data.updatedAt ? data.updatedAt : '-'
});
