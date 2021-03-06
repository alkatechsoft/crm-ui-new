<template>

  <div class="relative   pb-32 pt-0.5 md:pt-24 text-black dark:bg-gray-800 dark:text-white">
    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <div class=" bg-denim-400 mb-0 px-6 py-6">
        <div class="text-center flex justify-between">
          <h6 class="text-gray-800 text-xl font-bold text-white">Campaign Name : {{this.$route.query.title}}</h6>
          <div>
            <button
              class="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              @click="backToReport()"
            >
              back
            </button>


          </div>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-5">


        <b-row>
          <b-col  offset-lg="0" offset-xl="0" xl="2" lg="3" offset-md="0" offset-sm="0" md="3" sm="3"  class="my-1">
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
                  size="sm">
                </b-form-select>

              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col offset-lg="4" offset-xl="7" xl="3" lg="5" offset-md="4" md="5" offset-sm="4"  sm="5" class="my-1">
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
          :items="items"
          head-variant="light"
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
          >

          <template #cell(actions) ="row" >


            <b-col>
              <b-button-group>
                <b-button @click="getDetaildReport(row.item.id, row.item.execute_at_date)" variant="success" size="sm" class="btn-denim small"> <font-awesome-icon icon="download" class="text-denim-800  group-hover:text-denim-300" /> &nbsp;Detailed Report </b-button>
              </b-button-group>
            </b-col>
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
    </section>
  </div>

</template>

<script>
    export default {
        name: "mail-scheduler-detailed-report",
      layout: 'AdminLayouts/masterLayout',

      data() {

        return {
          subscriberGroupType:this.$route.query.categoryName,
          edit: null,
          selectedItem:[],
          clientUpdat:[],
          bulkAction:null,
          groupTitle:null,
          templateFiles:[
            { value: null, text: 'Asign Template' }
          ],
          templateSelected:null,
          modes: ['multi', 'single', 'range'],
          items: [],
          fields: [
            { key: 'execute_at_date', label: 'Execute At', sortable: false, sortDirection: 'desc' },
            { key: 'execute_at_time', label: 'Execute At Time', sortable: false, sortDirection: 'desc' },
            { key: 'mail_clicked', label: 'Mail Clicked'},
            { key: 'mail_opened', label: 'Mail Opened'},
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
          }, text : 'sampleText',
          csv: [],
          execution_date:null
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
        this.fetchClientData();
      },
      methods: {

        backToReport(){
          this.$router.push('/backend/scheduler/mail-scheduler-report');
        },
        detailedCsvReport(){
          let csv = '\ufeff' + 'Sender Email, Recipient Email, Mail Clicked, Mail Opened\n'
          console.log('csv',this.csv);
          this.csv.forEach(el => {
            var line = el['senderEmail'] + ',' + el['recipientEmail']  + ',' + el['mailClicked']  + ',' + el['mailOpened'] + '\n'
            csv += line
          })
          var blob = new Blob([ csv ], { "type" : "csv/plain" });
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          let date = new Date();
          console.log(date)
          // link.download = 'reportCsv.csv'
          link.download = this.$route.query.title + '-' +this.execution_date + '-report.csv'
          link.click()
        },
        getDetaildReport(id, date){
          this.$axios.post('mtk-report-list-all-tracker-based-helper',
            { helper_id: id }
          ).then((response)=>{
            this.csv=[];
            this.execution_date = date
            // this.items=response.data.response_body;
            response.data.response_body.map((data) => this.csv.push({senderEmail: data.sender_email, recipientEmail: data.recipient_email, mailClicked: data.mail_clicked, mailOpened:data.mail_opened }));
            this.totalRows = this.items.length
            this.detailedCsvReport();
            console.log('response on click',response);
            console.log('csv-in-response',this.csv);
          }).catch(function (error){
            console.log( error);
          });
        },
        fetchClientData(){
          // Set the initial number of items
          let scheduleId = {scheduler_id:this.$route.query.id}
          this.$axios.post('mtk-report-list-all-helper-based-scheduler',scheduleId).then((response)=>{
            // this.items=response.data.response_body;
            response.data.response_body.map((data) => this.items.push({execute_at_date: this.dateFormate(data.created_at), execute_at_time: data.execute_at_time, mail_clicked: data.mail_clicked, mail_opened:data.mail_opened, id:data.id, actions:''}));
            this.totalRows = this.items.length
          }).catch(function (error){
            console.log( error);
          });
        },
        dateFormate(dateSrting) {
          var date= dateSrting.split('T')
          return date[0]
        },

        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.totalRows = filteredItems.length
          this.currentPage = 1
        },
        onRowSelected(items) {
          this.selectedItem=items
        }

      }

    }
</script>

<style scoped>

</style>
