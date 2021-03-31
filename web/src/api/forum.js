import request from '@/utils/request'

const api = {
  classify: '/api/forum/classify',
  create: '/api/forum/create',
  list: '/api/forum/list',
  detail: '/api/forum/detail',
  edit: '/api/forum/edit',
  delete: '/api/forum/delete',
  personalList: '/api/forum/personalList'
}

export function fetchForumClassify (data) {
  return request({
    url: api.classify,
    method: 'post',
    data
  })
}

export function fetchCreateForum (data) {
  return request({
    url: api.create,
    method: 'post',
    data
  })
}

export function fetchForumList (data) {
  return request({
    url: api.list,
    method: 'post',
    data
  })
}

export function fetchForumPersonalList (data) {
  return request({
    url: api.personalList,
    method: 'post',
    data
  })
}

export function fetchForumDetail (data) {
  return request({
    url: api.detail,
    method: 'post',
    data
  })
}

export function fetchEditForum (data) {
  return request({
    url: api.edit,
    method: 'post',
    data
  })
}

export function fetchDeleteForum (data) {
  return request({
    url: api.delete,
    method: 'post',
    data
  })
}
