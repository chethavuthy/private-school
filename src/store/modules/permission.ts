import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import router from '@/router'
import { findRootPathRoute, generatorRoutes, mapTwoLevelRouter } from '../help'
import { constantRoutes } from '@/router/routes/constants'
import { adminRoutes } from '@/router/routes/admin-routes'

const usePermissionStore = defineStore('permission-route', {
  state: () => {
    return {
      permissionRoutes: [] as RouteRecordRaw[],
    }
  },
  getters: {
    getPermissionSideBar(state) {
      return state.permissionRoutes.filter((it) => {
        return it.meta && !it.meta.hidden
      })
    },
    getPermissionSplitTabs(state) {
      return state.permissionRoutes.filter((it) => {
        return it.meta && !it.meta.hidden && it.children && it.children.length > 0
      })
    },
  },
  actions: {
    async getRoutes() {
      try {
        return generatorRoutes(adminRoutes)
      } catch (error) {
        console.log('Route loading failed')
        return []
      }
    },
    async initPermissionRoute() {
      // Load routes
      const accessRoutes = await this.getRoutes()
      const mapRoutes = mapTwoLevelRouter(accessRoutes)
      mapRoutes.forEach((it: any) => {
        router.addRoute(it)
      })
      // Default
      router.addRoute({
        path: '/',
        redirect: findRootPathRoute(accessRoutes),
        meta: {
          hidden: true,
        },
      })
      // This route must be placed at the end
      router.addRoute({
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        meta: {
          hidden: true,
        },
      })

      this.permissionRoutes = [...constantRoutes, ...accessRoutes]
    },
    isEmptyPermissionRoute() {
      return !this.permissionRoutes || this.permissionRoutes.length === 0
    },
    reset() {
      this.$reset()
    },
  },
})

export default usePermissionStore
