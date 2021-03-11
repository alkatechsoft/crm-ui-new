<template>
  <!-- Navbar -->
  <nav
    class="absolute top-0 left-0 w-full z-10 bg-denim-900 md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4 hidden md:block"
  >

    <div
      class="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4"
    >

                  <font-awesome-icon icon="bars" class="" />
 
      <!-- Brand -->
      <a
        class="text-white text-sm uppercase hidden lg:inline-block font-semibold "
        href="javascript:void(0)"
      >
        {{pageTitle}}
      </a>

      <!-- User -->
      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">

        <admin-components-dropdowns-user-dropdown />
      </ul>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>


export default {
props:['pageTitle']
};
</script>
