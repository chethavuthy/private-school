import { defineStore } from 'pinia'
import { UserState } from '../types'
import store from '../pinia'

import Avatar from '@/assets/img_avatar.gif'
import { LoginResponse } from '@/types/auth'

const defaultAvatar = Avatar

const useUserStore = defineStore('user-info', {
  state: () => {
    return {
      token: '',
      accessToken: '',
      refreshToken: '',
      refreshTokenExpired: '',
      avatar: defaultAvatar,
    }
  },
  actions: {
    saveUser(userInfo: LoginResponse) {
      return new Promise<LoginResponse>((resolve) => {
        this.token = userInfo.accessToken
        this.accessToken = userInfo.accessToken
        this.refreshToken = userInfo.refreshToken
        // this.refreshTokenExpired = userInfo.refreshTokenExpired
        // this.avatar = userInfo.avatar || defaultAvatar
        resolve(userInfo)
      })
    },
    isTokenExpire() {
      return !this.token
    },
    // changeNickName(newNickName: string) {
    //   this.nickName = newNickName
    // },
    logout() {
      return new Promise<void>((resolve) => {
        this.$reset()
        localStorage.clear()
        sessionStorage.clear()
        resolve()
      })
    },
  },
  presist: {
    enable: true,
    resetToState: true,
    // option: {
    //   exclude: ['userName'],
    // },
  },
})

export default useUserStore

export function useUserStoreContext() {
  return useUserStore(store)
}
