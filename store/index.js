//state
export const state=()=>({
  appinfo:[],

})

//getters
export const getters = {


}
//actions
export const actions={

  async getAppData({ $axios }) {
    const appInfo = await $axios.$post('lcrm-list-app-setting')
    commit("updateAppSetting",appInfo)

  }


}

//mutations
export const mutations={
  updateAppSetting(state, appdata){
    state.appinfo=appdata

  }
}
