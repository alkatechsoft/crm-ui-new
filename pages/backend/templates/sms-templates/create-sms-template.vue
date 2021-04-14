<template>
  <div class="relative   pb-32 pt-0.5 md:pt-24 text-black dark:bg-gray-800 dark:text-white">
    <!--after upload-->
    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <div class=" bg-denim-400 mb-0 px-6 py-6">
        <div class="text-center flex justify-between">

          <div  v-if="htmlediotr">
            <button
              class="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              @click="removeSelectedFile()"
            >
              reset
            </button>

            <button
              class="bg-green-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              @click="submitTemplate()"
            >
              upload
            </button>

          </div>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">


        <div>

          <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
            Template Title : {{templateTitle}}

          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Category
                </label>
                <v-select
                  class="placeholder-gray-400 text-gray-700 h-11  bg-white text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  v-model="selectedCategory"
                  placeholder="Please select an category"
                  size="lg"
                  :options="TemplateCategory"
                  :filterable="true"
                  :multiple="true"
                  :taggable="true"
                  :create-option="
                      (option) => ({
                        value: option.toLowerCase(),
                        label: option,
                      })
                    "
                >
                </v-select>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Template Title
                </label>
                <input
                  v-model="templateTitle"
                  type="text"
                  class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  value="jesse@example.com"
                />
              </div>
            </div>
          </div>

          <hr class="mt-6 border-b-1 border-gray-400"/>

          <editor
            v-model.lazy="htmlediotr"
            api-key="no-api-key"
            :init="{
                height: 200,
                menubar: false,
                paste_data_images: false,
                plugins: [
                  'advlist autolink lists link  charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste help wordcount code  fullscreen',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                                               alignleft aligncenter alignright alignjustify | \
                                               bullist numlist outdent indent | removeformat Sourcecode code  fullscreen anchor| help',
              }"
          />
        </div>
      </div>
    </section>
  </div>


</template>

<script>

    import Editor from "@tinymce/tinymce-vue";

    export default {
      name: "create-sms-template",
      layout: 'AdminLayouts/masterLayout',
        head () {
        return {
          title: this.app_title,
          link: [
            { rel: 'icon', type: 'image/x-icon', href: this.app_icon }
          ]
        }
      },
      components: {
        editor: Editor,
      },
      data() {
        return {
          htmlediotr: null,
          templateTitle: null,
          categories: null,

          TemplateCategory: [],
          selectedCategory: [],
          app_title:this.$store.state.appinfo.appName +' | Create Sms Template',
          app_icon:this.$store.state.appinfo.appFavicon,
        };
      },

      mounted() {
        this.$nuxt.$emit('changeTitle',"Create SMS Template")
        this.$axios.$post("mtk-list-parent-category")
          .then((response) => {
            console.log(response.response_body)
            if (response.response_code === 200) {
              response.response_body.map((data) =>
                this.TemplateCategory.push({
                  value: data.id,
                  label: data.category_name,
                })
              );
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      },

      methods: {


        removeSelectedFile() {
          this.htmlediotr = '';
          this.templateTitle = null;
          this.categories = null;
          this.selectedCategory= [];
        },

        submitTemplate() {
          if (this.selectedCategory.length > 0) {
            var category_name = [];
            for (var i = 0; i < this.selectedCategory.length; i++) {
              category_name[i] = this.selectedCategory[i].label;
            }
            this.categories = category_name;
          }

          this.$axios.$post(
            "mtk-register-sms-template",
            {
              template: this.htmlediotr,
              title: this.templateTitle,
              category_name: this.categories,
            }
          )
            .then((response) => {
              this.removeSelectedFile();
              console.log(response);
              if (response.response_code===200){
                this.$toast.success(response.response_message)
              }else
              {
                this.$toast.error(response.response_message)
              }

            })
            .catch((error) => {
              console.log(error);
            });
        },
      },
    }

</script>

<style scoped>

</style>
