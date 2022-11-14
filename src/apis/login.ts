import request from '@/utils/request'

const namespace = '/user'

interface LoginPayload {
  username: string
  password: string
}

export const login = (data: LoginPayload) =>
  request({
    url: `${namespace}/login`,
    method: 'post',
    data
  })
