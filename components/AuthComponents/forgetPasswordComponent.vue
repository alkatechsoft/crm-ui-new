<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="~/assets/images/alkatech-logo.png" alt="alkatech-logo">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Reset Your Password
        </h2>
      </div>

      <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
        <div class="rounded-md shadow-sm -space-y-px" v-if="!toggler">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input v-model.lazy="email" id="email-address" name="email" type="email" autocomplete="email" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-denim-500 focus:border-denim-500 focus:z-10 sm:text-sm"
                   placeholder="Email address">
            <span>{{ errors[0] }}</span>
          </div>
        </div>
      </ValidationProvider>


      <div class="rounded-md shadow-sm -space-y-px" v-if="toggler">
        <ValidationObserver>
          <ValidationProvider name="otp" rules="required|numeric" v-slot="{ errors }">
            <div>
              <label for="email-address" class="sr-only">OTP</label>
              <input v-model.lazy="otp" id="otp" name="otp" type="text" autocomplete="text" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-denim-500 focus:border-denim-500 focus:z-10 sm:text-sm"
                     placeholder="OTP">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="email" rules="required|password:@confirm" v-slot="{ errors }">
            <div>
              <label for="email-address" class="sr-only">Password</label>
              <input v-model.lazy="password" id="password" name="password" type="password" autocomplete="email" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-denim-500 focus:border-denim-500 focus:z-10 sm:text-sm"
                     placeholder="Password ******">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="confirm" rules="required" v-slot="{ errors }">
            <div>
              <label for="password" class="sr-only">Confirm Password</label>
              <input v-model.lazy="confirmPassword" id="confirm_password" name="confirmPassword" type="password"
                     autocomplete="current-password" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-denim-500 focus:border-denim-500 focus:z-10 sm:text-sm"
                     placeholder="Confirm Password ******">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </ValidationObserver>
      </div>


      <div class="flex items-center justify-between" >
        <div class="text-sm">
          <nuxt-link class="font-medium text-denim-600 hover:text-denim-500" to='/authentication/login'>Back to login
          </nuxt-link>
        </div>
        <div class="text-sm" v-if="toggler">
          <a class="font-medium text-denim-600 hover:text-denim-500" @click="SendOTP">Resend OTP</a>
        </div>
      </div>

      <div>
        <button v-if="!toggler" @click="SendOTP" type="button" class="btn-denim">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
           <font-awesome-icon icon="lock" class="text-denim-800  group-hover:text-denim-300"/>
          </span>
          Send OTP
        </button>

        <button  v-if="toggler" @click="resetPassword()" type="button" class="btn-denim">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
           <font-awesome-icon icon="key" class="text-denim-800  group-hover:text-denim-300"/>
          </span>
          Reset Password
        </button>
      </div>


    </div>
  </div>
</template>

<script>

  import { extend } from 'vee-validate';
  extend('password', {
    params: ['target'],
    validate(value, {target}) {
      return value === target;
    },
    message: 'Password confirmation does not match'
  });


  export default {
        name: "forgetPasswordComponent",

    data() {
      return {
        email: '',
        toggler: false,
        otp: '',
        password: '',
        confirmPassword: '',
      }
    },
    methods: {
      async SendOTP() {
        try {
          if (this.email) {

            var postData = {
              'email': this.email,
            }
            let response = await this.$axios.post('forget-password', postData)
            if (response.data.response_body !== '' && response.data.response_code == 200) {
              this.$toast.success(response.data.response_message)
              this.toggler = true;
            } else {
              this.$toast.error(response.data.response_message)
            }
          } else {
            this.$toast.error('(*) fields are required')
          }

        } catch (err) {
          console.log(err)
          this.$toast.error(err)
        }
      },

      async resetPassword() {
        try {
          if (this.email && this.otp && this.password) {

            var postData = {
              'email': this.email,
              'otp': this.otp,
              'password': this.password,
            }
            let response = await this.$axios.post('reset-password', postData)
            if (response.data.response_body !== '' && response.data.response_code == 200) {
              this.$toast.success(response.data.response_message)
              this.onUserLogin()
              this.toggler = true;
            } else {
              this.$toast.error(response.data.response_message)
            }
          } else {
            this.$toast.error('(*) fields are required')
          }

        } catch (err) {
          console.log(err)
          this.$toast.error(err)
        }
      },

      async onUserLogin() {
        try {
          let response = await this.$auth.loginWith('local', { data: {'email':this.email, 'password':this.password} })

          if (response.data.response_body !== '' && response.data.response_code == 200) {
            this.$toast.success(response.data.response_message)
            this.toggler = true;
            this.$router.push('/backend/dashboard');
          } else {
            this.$toast.error(response.data.response_message)
          }


        } catch (err) {
          console.log(err)
          this.$toast.error(err)
        }
      }
    }
  }
</script>

<style scoped>

</style>
