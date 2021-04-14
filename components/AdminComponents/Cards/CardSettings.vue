<template>
  <div class="relative   pb-32 pt-0.5 md:pt-24 text-black dark:bg-gray-800 dark:text-white">

    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <div class=" bg-denim-400 mb-0 px-6 py-6">
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 mt-3 ">
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form class="my" @submit.prevent="handleSubmit(updateProfileData)">
          
            <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Profile Setting {{form}}
            </h6>
            <b-row>
              <b-col xl="4" sm="6">
                <ValidationProvider name="User Name" rules="required" v-slot="{ errors }">
                  <b-form-group id="input-group-6" label="User Name:" label-for="input-6">
                    <b-form-input
                      id="input-6"
                      v-model="form.username"
                      placeholder="Enter User Name"
                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
         
                 <b-col xl="4" sm="6">
                <ValidationProvider name="Email" rules="" v-slot="{ errors }">
                  <b-form-group id="input-group-6" label="Email:" label-for="input-6">
                    <b-form-input
                      id="input-6"
                      v-model="form.email"
                      placeholder="Enter App Name"
                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
               <b-col xl="4" sm="6">
                <ValidationProvider name="First Name" rules="" v-slot="{ errors }">
                  <b-form-group id="input-group-6" label="First Name:" label-for="input-6">
                    <b-form-input
                      id="input-6"
                      v-model="form.first_name"
                      placeholder="Enter App Name"
                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
               <b-col xl="4" sm="6">
                <ValidationProvider name="Last Name" rules="" v-slot="{ errors }">
                  <b-form-group id="input-group-6" label="Last Name:" label-for="input-6">
                    <b-form-input
                      id="input-6"
                      v-model="form.last_name"
                      placeholder="Enter Last Name"
                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
                 
            </b-row>
            <hr class="mt-6 border-b-1 border-gray-400" />

        <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
          Update Password
        </h6>
            <b-row>
              <b-col xl="4" sm="6">
                <ValidationProvider name="newpassword" rules="alpha_num|min:7" v-slot="{ errors }">
                  <b-form-group id="input-group-6" label="New password:" label-for="input-6">
                    <b-form-input
                      id="input-6"
                      v-model="confirmPassword"
                       type="password"
                      placeholder="New Password"
                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
               <b-col xl="4" sm="6">
                <ValidationProvider name="Confirm password" rules="confirmed:newpassword" v-slot="{ errors }">
                  <b-form-group id="input-group-6" label="Confirm password:" label-for="input-6">
                    <b-form-input
                      id="input-6"
                      v-model="form.password"
                       type="password"
                      placeholder="Confirm Password"
                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
<hr class="mt-6 border-b-1 border-gray-400" />

        <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
          Contact Information
        </h6>
         <b-row>
              <b-col xl="12" sm="12">
                <ValidationProvider name="Address" rules="" v-slot="{ errors }">
                  <b-form-group id="input-group-6" label="Address:" label-for="input-6">
                    <b-form-textarea
                      id="input-6"
                      v-model="form.meta_address"
                      placeholder="Address"
                    ></b-form-textarea>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <b-col xl="6" sm="6">
                <ValidationProvider name="City" rules="" v-slot="{ errors }">
                  <b-form-group id="input-group-6" label="City:" label-for="input-6">
                    <b-form-input
                      id="input-6"
                      v-model="form.meta_city"
                      placeholder="City"
                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
               <b-col xl="6" sm="6">
                <ValidationProvider name="country " rules="" v-slot="{ errors }">
                  <b-form-group id="input-group-6" label="country :" label-for="input-6">
                    <b-form-input
                      id="input-6"
                      v-model="form.meta_country "
                      placeholder="country "
                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <b-col xl="6" sm="6">
                <ValidationProvider name="Pin Code " rules="" v-slot="{ errors }">
                  <b-form-group id="input-group-6" label="Pin Code :" label-for="input-6">
                    <b-form-input
                      id="input-6"
                      v-model="form.meta_pincode "
                      placeholder="Pin Code"
                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <b-col xl="12" sm="12">
                <ValidationProvider name="About Me " rules="" v-slot="{ errors }">
                  <b-form-group id="input-group-6" label="About Me :" label-for="input-6">
                    <b-form-textarea
                      id="input-6"
                      v-model="form.meta_aboutme"
                      placeholder="About Me"
                    ></b-form-textarea>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>



            <b-row>
              <b-col>
                <b-button type="submit" variant="primary">Submit</b-button>
              </b-col>
            </b-row>
          </b-form>
        </ValidationObserver>
      </div>
    </section>
  </div>
</template>

<script>
export default {
     data () {
        return {
          form:{
           id:'',
           username:'',
           first_name:'',
           last_name:'',
           email:'',
           meta_address:'',
           meta_city:'',
           meta_country:'',
           meta_pincode:'',
           meta_aboutme:'',
           password:''
        },
      confirmPassword:"",

        }
      },
       mounted(){
          console.log('user info',this.$auth.user)
          this.form.id=this.$auth.user.id
          this.form.username=this.$auth.user.username
          this.form.first_name=this.$auth.user.first_name
          this.form.last_name=this.$auth.user.last_name
          this.form.email=this.$auth.user.email
        },
        methods:{
          
         
           updateProfileData(){
          this.$axios.post('edit-client',this.form
          ).then((response)=>{
            this.$toast.success(response.data.response_message)
          }).catch(function (error){
            console.log( error);
          });
        },
        }

}
</script>