<template>
  <form>
    <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
      Subscriber's Information
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-6/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Full Name <span class="text-red-800 text-lg">*</span>
          </label>
      <ValidationProvider name="Name" :rules="{ required: true }" v-slot="{ errors }">

          <input
            type="text"
            class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
            placeholder="xyz"
            v-model="username"
          />
        <span>{{ errors[0] }}</span>

    </ValidationProvider>

        </div>
        </div>
      <div class="w-full lg:w-6/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Email address <span class="text-red-800 text-lg">*</span>
          </label>
      <ValidationProvider name="Email" :rules="{ required: true, email: true }" v-slot="{ errors }">
          <input
            type="email"
            class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
            placeholder="xyz@example.com"
            v-model="email"
          />
        <span>{{ errors[0] }}</span>

      </ValidationProvider>
        </div>
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Mobile Number
          </label>
          <input
            type="text"
            class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
            placeholder="000 000 0000"
            v-model="contact"
          />
        </div>
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <div class="relative w-full mb-3">
          <label
            class="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Category  <span class="text-red-800 text-lg">*</span>
          </label>
          <v-select 
                    class="style-chooser px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    v-model="categories"
                    placeholder="select category"
                    :options="category"
                    :filterable="true"
                    :multiple="true"
                    :taggable="true"
                    :create-option="option => ({value: option.toLowerCase(), label: option})"
          >
          </v-select>
        </div>
      </div>
    </div>


    <div  class="float-right">
      <button
        class="bg-green-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
        @click="submitSubscriber()"
      >
        save
      </button>

      <button
        class="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
        @click="resetfields()"
      >
        reset
      </button>

    </div>


  </form>
</template>

<script>
    export default {
        name: "addSubcribers",

      data(){
          return{
            categories: [],
            category: [],
            contact:null,
            email:null,
            username: null,
            value: ''
          }
      },

      mounted() {
        this.fetchSubscriberCategory();
      },
      methods:{
          fetchSubscriberCategory(){
            this.$axios.post('lcrm-list-parent-category').then((response) => {
              if (response.data.response_code === 200) {
                response.data.response_body.map((data) => this.category.push({value: data.id, label: data.category_name}));
              } else {
                this.category.push({value: null, label: ' 👀 No Category Found'})
              }
            }).catch(function (error) {
              console.log(error);
            });
          },

        resetfields(){
          this.categories= [];
          this.contact=null;
          this.email=null;
          this.username=null;
        },



        async submitSubscriber() {
          try {

            if (this.categories.length>0  && this.email  && this.username){
              var category_name = [];
              for (var i = 0; i < this.categories.length; i++) {
                category_name[i] = this.categories[i].label
              }

              var postData={
                'email':this.email,
                'username':this.username,
                'category_name':category_name,
                'contact':this.contact,
              }
              let response = await this.$axios.post('register-client', postData)
              if(response.data.response_body !==''){
                this.$toast.success(response.data.response_message)
                this.resetfields();
              }
            }
            else
            {
              this.$toast.error('(*) fields are required')
            }

          } catch (err) {
            console.log(err)
            this.$toast.error(err)
          }
        },


      },



    }
</script>

<style scoped>

</style>
