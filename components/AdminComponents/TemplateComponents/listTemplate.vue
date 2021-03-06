<template>
<div>

  <b-row>
    <b-col  offset-lg="0" xl="2" lg="3" offset-md="0" md="3" sm="3"  class="my-1">
      <b-form-group
        label=""
        label-for="per-page-select"
        label-cols-sm="1"
        label-cols-md="1"
        label-cols-lg="1"
        label-cols-xl="2"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-input-group-prepend>
            <b-button >Page</b-button>
          </b-input-group-prepend>
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm">
          </b-form-select>

        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col  offset-lg="" xl="2" lg="3" offset-md="0" md="3" sm="3"  class="my-1">
      <b-form-group
        class="mb-0">
        <b-input-group size="sm">
          <b-input-group-append>
            <b-button size="sm" @click="onChangeCategoryOrType()">Type</b-button>
          </b-input-group-append>
          <b-form-select
            @change="onChangeCategoryOrType()"
            v-model="template_type"
            :options="[{value: 'SMS', text: 'SMS'},{value: 'EMAIL', text: 'EMAIL'},{value: 'ALL', text: 'ALL'}]"
            size="sm"
          ></b-form-select>

        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col  offset-lg="" xl="2" lg="3" offset-md="0" md="3" sm="3"  class="my-1">

      <b-form-group
        class="mb-0">
        <b-input-group size="sm">
          <b-input-group-append>
            <b-button size="sm"  @clcik="onChangeCategoryOrType()">Category</b-button>
          </b-input-group-append>
          <b-form-select
            @change="onChangeCategoryOrType()"
            v-model="selectedTemplateCategory"
            :options="TemplateCategory"
            size="sm"
          ></b-form-select>

        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col  offset-lg="" xl="2" lg="3" offset-md="0" md="3" sm="3"  class="my-1">
      <b-form-group
        class="mb-0">
        <b-input-group size="sm">
          <b-form-select
            v-model="bulkAction"
            :options="bulkActionOptions"
            size="sm"
          ></b-form-select>
          <b-input-group-append>
            <b-button size="sm" @click="onBulkAction">Bulk Action</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col offset-lg="1" xl="3" lg="3" offset-md="0" md="3" offset-sm="0"  sm="3" class="my-1">
      <b-form-group
        label=""
        label-for="filter-input"
        label-cols-sm="2"
        label-cols-lg="4"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
          ></b-form-input>

          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>
  </b-row>

  <!-- Main table element -->

  <b-table
    :items="items"
    :fields="fields"
    :current-page="currentPage"
    :per-page="perPage"
    :filter="filter"
    :filter-included-fields="filterOn"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :sort-direction="sortDirection"
    stacked="xs"
    show-empty
    small
    @filtered="onFiltered"
    :select-mode="selectMode"
    responsive="sm"
    ref="selectableTable"
    selectable
    id="table-transition-example"
    @row-selected="onRowSelected"

  >


    <template #cell(actions)="row">
      <b-button-group>
        <b-button  variant="warning" size="sm" @click="onEdit(row.item)">
          <font-awesome-icon  icon="pencil-ruler" class="text-denim-800  group-hover:text-denim-300" />
        </b-button>
        <b-button  variant="danger" size="sm"  @click="onDelete(row.item)" >
          <font-awesome-icon  icon="trash" class="text-denim-800  group-hover:text-denim-300" />
        </b-button>
      </b-button-group>
    </template>

  </b-table>

  <b-row>
    <b-col sm="7" md="3" lg="2" class="my-1">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>

    </b-col>
    <!-- {{ selectedItem }} -->
  </b-row>

</div>


</template>

