<template>
  <div class="relative  md:pt-24 pb-32 pt-0.5 text-black dark:bg-gray-800 dark:text-white">
    <!--after upload-->
    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <div class="bg-denim-400 mb-0 px-6 py-6">
        <div class="text-center flex justify-between">

          <div v-if="togetEditor && file">
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

        <div class="h-full overflow-auto p-8 w-full h-full flex flex-col" v-if="!file">

          <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
            <div class="dropZone-info" @change="onFileSelected">
              <span class="fa fa-cloud-upload dropZone-title"></span>
              <span class="dropZone-title">Drop file or click to upload</span>
              <div class="dropZone-upload-limit-info">
                <div>extension support: txt/html</div>
                <div>maximum file size: 5 MB</div>
                <button id="button" ref="button" @click="uploadfile"
                        class="mt-2 w-22 self-center rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                  Upload a file
                </button>
              </div>
            </div>
            <input type="file" ref="myFile" @change="onFileSelected">
          </div>
          <ul id="gallery" class="flex flex-1 flex-wrap-m-1 mt-8">
            <li id="empty" class="h-full w-full text-center flex flex-col items-center justify-center items-center">
              <img class="mx-auto w-32"
                   src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                   alt="no data"/>
              <span class="text-small text-gray-500">No files selected</span>
            </li>
          </ul>
        </div>

        <div v-if="togetEditor && file">

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
        </div>
      </div>
    </section>
  </div>


</template>

<script>

  import Editor from "@tinymce/tinymce-vue";

  export default {

    name: "upload-email-template",
    layout: 'AdminLayouts/masterLayout',
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

        file: "",
        togetEditor: false,
        dragging: false,
      };
    },

    mounted() {
      this.$nuxt.$emit('changeTitle',"Upload Email Template")
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
      uploadfile(){
        var elem = this.$refs.myFile;
        elem.click()
      },
      onFileSelected(event) {
        var files = event.target.files || event.dataTransfer.files;

        if (!files.length) {
          this.dragging = false;
          return;
        }

        this.createFile(files[0]);
        let file = this.$refs.myFile.files[0];
        if (!file || file.type !== "text/html") return;
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (evt) => {
          this.htmlediotr = evt.target.result;
          this.togetEditor = true;
        };
        reader.onerror = (evt) => {
          console.error(evt);
        };
      },

      createFile(file) {
        if (!file.type.match("text.*")) {
          alert("please select text/html file");
          this.dragging = false;
          return;
        }

        if (file.size > 5000000) {
          alert("please check file size no over 5 MB.");
          this.dragging = false;
          return;
        }

        this.file = file;
        this.dragging = false;
      },
      removeSelectedFile() {
        this.file = "";
        this.togetEditor = false;
        this.dragging = false;
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
          "mtk-register-mail-template-text",
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

<style>
  .vs__selected-options {
    height: 2.5rem !important;
  }

  .dropZone {
    width: 100%;
    height: 200px;
    position: relative;
    border: 2px dashed #eee;
  }
  .dropZone:hover {
    border: 2px solid #2e94c4;
  }
  .dropZone:hover .dropZone-title {
    color: #1975A0;
  }
  .dropZone-info {
    color: #A8A8A8;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(0, -50%);
    text-align: center;
  }
  ..dropZone-title {
    color: #787878;
  }
  .dropZone input {
    position: absolute;
    cursor: pointer;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .dropZone-upload-limit-info {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
  .dropZone-over {
    background: #5C5C5C;
    opacity: 0.8;
  }
  .dropZone-uploaded {
    width: 80%;
    height: 200px;
    position: relative;
    border: 2px dashed #eee;
  }
  .dropZone-uploaded-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #A8A8A8;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(0, -50%);
    text-align: center;
  }
  .removeFile {
    width: 200px;
  }
</style>
