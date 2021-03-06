<template>
  <div>

    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input v-model.lazy="otp" id="otp" name="otp" type="email" autocomplete="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-denim-500 focus:border-denim-500 focus:z-10 sm:text-sm" placeholder="OTP">
      </div>
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input v-model.lazy="password" id="email-address" name="password" type="password" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-denim-500 focus:border-denim-500 focus:z-10 sm:text-sm" placeholder="Password ******">
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input v-model.lazy="confirmPassword" id="password" name="confirmPassword" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-denim-500 focus:border-denim-500 focus:z-10 sm:text-sm" placeholder="Confirm Password ******">
      </div>
    </div>
    <br>
    <div class="flex items-center justify-between">
      <div class="text-sm">
        <nuxt-link class="font-medium text-denim-600 hover:text-denim-500"  to='/authentication/login'>Back to login</nuxt-link>
      </div>
      <div class="text-sm">
        <a class="font-medium text-denim-600 hover:text-denim-500 cursor-pointer	"   @click="SendOTP">Resend OTP</a>

      </div>
    </div>
    <br>
    <div>
      <button  type="button" class="btn-denim">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
           <font-awesome-icon icon="key" class="text-denim-800  group-hover:text-denim-300" />
          </span>
        Reset Password
      </button>
    </div>

  </div>

</template>

<script>
    export default {
        name: "resetPassword"
    }
</script>

<style scoped>

</style>
