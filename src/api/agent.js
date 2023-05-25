import request from '@/utils/request'

// 代理商-列表
export function agentList(data) {
  return request({
    url: '/boss/agent/list',
    method: 'post',
    data
  })
}

// 获取全部的行政区域省信息
export function getProvince() {
  return request({
    url: '/boss/area/province',
    method: 'get',
  })
}

// 代理商-修改-新增
export function agentDeal(data) {
  return request({
    url: '/boss/agent/deal',
    method: 'post',
    data
  })
}

// 代理商-详情
export function getAgentDetail(data) {
  return request({
    url: '/boss/agent/detail',
    method: 'post',
    data
  })
}

// 代理商-运营商会员管理列表
export function getAgentUserList(data) {
  return request({
    url: '/boss/agent/agentUserList',
    method: 'post',
    data
  })
}

// 代理商-详情-运营商会员列表
export function getUserList(data) {
  return request({
    url: '/boss/agent/userList',
    method: 'post',
    data
  })
}

// 申请成为基地列表
export function applyList(data) {
  return request({
    url: '/boss/agent/applyList',
    method: 'post',
    data
  })
}

// 同意成为基地
export function applyAgree(data) {
  return request({
    url: '/boss/agent/applyAgree',
    method: 'post',
    data
  })
}



