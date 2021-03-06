<template>
  <div class="relative   pb-32 pt-0.5 md:pt-24 text-black dark:bg-gray-800 dark:text-white">
    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <div class=" bg-denim-400 mb-0 px-6 py-6">
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-5">
        <b-row>
          <b-col offset-lg="0" offset-xl="0" xl="2" lg="3" offset-md="0" offset-sm="0" md="3" sm="3"  class="my-1">
            <b-form-group
              label=""
              label-for="per-page-select"

              label-align-sm="right"
              label-size="sm"
              class="mb-0"
            >
              <b-input-group size="sm">

                <b-input-group-prepend>
                  <b-button >Filter</b-button>
                </b-input-group-prepend>
                <b-form-select
                  id="per-page-select"
                  v-model="perPage"
                  :options="pageOptions"
                  size="sm"
                ></b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col  offset-lg="4" offset-xl="7" xl="3" lg="5" offset-md="4" md="5" offset-sm="4"  sm="5" class="my-1">
            <b-form-group
              label=""
              label-for="filter-input"
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
          sticky-header
          head-variant="light"
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
          selectable
          responsive="sm"
          ref="selectableTable"
          @row-selected="onRowSelected"
          id="table-transition-example"
        >

          <template #table-colgroup="scope">
            <col v-for="field in scope.fields"
                 :key="field.key"
                 :style="{ width: field.key === 'actions' ? '10%' : '40%' }">
          </template>
          <!-- <template #cell(html)=""> -->
          <!-- <b-list-group-item> <b-badge v-html="data.value"></b-badge></b-list-group-item>
          <b-nav-item to="subscribers" @click="hide"><i class="fa fa-address-card" /> &nbsp; &nbsp; Subscribers </b-nav-item>
          <b-button size="sm">
              Delete
          </b-button> -->

          <!-- </template> -->
          <template #cell(name)="row">
            {{ row.value.first }} {{ row.value.last }}
          </template>
          <template #cell(actions)="row" >
            <b-col  >
              <b-button-group>
                <nuxt-link :to="{ path: '/backend/scheduler/mail-scheduler-detailed-report', query: { id: row.item.scheduler_id, title: row.item.title }}"><b-button>view</b-button></nuxt-link>
              </b-button-group>
            </b-col>
          </template>

          <!-- <template #cell(status)="">
              <b-button-group>
                  <b-form-checkbox switch>active</b-form-checkbox>
              </b-button-group>
          </template> -->

          <template #row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
              </ul>
            </b-card>
          </template>
          <!-- Example scoped slot for select state illustrative purposes -->
          <template #cell(selected)="{ rowSelected }">
            <template v-if="rowSelected">
              <span aria-hidden="true">&check;</span>
              <span class="sr-only">Selected</span>
            </template>
            <template v-else>
              <span aria-hidden="true">&nbsp;</span>
              <span class="sr-only">Not selected</span>
            </template>
          </template>
        </b-table>
        <!-- <p>
            Selected Rows:<br>
            items :: {{items.id}}<br>
            seleted:: {{ selected }}<br>
            selected template:
            {{templateSelected}}<br>
            group title: <br>
            {{campaignTitle}}
        </p> -->
        <!-- Selected Rows:<br>
        {{selected}} -->
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
        <!-- Info modal -->
        <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
          <pre>{{ infoModal.modelData }}</pre>
        </b-modal> -->
      </div>
    </section>
  </div>

</template>

<script>
    export default {
        name: "mail-scheduler-report",
        layout: 'AdminLayouts/masterLayout',




      data() {

        return {
          modes: ['multi', 'single', 'range'],
          items: [],
          fields: [
            { key: 'title', label: 'Campaign Name', sortable: true, sortDirection: 'asc' },
            { key: 'attempts', label: 'Attempts', sortable: true, sortDirection: 'desc' },
            // { key: 'html', label: 'Actions' },
            {key: 'actions', label: 'actions'}
          ],
          selectMode: 'single',
          selected: [],
          selectedTypeUsersID:[],
          totalRows: 1,
          currentPage: 1,
          perPage: 5,
          pageOptions: [5, 10, 15, { value: 100, text: "Show More" }],
          sortBy: '',
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
          filterOn: [],
          busy: false,
          processing: false,
          infoModal: {
            id: 'info-modala',
            title: '',
            modelData: ''
          },


        }
      },
      computed: {
        sortOptions() {
          // Create an options list from our fields
          return this.fields
            .filter(f => f.sortable)
            .map(f => {
              return { text: f.label, value: f.key }
            })
        }
      },
      mounted() {
        this.$nuxt.$emit('changeTitle', "schedule mailed report")
        this.$axios.post('mtk-report-list-all-scheduler').then((response)=>{
          if(response.data.response_code === 200){
            response.data.response_body.map((data) => this.items.push({title: data.title, attempts: data.attempts, scheduler_id:data.id, actions:''}));



            this.totalRows = this.items.length
          }else{
            this.category.push({ value: null, label: ' 👀 No data Found' })
          }
        }).catch(function (error){
          console.log( error);
        });
      },
      methods: {

        clearInterval() {
          if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
          }
        },
        onShown() {
          // Focus the dialog prompt
          this.$refs.dialog.focus()
        },
        onHidden() {
          // In this case, we return focus to the submit button
          // You may need to alter this based on your application requirements
          this.$refs.submit.focus()
        },
        onSubmit() {
          this.processing = false
          this.busy = true
        },
        onCancel() {
          this.busy = false;
        },


        countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown
        },
        showAlert() {
          this.dismissCountDown = this.dismissSecs
        },
        info(item, index, button) {
          // this.infoModal.title = `Row index: ${index}`
          this.infoModal.title = `Create Campaign`
          // this.infoModal.modelData = JSON.stringify(item, null, 2)
          this.infoModal.modelData = item
          this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        },
        resetInfoModal() {
          this.infoModal.title = ''
          this.infoModal.modelData = ''
        },
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.totalRows = filteredItems.length
          this.currentPage = 1
        },
        onRowSelected(items) {
          this.selected = items
        },
        selectAllRows() {
          this.$refs.selectableTable.selectAllRows()
        },
        clearSelected() {
          this.$refs.selectableTable.clearSelected()
        },
        test: function(){
          alert("keyup")
        }
      }
    }
</script>

<style scoped>

</style>
