<template>
  <div class="relative   pb-32 pt-0.5 md:pt-24 text-black dark:bg-gray-800 dark:text-white">
    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <div class=" bg-denim-400 mb-0 px-6 py-6">

      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <AdminComponentsSubscribersAddSubcribers/>
      </div>
    </section>
  </div>



</template>

<script>
    export default {
        name: "add-new-client",
      layout: 'AdminLayouts/masterLayout',
      head () {
            return {
              title: this.app_title,
              link: [
                { rel: 'icon', type: 'image/x-icon', href: this.app_icon }
              ]
            }
          },
          data() {
        return {
          app_title:this.$store.state.appinfo.appName +' | Add New Subscriber',
          app_icon:this.$store.state.appinfo.appFavicon,
          }
        },
      mounted() {
        this.$nuxt.$emit('changeTitle', "Add new Subscriber")

        
      }
    }
</script>

<style scoped>

</style>
