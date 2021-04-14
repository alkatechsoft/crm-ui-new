<template>
  <div class="relative   pb-32 pt-0.5 md:pt-24 text-black dark:bg-gray-800 dark:text-white">

    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <div class=" bg-denim-400 mb-0 px-6 py-6">
        <div class="text-center flex justify-between" v-if="isListTemplate">

          <h6 class="text-white text-xl font-bold uppercase "> Edit Template </h6>
          <div >
            <button
              class="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              @click="backToList()"
            >
              back
            </button>
          </div>
        </div>
      </div>

      <div class="flex-auto px-4 lg:px-10 py-10 pt-0 pt-5">
      <AdminComponentsTemplateComponentsListTemplate v-if="!isListTemplate" />
        <AdminComponentsTemplateComponentsEditTemplate v-if="isListTemplate" :prop-template-id="updatetemplateId"/>
      </div>
    </section>
  </div>

</template>

<script>

    export default {
        name: "list-templates",
        layout: 'AdminLayouts/masterLayout',
      head () {
            return {
              title: this.app_title,
              link: [
                { rel: 'icon', type: 'image/x-icon', href: this.app_icon }
              ]
            }
          },
      data(){
          return{
            updatetemplateId:null,
            isListTemplate:false,
            app_title:this.$store.state.appinfo.appName +' | List Template',
            app_icon:this.$store.state.appinfo.appFavicon,
          }

      },


      mounted() {
        this.$nuxt.$emit('changeTitle',"List Templates");
        this.isListVisible()
        },

      created() {
        this.$nuxt.$on('emitEditTemplate', (templateId) => {
          this.updatetemplateId = templateId;
          this.isListVisible()

        })
      },
      methods:{

        backToList(){
          this.updatetemplateId = null;
          this.$nuxt.$emit('emitEditTemplate', null)
          this.isListTemplate=false;


        },

        isListVisible(){
          if ( this.updatetemplateId != 'undefined' && this.updatetemplateId != null){
            this.isListTemplate=true;
          }
          else{
            this.isListTemplate=false;
          }
        }
      }
    }
</script>

<style scoped>

</style>
