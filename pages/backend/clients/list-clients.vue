<template>
  <div class="relative   pb-32 pt-0.5 md:pt-24 text-black dark:bg-gray-800 dark:text-white">
    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <div class=" bg-denim-400 mb-0 px-6 py-6">
        <div class="text-center flex justify-between" v-if="subscriberCategoryType">
          <h6 class="text-white text-xl font-bold ">Subscriber Type: {{subscriberCategoryName}} </h6>
          <div>
            <button
              class="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              @click="onGoback()"
            >
              Back
            </button>

          </div>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0 pt-5">

        <list-scubscriber v-if="subscriberCategoryType"  :subscriber-type="subscriberCategoryType" />

        <div v-if="!subscriberCategoryType">

          <b-row>
            <b-col offset-lg="" lg="2" offset-md="0" md="5" sm="4" class="my-1">
              <b-form-group
                label="Filter"
                label-for="per-page-select"
                label-cols-sm="2"
                label-cols-md="2"
                label-cols-lg="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-form-select
                  id="per-page-select"
                  v-model="perPage"
                  :options="pageOptions"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col offset-lg="6" lg="4" offset-md="2" md="5" offset-sm="1" sm="7" class="my-1">
              <b-form-group
                label=""
                label-for="filter-input"
                label-cols-sm="3"
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
            @row-selected="onRowSelected"
            id="table-transition-example"
          >


            <!-- </template> -->
            <template #cell(name)="row">
              {{ row.value.first }} {{ row.value.last }}
            </template>
            <template #cell(actions)="row">
              <b-col>
                <b-button-group>
                  <b-button size="sm" class="btn-denim" @click="onShowScubcriber(row.item.id,row.item.subscriberType)"
                            variant="primary">View
                  </b-button>

                </b-button-group>
              </b-col>
            </template>


            <template #row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
              </b-card>
            </template>
            <template #table-colgroup="scope">
              <col
                v-for="field in scope.fields"
                :key="field.key"
                :style="{ width: field.key === 'subscriberType' ? '25%' : '25%' }">
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
          </b-row>
        </div>


      </div>
    </section>
  </div>

</template>

<script>
  import ListScubscriber from "../../../components/AdminComponents/Subscribers/listScubscriber";
  export default {
    name: "list-clients",
    components: {ListScubscriber},
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
        subscriberCategoryType:'',
        subscriberCategoryName:'',

        modes: ['multi', 'single', 'range'],
        items: [],
        fields: [
          {key: 'subscriberType', label: 'Type', sortable: false, sortDirection: 'desc', class: 'text-center'},
          {key: 'UserActive', label: 'Active', sortable: false, sortDirection: 'desc', class: 'text-center'},
          {key: 'UserDeactivated', label: 'Deactivated', sortable: false, sortDirection: 'desc', class: 'text-center'},
          {key: 'Total', label: 'Total', sortable: false, sortDirection: 'desc', class: 'text-center'},
          {key: 'actions', label: 'actions'}
        ],
        selectMode: 'single',
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, {value: 100, text: "Show More"}],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        app_title:this.$store.state.appinfo.appName +' | List Subscriber',
        app_icon:this.$store.state.appinfo.appFavicon,
      } 
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return {text: f.label, value: f.key}
          })
      }
    },
    mounted() {

      this.$nuxt.$emit('changeTitle', "Subscribers")
      this.getScribers()
    },
    methods: {
      onShowScubcriber(categoryId,categoryName){
        this.subscriberCategoryType=categoryId;
        this.subscriberCategoryName=categoryName;
      },
      onGoback(){
        this.subscriberCategoryType='';
        this.subscriberCategoryName='';
      },

      getScribers() {

        this.$axios.post('count-client-by-category').then((response) => {
          if (response.data.response_code === 200) {
            console.log('count-client-by-category', response.data.response_body);

            response.data.response_body.map((data) => this.items.push({
              subscriberType: data.subscriberType,
              UserActive: data.UserActive,
              UserDeactivated: data.UserDeactivated,
              Total: data.UserDeactivated + data.UserActive,
              count: data.count,
              id: data.id,
              userArray: data.userArray,
              actions: ''
            }));

            this.totalRows = this.items.length
          } else {
            this.category.push({value: null, label: ' 👀 No Category Found'})
          }
        }).catch(function (error) {
          console.log(error);
        });
      },

      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      onRowSelected(items) {
        this.selected = items
      },

    }
  }
</script>

<style scoped>


  /* Choose all input elements that have the attribute: type="radio" and make them disappear.*/
  input[type="radio"] {
    display: none;
  }

  label {
    padding: 7px;
    display: table-cell;;
    /* border: 0px solid rgb(20, 4, 94); */
    background: #007bff;
    cursor: pointer;
    color: #fff;
  }

  label:nth-child(2) {
    border-radius: 5px 0px 0px 5px !important;
  }

  label:nth-child(6) {
    border-radius: 0px 5px 5px 0px !important;
  }

  /* The '+' is the adjacent sibling selector.
  It selects what ever element comes right after it,
  as long as it is a sibling. */
  input[type="radio"]:checked + label {
    background: rgb(20, 4, 94);
    color: #fff;
  }


</style>
