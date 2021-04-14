<template>

  <div class="relative   pb-32 pt-0 md:pt-0 text-black dark:bg-gray-800 dark:text-white">
    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <!-- <div class=" bg-denim-400 mb-0 px-6 py-6">
      </div> -->
      <div class="pt-4 pl-5 pr-5 pb-0 flex flex-wrap w-12/12 items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <admin-components-track-campaigns-campaign />
      </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div>
           
          <div class="flex flex-wrap">
            
            <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
              <!-- <admin-components-cards-card-bar-chart/> -->
            </div>
            <!-- <div class="w-full xl:w-4/12 px-4">
              <admin-components-cards-card-page-visits />
            </div> -->
          </div>
        </div>
      </div>
    </section>
    <!-- <b-alert
                        :show="dismissCountDown"
                        dismissible
                        variant="success"
                        @dismissed="dismissCountDown=0"
                        @dismiss-count-down="countDownChanged"
                        class="elementToFadeInAndOut alert-custom-position mt-2"
                        v-if=""
                      >
                        <p variant="success" class="text-float"
                        > <i class="fa fa-smile" /> Added To Queue successfully
                        </p>
                        <b-progress
                          variant="warning"
                          :max="dismissSecs"
                          :value="dismissCountDown"
                          height="4px"
                        ></b-progress>
                      </b-alert> -->
  </div>
</template>


<script>

    export default {
        name: "dashboard",
      layout: 'AdminLayouts/masterLayout',
        head () {
        return {
          title: this.app_title,
          link: [
            { rel: 'icon', type: 'image/x-icon', href: this.app_icon }
          ]
        }
      },
    mounted() {
        this.$nuxt.$emit('changeTitle',"Dashboard")
        this.notifyAdmin(this.flag)
    console.log('dashboard ::::::::::::::::::', this.$auth.user.id)

        },
        methods:{
        notifyAdmin(flag){
              var myVar = '';
              myVar = setInterval(this.checkNotification(flag), 3000);
            },
        checkNotification(flag){
          if(flag){
            return
          }
        var scheduledtime = Date.now()
        console.log("Hello!"+ Date.now());  
        if(scheduledtime == Date.now()){
        console.log("scheduled!"+ Date.now());
      }
    }
  } 
}
</script>

<style scoped>

</style>
