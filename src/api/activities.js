import request from '@/utils/request'

// 查询活动列表
export function activityList(data) {
  return request({
    url: '/boss/activity/rebate/list',
    method: 'post',
    data
  })
}

// 新增活动
export function activityAdd(data) {
  return request({
    url: '/boss/activity/rebate/add',
    method: 'post',
    data
  })
}

// 删除活动
export function toDeleteActivity(data) {
  return request({
    url: '/boss/activity/rebate/delete/'+ data,
    method: 'get',
  })
}

// 查询活动详情
export function getActivityDetail(data) {
  return request({
    url: '/boss/activity/rebate/get/'+ data,
    method: 'get',
  })
}

// 修改活动详情
export function activityUpdate(data) {
  return request({
    url: '/boss/activity/rebate/update',
    method: 'post',
    data
  })
}

// 修改活动状态
export function updateStatus(data) {
  return request({
    url: '/boss/activity/rebate/updateStatus',
    method: 'post',
    data
  })
}

