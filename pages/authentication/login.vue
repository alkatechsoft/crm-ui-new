<template>
  <AuthComponentsLoginComponent :var4="$store.state.var4" :var1="$store.state.var1" :var2="$store.state.var2" />
</template>

<script>
    export default {
      data(){
        return {
          var1:null,
          var2:null
        }
      },
 
        name: "login",
        layout: 'AuthLayouts/masterLayout',
        mounted(){
          this.listGlobalData();
        },
        methods:{
           listGlobalData(){
           this.$axios.post('lcrm-app-setting').then((response)=>{
             if(response.data.response_code === 200){
             console.log('responce : ', response.data)
             this.var1 = response.data.response_body.app_logo
             }

        });
        },
        }

    }
</script>

<style scoped>

</style>  

