<template>
  <div class="relative   pb-32 pt-0.5 md:pt-24 text-black dark:bg-gray-800 dark:text-white">

    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <div class=" bg-denim-400 mb-0 px-6 py-6">
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 mt-3 ">
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form class="my" @submit.prevent="handleSubmit(update_mail_config)">
            <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Facebook Feed Configuration feed_img : {{form.feed_img}}
            </h6>
          <b-row>
            <b-col xl="4" sm="6">
              <ValidationProvider name="Feed Title" rules="required" v-slot="{ errors }">
                <b-form-group id="input-group-6" label="Feed Title:" label-for="input-6">
                  <b-form-input
                    id="input-6"
                    v-model="form.facebook_title"
                    placeholder="Enter Feed Title"

                  ></b-form-input>
                  <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </b-col>
              <b-col xl="12" sm="12">
              <ValidationProvider name="Feed Description" rules="required" v-slot="{ errors }">
                <b-form-group id="input-group-6" label="Feed Description:" label-for="input-6">
                  <b-form-textarea
                    id="input-6"
                    v-model="form.feed_desc"
                    placeholder="Enter Description"

                  ></b-form-textarea>
                  <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </b-col>
             <b-col xl="12" sm="12">
              <ValidationProvider name="Feed Image" rules="" v-slot="{ errors }">
                <b-form-group id="input-group-6" label="Feed Image:" label-for="input-6">
                  <b-form-file
                    multiple
                    id="input-feed-img"
                    v-model="form.feed_Image"
                    @change=""
                    placeholder="Enter Image"

                  ></b-form-file>
                  <span class="text-float">{{ errors[0] }}</span>
                </b-form-group>
              </ValidationProvider>
            </b-col>
           

            
            

          </b-row>
            
       <b-row>
         <b-col>
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

      head () {
        return {
          title: this.app_title,
          link: [
            { rel: 'icon', type: 'image/x-icon', href: this.app_icon }
          ]
        }
      },


        data() {
        return {
                form: {
                  feed_title:'',
                  feed_desc:'',
                  feed_Image:[]
                },
                app_title:this.$store.state.appinfo.appName + ' | Facebook Feed Configuration',
          }
      },
      mounted(){

        this.fetchFacebookFeedData();
        this.$nuxt.$emit('changeTitle', "app configuration")
      },
      methods: {

    onLogoSelect(el) {
   const reader = new FileReader();
    const file = el.target.files[0];
    // reader.onload = this.handleReaderLoad1;
    reader.readAsDataURL(file);
    this.handleReaderLoad1(el)
    
  },
    onFaviconSelect(el) {
    const reader = new FileReader();
    const file = el.target.files[0];
if(file.size < 100000){
    this.faviconSizeMsg = false;
    reader.onload = this.handleReaderLoad2;
    reader.readAsDataURL(file);
    this.handleReaderLoad2(el)
} else {
      // alert('high size');
      this.faviconSizeMsg = true;
    }
  },
    handleReaderLoad1(e) {
      // 
      this.previewlogo = true;
      var logoFilePayload = e.target.result;
      this.form.app_logo = logoFilePayload;
      var logoImg = document.getElementById("previewAppLogo");
      logoImg.src = logoFilePayload;
      console.log('nedddw',logoFilePayload)
      const file = e.target.files[0];
      console.log('getfileSize',file.size)
    if(file.size > 34193){
    console.log('old-image',this.old_logo)
    this.form.app_logo = this.old_logo;
    logoImg.src = this.form.app_logo; 
    } 
    },
  handleReaderLoad2(e) {
        this.previewfavicon = true;
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
      },
        fetchFacebookFeedData(){
        // Set the initial number of items
        this.$axios.post('lcrm-list-app-setting',
        ).then((response)=>{

          var logoImg = document.getElementById("previewAppLogo");
          logoImg.src = this.form.app_logo;

          var favImg = document.getElementById("previewFavIcon");
          favImg.src = this.form.app_favicon;
             this.previewlogo=true
             this.previewfavicon=true
          var temp={'appLogo': this.form.app_logo , 'appFavicon':this.form.app_favicon,'appName':this.form.app_title}
          this.$store.commit('updateAppSetting',temp);
          this.app_title=this.$store.state.appinfo.appName + ' | Feed Configuration',
          this.app_icon=this.$store.state.appinfo.appFavicon;

        }).catch(function (error){
          console.log( error);
        });
      },
      async update_mail_config() {
          try {
              const formData = new FormData();
              formData.append("fee_title", this.form.app_domain);
              let response = await this.$axios.post('lcrm-update-app-setting', formData)
              if(response.data.response_body !==''){
                this.$toast.success(response.data.response_message)
                this.fetchFacebookFeedData();
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
