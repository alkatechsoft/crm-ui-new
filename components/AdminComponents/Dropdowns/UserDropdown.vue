<template>
  <div>
    <a
      class="text-gray-600 block"
      href="#pablo"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="..."
            class="w-full rounded-full align-middle border-none shadow-lg"
            :src="image"
          />
        </span>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
      >
        Profile
      </a>
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
      >
        Notifications
      </a>

      <div class="h-0 my-2 border border-solid border-gray-200" />
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
      >
        <button @click="onLogout" class="btn-denim  ">logout</button>
      </a>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

import image from "assets/images/alkatech-logo.png";

export default {
  data() {
    return {
      dropdownPopoverShow: false,
      image: image,
    };
  },
  mounted(){
  console.log('login id :: ',this.$auth);
  this.showNotification(this.$auth.$state.user.id);
  },
  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
    showNotification(user_id){
      console.log('user id is ::',user_id);
    },
    notification (user_id) {

    setInterval(this.showNotification(user_id), 1000);

    },
    async onLogout() {
      try {
        let response = await this.$auth.logout('local')
        console.log(response)
        this.$toast.success('Logout successful.')
        this.$router.push('/authentication/login');
      } catch (err) {
        this.$toast.error(err)
      }
    },
  },

};
</script>