<script>
    export default {
        name: "listTemplates",
      data(){
        return {
          template_type:'ALL',
          subscriberGroupType:'ALL',
          selectedTemplateCategory:'ALL',
          TemplateCategory:[],
          edit: null,
          selectedItem:[],
          clientUpdat:[],
          bulkActionOptions:[{value: 'active', text: "Activate"},{value: 'deactivated', text: "Deactivate"},{value: 'delete', text: "Delete"},{value: 'suspended', text: "Suspend"}],
          bulkAction:null,
          groupTitle:null,
          templateFiles:[
            { value: null, text: 'Asign Template' }
          ],
          templateSelected:null,
          modes: ['multi', 'single', 'range'],
          items: [],
          fields: [
            { key: 'title', label: 'Title', sortable: false, sortDirection: 'desc' },
            { key: 'template_type', label: 'Type', sortable: false, sortDirection: 'desc',class: 'text-center' },
            { key: 'status', label: 'Status', sortable: false, sortDirection: 'desc',class: 'text-center' },
            { key: 'actions', label: 'Actions' }
          ],
          selectMode: 'multi',
          selected: [],
          selectedUsersID:[],
          totalRows: 1,
          currentPage: 1,
          perPage: 5,
          pageOptions: [5, 10, 15, { value: 100, text: "Show More" }],
          sortBy: '',
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
          filterOn: [],
          infoModal: {
            id: 'info-modal',
            title: '',
            content: ''
          }
        }
      },

      computed: {
        sortOptions() {
          // Create an options list from our fields
          return this.fields
            .filter(f => f.sortable)
            .map(f => {
              return { text: f.label, value: f.key }
            })}
      },

      mounted() {
        this.fetchTemplates(this.template_type,this.selectedTemplateCategory);
        this.fetchCategories();
        this.$nuxt.$emit('emitEditTemplate', null)
      },

      methods:{

        fetchCategories(){
          this.$axios.post('mtk-list-parent-category').then((response)=>{
            if(response.data.response_code === 200){
              this.TemplateCategory.push( { value: 'ALL', text: 'ALL', label: 'ALL'  });
              response.data.response_body.map((data) => this.TemplateCategory.push( { value: data.id, text: data.category_name, label: data.category_name   }));

            }
          }).catch(function (error){
            console.log( 'error',error);
          });
        },

        onChangeCategoryOrType(){
          this.fetchTemplates(this.template_type,this.selectedTemplateCategory)
        },


        fetchTemplates(template_type,category_id){
          // Set the initial number of items
          if (template_type==="ALL" || template_type==="all"){
            template_type=null;
          }
          if (category_id==="ALL" || category_id==="all"){
            category_id=null;
          }
          this.$axios.post('mtk-list-all-template',
            {category_id:category_id,template_type:template_type}
          ).then((response)=>{
            this.items=response.data.response_body;
            this.totalRows = this.items.length
          }).catch(function (error){
            console.log( error);
          });
        },

        deleteClientData(itemId){
          this.$axios.post('mtk-delete-mail-template', {
            id:itemId,
          })
            .then((response) =>  {

              this.$toast.success( response.data.response_message)
              this.fetchTemplates(this.template_type,this.selectedTemplateCategory);
            })
            .catch( (error) => {
              console.log(error);
            });
        },



        onEdit(item) {
          this.edit = this.edit !== item.id ? item.id : null;
          this.$nuxt.$emit('emitEditTemplate', this.edit)
        },

        onDelete(item){
          // on click delete row
          if(confirm("Do you really want to delete?")){
            this.deleteClientData(item.id)
          }

        },

        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.totalRows = filteredItems.length
          this.currentPage = 1
        },
        onRowSelected(items) {
          this.selectedItem=items
        },

        onBulkAction(){
          if ( this.selectedItem !== null && this.bulkAction !== null ){
            var ItemStatus=null;
            if (this.bulkAction !=='delete'){
              ItemStatus=this.bulkAction;
            }
            this.selectedItem.map((data) =>
              this.BulkdeleteClientData(data.id, ItemStatus)
            );
            this.$toast.success('Bulk Action Successful')
            this.fetchTemplates(this.template_type,this.selectedTemplateCategory);
          }
        },
        BulkdeleteClientData(itemId, ItemStatus){
          this.$axios.post('mtk-delete-mail-template', {
            id:itemId,
            status:ItemStatus
          })
            .catch( (error) => {
              console.log(error);
            });
        },
      }
    }
</script>

<style scoped>

</style>
