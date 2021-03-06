<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="~/assets/images/alkatech-logo.png" alt="alkatech-logo">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Reset Your Password
        </h2>
      </div>


      <div class="rounded-md shadow-sm -space-y-px">
        <div v-if="!toggler">
          <label for="email-address" class="sr-only">Email address</label>
          <input v-model.lazy="email" id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-denim-500 focus:border-denim-500 focus:z-10 sm:text-sm" placeholder="Email address">
        </div>
      </div>

      <div v-if="!toggler"  class="flex items-center justify-between">
        <div class="text-sm">
          <nuxt-link class="font-medium text-denim-600 hover:text-denim-500"  to='/authentication/login'>Back to login</nuxt-link>
        </div>
      </div>

      <div>
        <button v-if="!toggler" @click="SendOTP" type="button" class="btn-denim">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
           <font-awesome-icon icon="lock" class="text-denim-800  group-hover:text-denim-300" />
          </span>
          Send OTP
        </button>
      </div>



      <AuthComponentsResetPassword v-if="toggler"/>

    </div>
  </div>
</template>

<script>
    export default {
        name: "forget-password",
      layout: 'AuthLayouts/masterLayout',
      auth:'guest',
      data(){
        return{
          email:'developer@gmail.com',
          toggler:false,
        }
      },

      validators: {
        email: function (value) {
          return Validator.value(value).required().email(value);
        },
        // 'repeat, password': function (repeat, password) {
        //   if (this.submitted || this.validation.isTouched('repeat')) {
        //     return Validator.value(repeat).required().match(password);
        //   }
        // }
      },

      methods:{

        SendOTP(){
          // this.toggler=!this.toggler
          this.$validate()
        }
      }
    }
</script>

<style scoped>

</style>
