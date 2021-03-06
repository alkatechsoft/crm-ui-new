<template>
  <div>
    <b-row>
      <b-col>
        <b-card class="bg-light ar-ckeditor">
          <input type="hidden" name="id" id="templateId" v-model="templateId">
          <editor v-model.lazy="htmlediotr"
                  api-key="no-api-key"
                  readonly=true
                  :init="{
                          height: 1000,
                          menubar: false,
                          paste_data_images: true,
                          plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste help wordcount code image fullscreen',
                          ],
                          toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                             alignleft aligncenter alignright alignjustify | \
                             bullist numlist outdent indent | removeformat Sourcecode code image fullscreen anchor| help',
                    }"
          />
          <br>
          <b-row>
            <b-col>
              <b-form-group>
                <v-select class="style-chooser"
                          v-model="TemplateSelectedCategory"
                          placeholder="Please select an category"
                          size="lg"
                          :options="TemplateCategory"
                          :filterable="true"
                          :multiple="true"
                          :taggable="true"
                          :create-option="option => ({value: option.toLowerCase(), label: option})"
                >
                </v-select>


              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-2" label-for="input-1">
                <div class="input-container">
                  <b-form-input
                    class="input-field"
                    id="input-1"
                    v-model.lazy="templateTitle"
                    type="text"
                    placeholder="Enter Template title"
                  ></b-form-input>
                </div>

              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group label-for="submit-template">
            <b-button class="ripple bg-denim-800" type="button" @click="submitTemplate()" variant="primary">
              Update
            </b-button>

            <b-button class="ripple " type="button" @click="deleteTemplate()" variant="danger">
              Delete
            </b-button>
          </b-form-group>

        </b-card>
      </b-col>

    </b-row>

  </div>
</template>

<script>
  import Editor from "@tinymce/tinymce-vue";

  export default {
    name: "editTemplate",
    props: ['propTemplateId'],

    components: {
      editor: Editor,
    },
    data() {

      return {
        htmlediotr: null,
        templateTitle: null,
        categories: null,
        templateId: null,
        TemplateSelectedCategory: [],


        TemplateCategory: [{value: null, text: 'All Categories', default: true}],

      }
    },
    mounted() {

      if ( this.propTemplateId != 'undefined' && this.propTemplateId != null){

        this.fetchTemplateData(this.propTemplateId);
      }
    },
    watch: {
      propTemplateId: {
        // the callback will be called immediately after the start of the observation
        immediate: true,
        handler (val, oldVal) {
          // do your stuff
          if ( this.propTemplateId != 'undefined' && this.propTemplateId != null){

            this.fetchTemplateData(this.propTemplateId);
          }
        }
      }
    },


    methods: {


      fetchTemplateData($template_Id) {
        this.$axios.post('mtk-single-get-template', {
          'id': this.propTemplateId,
        }).then((response) => {
          if (response.data.response_code === 200) {
            this.htmlediotr = response.data.response_body[0].template
            this.templateTitle = response.data.response_body[0].title
            this.templateId = response.data.response_body[0].id

            this.$axios.post('mtk-list-category-By-StringifyArray', {
              'categoryString': response.data.response_body[0].categories,
            }).then((categoryResponse) => {
              console.log(categoryResponse);
              if (categoryResponse.data.response_code === 200) {
                this.TemplateSelectedCategory = []
                categoryResponse.data.response_body.map((data) => this.TemplateSelectedCategory.push({
                  value: data.id,
                  text: data.category_name,
                  label: data.category_name
                }));
              }
            }).catch(function (error) {
              console.log('error', error);
            });
          }

        }).catch(function (error) {
          console.log('error', error);
        });
      },

      removeSelectedFile() {
        this.htmlediotr = '';
        this.templateTitle = null;
        this.categories = null;
        this.templateId = null;
        this.TemplateSelectedCategory = [];
        this.$nuxt.$emit('emitEditTemplate', null)
      },

      submitTemplate() {
        if (this.TemplateSelectedCategory.length > 0) {
          var category_name = [];
          for (var i = 0; i < this.TemplateSelectedCategory.length; i++) {
            category_name[i] = this.TemplateSelectedCategory[i].label
          }
          this.categories = category_name;
        }

        this.$axios.post('mtk-update-sms-template', {
          id: this.templateId,
          template: this.htmlediotr,
          title: this.templateTitle,
          category_name: this.categories,

        })
          .then((response) => {
            this.removeSelectedFile()
            console.log(response);

             this.$toast.success(response.data.response_message)

          })
          .catch((error) => {
            console.log(error);
          });
      },

      deleteTemplate() {
        this.$axios.post('mtk-delete-mail-template', {
          id: this.templateId,
        })
          .then((response) => {
            this.removeSelectedFile()
            console.log(response);

             this.$toast.success(response.data.response_message)

          })
          .catch((error) => {
            console.log(error);
          });
      },


    }

  }
</script>

<style scoped>

</style>
