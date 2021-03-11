<template>

  <div class="relative   pb-32 pt-0 md:pt-0 text-black dark:bg-gray-800 dark:text-white">
    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <div class=" bg-denim-400 mb-0 px-6 py-6">
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-5">
        <div>
          <div class="flex flex-wrap">
            <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <admin-components-cards-card-line-chart/>
            </div>
            <div class="w-full xl:w-4/12 px-4">
              <admin-components-cards-card-page-visits />
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-alert
                        :show="dismissCountDown"
                        dismissible
                        variant="success"
                        @dismissed="dismissCountDown=0"
                        @dismiss-count-down="countDownChanged"
                        class="elementToFadeInAndOut alert-custom-position mt-2"
                        v-if="isMaild"
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
                      </b-alert>
  </div>
</template>


<script>

    export default {
        name: "dashboard",
      layout: 'AdminLayouts/masterLayout',

      mounted() {
        this.$nuxt.$emit('changeTitle',"Dashboard")
        }

    }
</script>

<style scoped>

</style>
