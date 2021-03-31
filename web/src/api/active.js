import request from '@/utils/request'

const api = {
  classify: '/api/active/classify',
  create: '/api/active/create',
  list: '/api/active/list',
  detail: '/api/active/detail',
  edit: '/api/active/edit',
  delete: '/api/active/delete'
}

export function fetchActiveClassify (data) {
  return request({
    url: api.classify,
    method: 'post',
    data
  })
}

export function fetchCreateActive (data) {
  return request({
    url: api.create,
    method: 'post',
    data
  })
}

export function fetchActiveList (data) {
  return request({
    url: api.list,
    method: 'post',
    data
  })
}

export function fetchActiveDetail (data) {
  return request({
    url: api.detail,
    method: 'post',
    data
  })
}

export function fetchEditActive (data) {
  return request({
    url: api.edit,
    method: 'post',
    data
  })
}

export function fetchDeleteActive (data) {
  return request({
    url: api.delete,
    method: 'post',
    data
  })
}
