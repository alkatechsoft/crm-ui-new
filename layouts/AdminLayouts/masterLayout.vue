<template>

  <div class="container-fluid bg-white dark:bg-gray-800">
    <sidebar/>

    <div class="relative md:ml-64 bg-white dark:bg-gray-800">
      <AdminNavbar :page-title="pageTitle"/>
      <header-stats v-if="isDashboard"/>
      <div class="">
        <Nuxt v-on:changeTitle="updatePageTitle($event)"/>
      </div>
      <div class="px-4 md:px-10 mx-auto w-full-m-24">
        <footer-admin/>
      </div>
    </div>

  </div>
</template>


<script>

  import AdminNavbar from "./AdminNavbar";
  import Sidebar from "./Sidebar";
  import HeaderStats from "./HeaderStats";
  import FooterAdmin from "./FooterAdmin";


  export default {
    name: "masterLayout",
    data() {
      return {
        pageTitle: 'dashboard',
        isDashboard: true,
      }
    },
    components: {
      AdminNavbar,
      Sidebar,
      HeaderStats,
      FooterAdmin,
    },
    methods: {
      updatePageTitle(title) {

        this.pageTitle = title;
      },

    },
    created() {
      this.$nuxt.$on('changeTitle', (title) => {
        this.pageTitle = title;
        if (title === "Dashboard") {
          this.isDashboard = true;
        } else {
          this.isDashboard = false
        }

      })
    }

  };
</script>

<style scoped>

</style>
