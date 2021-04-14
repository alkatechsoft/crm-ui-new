<template>
    <AdminComponentsCardsCardSettings/>
</template>

<script>
    export default {
        name: "user-profile",
      layout: 'AdminLayouts/masterLayout',
        head () {
        return {
          title: this.app_title,
          link: [
            { rel: 'icon', type: 'image/x-icon', href: this.app_icon }
          ]
        }
      },
    }
</script>

<style scoped>

</style>
