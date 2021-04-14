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
            <!-- {{form}} -->
            <!-- {{form.app_logo}} -->
            <!-- {{form.app_favicon}}
            formData::{{formData}} -->
            <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Application Configuration {{logoSizeMsg}} {{logoDimensionMsg}}
            </h6>
            <b-row>
              <b-col xl="4" sm="6">
                <ValidationProvider name="App Title" rules="required" v-slot="{ errors }">
                  <b-form-group id="input-group-6" label="App Name:" label-for="input-6">
                    <b-form-input
                      id="input-6"
                      v-model="form.app_title"
                      placeholder="Enter App Name"

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

              <b-col xl="6" s m="6">

                <ValidationProvider name="App Logo" rules="" v-slot="{ errors }">
                  <b-form-group id="input-group-4" label="App Logo:" label-for="input-4">
                    <b-form-file
                      id="input-4"
                    
                      placeholder="choose App Logo"
                      @change="onLogoSelect"
                    ></b-form-file>
                    <span class="text-float">{{ errors[0] }}</span>
                    <span class="text-float" v-show="logoSizeMsg">Size Must Be Less Than 1 Mb</span>
                    <span class="text-float" v-show="logoDimensionMsg">Height *  Width should not exceed 64*230</span>
                  </b-form-group>
                  <img v-show="previewlogo" src="form.app_logo" id="previewAppLogo">
                </ValidationProvider>
              </b-col>
              <b-col xl="6" sm="6">
                <ValidationProvider name="App Favicon" rules="" v-slot="{ errors }">
                  <b-form-group id="input-group-4" label="App Favicon:" label-for="input-5">
                    <b-form-file
                      id="input-5"
                      
                      placeholder="Choose Favicon"
                      @change="onFaviconSelect"
                    ></b-form-file>
                    <span class="text-float">{{ errors[0] }}</span>
                    <span class="text-float" v-show="faviconSizeMsg">Size Must Be Less Than 1 Mb</span>

                  </b-form-group>
                  <img v-show="previewfavicon" src="#" id="previewFavIcon">

                </ValidationProvider>
              </b-col>

            </b-row>
            <br>
            <hr class="mt-6 border-b-1 border-gray-400"/>
            <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Email Configuration
            </h6>
            <b-row>

              <b-col xl="4" sm="6">
                <ValidationProvider name="Mailer Host" rules="required" v-slot="{ errors }">
                  <b-form-group id="input-group-8" label="Email Host:" label-for="input-8">
                    <b-form-input
                      id="input-8"
                      v-model="form.app_mailer_host"
                      placeholder="Enter Email Host"

                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <b-col xl="4" sm="6">
                <ValidationProvider name="Mailer Login" rules="required" v-slot="{ errors }">
                  <b-form-group id="input-group-9" label="Email Login:" label-for="input-9">
                    <b-form-input
                      id="input-9"
                      v-model="form.app_mailer_login"
                      placeholder="Enter Email Login"

                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <b-col xl="4" sm="6">
                <ValidationProvider name="Mailer Login" rules="required" v-slot="{ errors }">
                  <b-form-group id="input-group-10" label="Email Password:" label-for="input-10">
                    <b-form-input
                      id="input-10"
                      v-model="form.app_mailer_pass"
                      placeholder="Enter Email Password"

                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

              <b-col xl="4" sm="6">
                <ValidationProvider name="Mailer Port" rules="required" v-slot="{ errors }">
                  <b-form-group id="input-group-12" label="Email Port:" label-for="input-12">
                    <b-form-input
                      id="input-12"
                      v-model="form.app_mailer_port"
                      placeholder="Enter Email Port">
                    </b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>

                  </b-form-group>
                </ValidationProvider>
              </b-col>
              <b-col xl="4" sm="6">
                <ValidationProvider name="Mailer Encrypt" rules="required" v-slot="{ errors }">
                  <b-form-group id="input-group-13" label="Email Encryption:" label-for="input-13">
                    <b-form-input
                      id="input-13"
                      v-model="form.app_mailer_encrypt"
                      placeholder="Enter  Mailer Encrypt"
                    ></b-form-input>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

              <b-col xl="4" sm="6">
                <ValidationProvider name="Mailer Mail" rules="required" v-slot="{ errors }">

                  <b-form-group id="input-group-12" label="App Email Address" label-for="input-12">
                    <b-input-group class="mt-3">
                      <template #append>
                        <b-input-group-text style="box-shadow: 0 0.5rem 10px 0px rgb(0 0 0 /15%) !important;"><strong>@{{form.app_mailer_domain}}</strong>
                        </b-input-group-text>
                      </template>
                      <b-form-input
                        id="input-11"
                        v-model="form.app_mailer_mail"
                        placeholder="Enter App Email"
                      ></b-form-input>

                    </b-input-group>

                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

            </b-row>
            <br>
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

    head() {
      return {
        title: this.app_title,
        link: [
          {rel: 'icon', type: 'image/x-icon', href: this.app_icon}
        ]
      }
    },


    data() {
      return {
        form: {
          app_title: '',
          app_domain: '',
          app_url: '',
          app_logo: null,
          app_favicon: null,
          app_mailer_host: '',
          app_mailer_login: '',
          app_mailer_pass: '',
          app_mailer_mail: '',
          app_mailer_port: '',
          app_mailer_encrypt: '',
          app_mailer_domain: ''
        },
        app_logoFromdb: '',
        old_logo: '',
        old_favicon: '',
        previewlogo: false,
        logoSizeMsg: false,
        previewfavicon: false,
        logoDimensionMsg: false,
        faviconSizeMsg: false,
        app_title: this.$store.state.appinfo.appName + ' | App Configuration',
        app_icon: this.$store.state.appinfo.appFavicon,


      }
    },
    mounted() {

      this.fetchMailConfigData();
      this.$nuxt.$emit('changeTitle', "app configuration")
    },
    methods: {

      onLogoSelect(el) {

        this.previewlogo = true;
        var file = el.target.files[0];
        var reader = new FileReader();

        var logoImg = document.getElementById("previewAppLogo");
        if (file.size < 34193) {
          var baseString;
          reader.onloadend = () => {
            baseString = reader.result;

            logoImg.src = baseString;
            this.form.app_logo = baseString;
            this.logoSizeMsg = false;

          };
        } else {
          this.form.app_logo = this.old_logo;
          logoImg.src = this.form.app_logo;
          this.logoSizeMsg = true;
        }
        reader.readAsDataURL(file);

      },

      onFaviconSelect(el) {

        const file = el.target.files[0];
        const reader = new FileReader();
        var faviconImage = document.getElementById("previewFavIcon");

        if (file.size < 100000) {
          this.previewfavicon = true;
          var baseString;
          reader.onloadend = () => {

            baseString = reader.result;
            faviconImage.src = baseString;
            this.form.app_favicon = baseString;
            this.faviconSizeMsg = false;

          };
        } else {
          this.form.app_favicon = this.old_favicon;
          faviconImage.src = this.form.app_logo;
          this.faviconSizeMsg = true;
        }
      },

      handleReaderLoad2(e) {


      },
      resetfields() {
        this.form = {}
      },
      onFaviconSelect11(el) {
        this.app_favicon = el.target.files[0]

      },
      fetchMailConfigData() {
        // Set the initial number of items
        this.$axios.post('lcrm-list-app-setting',
        ).then((response) => {
          var $splited = response.data.response_body[0].app_mailer_mail.split("@");

          this.form.app_domain = response.data.response_body[0].app_domain;
          this.form.app_url = response.data.response_body[0].app_url;
          this.form.app_logo = response.data.response_body[0].app_logo;
          this.old_logo = response.data.response_body[0].app_logo;
          this.app_logoFromdb = response.data.response_body[0].app_logo;
          this.form.app_favicon = response.data.response_body[0].app_favicon;
          this.form.old_favicon = response.data.response_body[0].app_favicon;
          this.form.app_title = response.data.response_body[0].app_title;
          this.form.app_mailer_host = response.data.response_body[0].app_mailer_host;
          this.form.app_mailer_login = response.data.response_body[0].app_mailer_login;
          this.form.app_mailer_pass = response.data.response_body[0].app_mailer_pass;
          this.form.app_mailer_mail = $splited[0];
          this.form.app_mailer_domain = $splited[1];
          this.form.app_mailer_port = response.data.response_body[0].app_mailer_port;
          this.form.app_mailer_encrypt = response.data.response_body[0].app_mailer_encrypt;


          var logoImg = document.getElementById("previewAppLogo");
          logoImg.src = this.form.app_logo;

          var favImg = document.getElementById("previewFavIcon");
          favImg.src = this.form.app_favicon;
          this.previewlogo = true
          this.previewfavicon = true


          var temp = {
            'appLogo': this.form.app_logo,
            'appFavicon': this.form.app_favicon,
            'appName': this.form.app_title
          }
          this.$store.commit('updateAppSetting', temp);
          this.app_title = this.$store.state.appinfo.appName + ' | App Configuration',
            this.app_icon = this.$store.state.appinfo.appFavicon;

        }).catch(function (error) {
          console.log(error);
        });
      },
      async update_mail_config() {
        try {
          const formData = new FormData();
          formData.append("app_domain", this.form.app_domain);
          formData.append("app_url", this.form.app_url);
          // if(this.logoSizeMsg === true){
          // formData.append("app_logo", this.app_logoFromdb);

          // } else {
          // formData.append("app_logo", this.form.app_logo);

          // }
          formData.append("app_logo", this.form.app_logo);

          formData.append("app_favicon", this.form.app_favicon);
          formData.append("app_title", this.form.app_title);
          formData.append("app_mailer_host", this.form.app_mailer_host);
          formData.append("app_mailer_login", this.form.app_mailer_login);
          formData.append("app_mailer_pass", this.form.app_mailer_pass);
          formData.append("app_mailer_mail", this.form.app_mailer_mail + '@' + this.form.app_mailer_domain);
          formData.append("app_mailer_port", this.form.app_mailer_port);
          formData.append("app_mailer_encrypt", this.form.app_mailer_encrypt);


          let response = await this.$axios.post('lcrm-update-app-setting', formData)
          if (response.data.response_body !== '') {
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
  input[type=text], input[type=file] {
    box-shadow: 0 0.5rem 10px 0px rgb(0 0 0 / 15%) !important;
    padding: 20px 10px;
    border: hidden;
  }

  .text-float {
    color: red;
  }
</style>
