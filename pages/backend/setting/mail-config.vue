<template>
  <div class="relative   pb-32 pt-0.5 md:pt-24 text-black dark:bg-gray-800 dark:text-white">
    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <div class=" bg-denim-400 mb-0 px-6 py-6">
      </div> 
      <div class="flex-auto px-4 lg:px-10 py-10 mt-3 pt-5">
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form class="my" @submit.prevent="handleSubmit(update_mail_config)">
            <!-- {{form}} -->
            <!-- {{form.app_logo}} -->
            <!-- {{form.app_favicon}}
            formData::{{formData}} -->
          <b-row>
            <b-col xl="4" sm="6">
               <ValidationProvider name="Company Name" rules="required" v-slot="{ errors }">
                <b-form-group id="input-group-1" label="Company Name:" label-for="input-1">
                  <b-form-input
                    id="input-1"
                    v-model="form.app_company"
                    placeholder="Enter Company Name"
                    
                  ></b-form-input>
             <span class="text-float">{{ errors[0] }}</span>

                </b-form-group>
               </ValidationProvider>
            </b-col>
             <b-col xl="4" sm="6">
               <ValidationProvider name="App Domain" rules="required" v-slot="{ errors }">

                <b-form-group id="input-group-2" label="App Domain:" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    disabled
                    v-model="form.app_domain"
                    placeholder="Enter App Domain"
                    
                  ></b-form-input>
                 <span class="text-float">{{ errors[0] }}</span>

                </b-form-group>
               </ValidationProvider>
            </b-col> 
            <b-col xl="4" sm="6">
               <ValidationProvider name="App Domain" rules="required" v-slot="{ errors }">

                <b-form-group id="input-group-2" label="App Url:" label-for="input-2">
                  <b-form-input
                    id="input-2-2"
                    disabled
                    v-model="form.app_url"
                    placeholder="Enter App Url"
                    
                  ></b-form-input>
                 <span class="text-float">{{ errors[0] }}</span>

                </b-form-group>
               </ValidationProvider>
            </b-col> 
             <b-col xl="4" sm="6">
               <ValidationProvider name="Guest Login" rules="required" v-slot="{ errors }">

                <b-form-group id="input-group-3" label="App Guest Login:" label-for="input-3">
                  <b-form-input
                    id="input-3"
                    v-model="form.app_guest_login"

                    placeholder="Enter App Guest Login"
                    
                  ></b-form-input>
               <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
               </ValidationProvider>
            </b-col> 
             <b-col xl="4" sm="6">
               <ValidationProvider name="App Title" rules="required" v-slot="{ errors }">
                <b-form-group id="input-group-6" label="App Title:" label-for="input-6">
                  <b-form-input
                    id="input-6"
                    v-model="form.app_title"
                    placeholder="Enter App Title"
                    
                  ></b-form-input>
                 <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
               </ValidationProvider>
            </b-col> 
            <b-col xl="4" sm="6" >
               <ValidationProvider name="App Email" rules="required" v-slot="{ errors }">
                <b-form-group id="input-group-7" label="App Email:" label-for="input-7">
                  <b-form-input
                    id="input-7"
                    v-model="form.app_email"
                    placeholder="Enter App Email"
                  ></b-form-input>
                 <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
               </ValidationProvider>
            </b-col>
              <b-col xl="4" sm="6">
               <ValidationProvider name="Mailer Host" rules="required" v-slot="{ errors }">
                <b-form-group id="input-group-8" label="App Mailer Host:" label-for="input-8">
                  <b-form-input
                    id="input-8"
                    v-model="form.app_mailer_host"
                    placeholder="Enter App Mailer Host"
                    
                  ></b-form-input>
                 <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
               </ValidationProvider>
            </b-col>
             <b-col xl="4" sm="6">
               <ValidationProvider name="Mailer Login" rules="required" v-slot="{ errors }">
                <b-form-group id="input-group-9" label="App Mailer Login:" label-for="input-9">
                  <b-form-input
                    id="input-9"
                    v-model="form.app_mailer_login"
                    placeholder="Enter App Mailer Login"
                    
                  ></b-form-input>
                 <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
               </ValidationProvider>
            </b-col> 
            <b-col xl="4" sm="6" >
               <ValidationProvider name="Mailer Login" rules="required" v-slot="{ errors }">
                <b-form-group id="input-group-10" label="App Mailer Password:" label-for="input-10">
                  <b-form-input
                    id="input-10"
                    v-model="form.app_mailer_pass"
                    placeholder="Enter App Mailer Password"
                    
                  ></b-form-input>
                 <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
               </ValidationProvider>
            </b-col>
              <b-col xl="4" sm="6">
               <ValidationProvider name="Mailer Mail" rules="required" v-slot="{ errors }">

                <b-form-group id="input-group-11" label="App Mailer Mail:" label-for="input-11">
                  <b-form-input
                    id="input-11"
                    v-model="form.app_mailer_mail"
                    placeholder="Enter App Mailer Mail"
                  ></b-form-input>
                 <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
               </ValidationProvider>
            </b-col>
             <b-col xl="4" sm="6">
               <ValidationProvider name="Mailer Port" rules="required" v-slot="{ errors }">
                <b-form-group id="input-group-12" label="App Mailer Port:" label-for="input-12">
                  <b-form-input
                    id="input-12"
                    v-model="form.app_mailer_port"
                    placeholder="Enter App Mailer Port">
                  </b-form-input>
                 <span class="text-float">{{ errors[0] }}</span>

                </b-form-group>
               </ValidationProvider>
            </b-col> 
            <b-col xl="4" sm="6" >
               <ValidationProvider name="Mailer Encrypt" rules="required" v-slot="{ errors }">
                <b-form-group id="input-group-13" label="App Mailer Encrypt:" label-for="input-13">
                  <b-form-input
                    id="input-13"
                    v-model="form.app_mailer_encrypt"
                    placeholder="Enter  Mailer Encrypt"
                  ></b-form-input>
                 <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
               </ValidationProvider>
            </b-col>
         <b-col xl="6" s m="6" >
               
               <ValidationProvider name="App Logo" rules="required" v-slot="{ errors }">
                <b-form-group id="input-group-4" label="App Logo:" label-for="input-4">
                  <b-form-file
                    id="input-4"
                    v-model="form.app_logo"
                    placeholder="choose App Logo"
                    @change="onLogoSelect"
                  ></b-form-file>
                 <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
               <img v-show="previewlogo" src="form.app_logo" id="previewAppLogo">
               </ValidationProvider>
            </b-col>
              <b-col xl="6" sm="6">
               <ValidationProvider name="App Favicon" rules="required" v-slot="{ errors }">
                 <b-form-group  id="input-group-4" label="App Favicon:" label-for="input-5">
                  <b-form-file
                    id="input-5"
                    v-model="form.app_favicon"
                    placeholder="Choose Favicon"
                    @change="onFaviconSelect"
                  ></b-form-file>
                 <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
               <img v-show="previewfavicon" src="#" id="previewFavIcon">

               </ValidationProvider>
            </b-col>
       </b-row>
       <b-row>
         <b-col>
      <b-form-group id="input-group-14" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkboxes-14"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox  value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
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
        name: "mail-config",
        layout: 'AdminLayouts/masterLayout',
        data() {
        return {
                form: {
                  app_company:'',
                  app_domain:'',
                  app_url:'',
                  app_guest_login:'',
                  app_logo:null,
                  app_favicon:null,
                  app_title:'',
                  app_email:'',
                  app_mailer_host:'',
                  app_mailer_login:'',
                  app_mailer_pass:'',
                  app_mailer_mail:'',
                  app_mailer_port:'',
                  app_mailer_encrypt:'',
                },
                previewlogo:false,
                previewfavicon:false
          }
      },  
      mounted(){
        this.fetchMailConfigData();
      },
      methods: {
     
    onLogoSelect(el) {
    const reader = new FileReader();
    const file = el.target.files[0];
    console.log('file', file)
    reader.onload = this.handleReaderLoad1;
    reader.readAsDataURL(file);
    this.handleReaderLoad1(el)
  },
    onFaviconSelect(el) {
    const reader = new FileReader();
    const file = el.target.files[0];
    console.log('file', file)
    reader.onload = this.handleReaderLoad2;
    reader.readAsDataURL(file);
    this.handleReaderLoad2(el)
  },
    handleReaderLoad1(e) {
        this.previewlogo = true; 

        console.log("running handleReaderLoad()", e);
         var logoFilePayload = e.target.result;
        this.form.app_logo = logoFilePayload;
        var logoImg = document.getElementById("previewAppLogo");
        logoImg.src = logoFilePayload;
        
    },
  handleReaderLoad2(e) {
        this.previewfavicon = true; 

        console.log("running handleReaderLoad()", e);
         var favFilePayload = e.target.result;
       
         this.form.app_favicon = favFilePayload;
          var favImg = document.getElementById("previewFavIcon");
          favImg.src = favFilePayload;

    },
      resetfields(){
      this.form={}
      },
      onFaviconSelect11(el){
      this.app_favicon=el.target.files[0]
            console.log(el);
      },
        fetchMailConfigData(){
        // Set the initial number of items
        this.$axios.post('lcrm-list-app-setting',
        ).then((response)=>{
          this.form.app_company = response.data.response_body[0].app_company;
          this.form.app_domain = response.data.response_body[0].app_domain;
          this.form.app_url = response.data.response_body[0].app_url;
          this.form.app_guest_login = response.data.response_body[0].app_guest_login;
          this.form.app_logo = response.data.response_body[0].app_logo;
          this.form.app_favicon = response.data.response_body[0].app_favicon;
          this.form.app_title = response.data.response_body[0].app_title;
          this.form.app_email = response.data.response_body[0].app_email;
          this.form.app_mailer_host = response.data.response_body[0].app_mailer_host;
          this.form.app_mailer_login = response.data.response_body[0].app_mailer_login;
          this.form.app_mailer_pass = response.data.response_body[0].app_mailer_pass;
          this.form.app_mailer_mail = response.data.response_body[0].app_mailer_mail;
          this.form.app_mailer_port = response.data.response_body[0].app_mailer_port;
          this.form.app_mailer_encrypt = response.data.response_body[0].app_mailer_encrypt;
        
        console.log('response::',response);
        }).catch(function (error){
          console.log( error);
        });
      },
      async update_mail_config() {
          try {
              const formData = new FormData();
          formData.append("app_company", this.form.app_company);
          formData.append("app_domain", this.form.app_domain);
          formData.append("app_url", this.form.app_url);
          formData.append("app_guest_login", this.form.app_guest_login);
          formData.append("app_logo", this.form.app_logo);
          formData.append("app_favicon", this.form.app_favicon);
          formData.append("app_title", this.form.app_title);
          formData.append("app_email", this.form.app_email);
          formData.append("app_mailer_host", this.form.app_mailer_host);
          formData.append("app_mailer_login", this.form.app_mailer_login);
          formData.append("app_mailer_pass", this.form.app_mailer_pass);
          formData.append("app_mailer_mail", this.form.app_mailer_mail);
          formData.append("app_mailer_port", this.form.app_mailer_port);
          formData.append("app_mailer_encrypt", this.form.app_mailer_encrypt);

              console.log(formData);
              let response = await this.$axios.post('lcrm-update-app-setting', formData)
              if(response.data.response_body !==''){
                this.$toast.success(response.data.response_message)
                // this.resetfields();
                this.fetchMailConfigData();
              }

          } catch (err) {
            console.log(err)
            this.$toast.error(err)
          }
        },
     
      }
    }
</script>

<style scoped>
input[type=text], input[type=file]{
    box-shadow: 0 0.5rem 10px 0px rgb(0 0 0 / 15%) !important;
    padding: 20px 10px;
    border: hidden;
}
.text-float{
  color: red;
}
</style>
