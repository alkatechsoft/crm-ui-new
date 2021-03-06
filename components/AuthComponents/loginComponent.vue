<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="~/assets/images/alkatech-logo.png" alt="alkatech-logo">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account

        </h2>
      </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input v-model.lazy="email" id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-denim-500 focus:border-denim-500 focus:z-10 sm:text-sm" placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model.lazy="password" id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-denim-500 focus:border-denim-500 focus:z-10 sm:text-sm" placeholder="Password ******">
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <nuxt-link class="font-medium text-denim-600 hover:text-denim-500"  to='/authentication/forget-password'> Forgot your password?</nuxt-link>
          </div>
        </div>

        <div>
          <button @click="onUserLogin" type="button" class="btn-denim">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
           <font-awesome-icon icon="lock" class="text-denim-800  group-hover:text-denim-300" />
          </span>
            Sign in
          </button>
        </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "loginComponent",

      data(){
          return{
            email:'developer@gmail.com',
            password:'123456789',
          }
      },

      methods:{

        async onUserLogin() {
          try {
            let response = await this.$auth.loginWith('local', { data: {'email':this.email, 'password':this.password} })
            if(response.data.response_body !==''){
              this.$toast.success('Welcome  ' + this.$auth.user.username)
              this.$router.push('/backend/dashboard');
            }
          } catch (err) {
            console.log(err)
            this.$toast.error(err)
          }
        }
      },
    }
</script>

<style scoped>

</style>
