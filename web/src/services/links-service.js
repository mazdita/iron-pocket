import http from './base-api-service';

const list = () => http.get('/links');
const details = (id) => http.get('/links/${id}')
const remove = (id) => http.delete(`/links/${id}`)
const edit = (id) => http.put(`/links/${id}`)
const create = (link) => http.post('/links', link)
const service = {
  list,
  remove,
  create,
  details,
  edit
};

export default service;


// TODO: implement links service
