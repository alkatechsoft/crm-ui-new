<template>

<div>
 <div class="relative   pb-0 pt-0 md:pt-0 text-black dark:bg-gray-800 dark:text-white">
    <section
      class="relative py-3 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <!-- <div class=" bg-denim-400 mb-0 px-6 py-6">
      </div> -->
      <div class="pt-0 pl-5 pr-5 pb-0 flex flex-wrap w-12/12 items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
           <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-gray-500 mb-1 text-xs font-semibold">
          </h6>
          <b class="text-gray-800 text-xl font-semibold" v-b-popover.hover.right="'Please Select A Campaign To Track it'" title="Campaign Tracker">
            Campaign Tracker* 
          </b>
        </div>
        <div class="relative w-full max-w-full flex-grow flex-1">
         
       <b-form-select 
        v-model="chartData.selected"
        :options="chartData.campaignList"
        @change="selectCampaign"
        :search="true"
        >
        </b-form-select>

        </div>

      </div>
      </div>
      </div>
 
      
    </section>
      </div>




  <div class="relative   pb-32 pt-0 md:pt-0 text-black dark:bg-gray-800 dark:text-white">
    <section
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white-200 border-0"
    >
      <!-- <div class=" bg-denim-400 mb-0 px-6 py-6">
      </div> -->
      <div class="pt-4 pl-5 pr-5 pb-0 flex flex-wrap w-12/12 items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
           <div class="flex flex-wrap items-center">
        
        <div class="relative w-full max-w-full flex-grow flex-1">
      
      
  
  
        
        <!-- {{chartData.selected}} -->
        </div>

      </div>
      </div>
      </div>
 
      <div class="card-body flex-auto px-4 lg:px-10 py-10 pt-0">
     
           loader:{{chartData.isLoader}}
           render:{{chartData.isRender}}
           seleted:{{chartData.selected}}
          <div class="flex flex-wrap ">
            
            <div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4 text-center" style1="width: auto; height:40rem">
              <b-spinner v-if="this.chartData.isLoader" variant="info" type="grow" label="Spinning"></b-spinner>
              <cardBarchart v-on:messageFromChild="childMessageReceived" :getSelected="chartData.selected" v-show="this.chartData.isRender" />
            </div>  
             
             <div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4 text-center" style1="width: auto; height:40rem">
              <b-spinner v-if="this.chartData.isLoader" variant="info" type="grow" label="Spinning"></b-spinner>
              <!-- <cardbarchart v-on:messageFromChild="childMessageReceived" :getSelected="chartData.selected" v-show="this.chartData.isRender" /> -->
              <cardLinechart v-on:messageFromChild="childMessageReceived" :getSelected="chartData.selected" v-show="this.chartData.isRender" />
            </div>
           
          
        </div>
      </div>
    </section>
      </div>
  </div>





  <!-- <admin-components-cards-card-bar-chart/> -->

 
  
</template>
<script>
import cardBarchart from '../Cards/CardBarChart'
import cardLinechart from '../Cards/CardLineChart'
export default {

     data() {
      return{
        chartData:{
                selected: null,
                campaignList:[],
                isLoader: false,
                isRender:false
             }
        }
    },
    
    components:{
      cardBarchart,
      cardLinechart
    },
  mounted: function () {
          this.$axios.post('mtk-report-list-all-scheduler').then((response)=>{
            if(response.data.response_code === 200){
              response.data.response_body.map((data) => this.chartData.campaignList.push({text: data.title, value:data.id}));
              // response.data.response_body.map((data) => this.campaignList.push({value: data.title, label:data.id}));
            }else{
              this.chartData.campaignList.push({ value: null, label: ' 👀 No data Found' })
            }
          }).catch(function (error){
            console.log( error);
          });
  },
  methods:{
    childMessageReceived(campaignStatus){
    // alert(campaignStatus)
    console.log("bar chart staus from child ::", campaignStatus);
    this.chartData.isRender = true;
    this.chartData.isLoader = false;
    },
    selectCampaign(){
      if(this.chartData.selected != null){
        this.chartData.isLoader = true
        this.chartData.isRender = false;

      }
    },
  //   trackCampaign(selected){
  //     alert('selected')
  //         this.$axios.post('mtk-report-list-all-helper-based-scheduler',
  //           { scheduler_id: selected }
  //         ).then((response)=>{
  //            console.log(response)
  //           // this.items=response.data.response_body;
  //           }).catch(function (error){
  //           console.log( error);
  //         });
  //       },
  // resetChart(){
  //     this.chartData.labes = []
  //     this.chartData.data1 = []
  //     this.chartData.data2 = []
  //     this.chartData.helper_id = []
  //   },
  //   mailCount(id){
 
  //             this.$axios.post('mtk-report-list-all-tracker-based-helper',{ helper_id: id }).then((response2)=>{ 
  //                        if(response2.data.response_code === 200){
  //                         console.log('response2 is count', response2.data.response_body.length)
  //                         this.chartData.data1.push(response2.data.response_body.length);
  //                         }

  //             }).catch(function (error){
  //           console.log( error);
  //         });
      
  //   },
  //   setDataToChart(selected){
  // this.$axios.post('mtk-report-list-all-helper-based-scheduler',{ scheduler_id: selected }).then((response1)=>{
  // this.resetChart();
         
  //        if(response1.data.response_code === 200){

  //             response1.data.response_body.map((data) => this.chartData.helper_id.push(data.id));
  //              this.chartData.helper_id.map((id) =>  {
  //               this.mailCount(id)
  //               console.log('before map function')

  //            })
  //             response1.data.response_body.map((data) => this.chartData.labes.push(data.execute_at_date));
  //             response1.data.response_body.map((result) => this.chartData.data2.push(result.mail_opened));
              
               
  //             console.log('after map function')

  //         }



  //         }).catch(function (error){
  //           console.log( error);
  //         });
  //   },
  // trackCampaign(selected){
  //        this.setDataToChart(selected)
  //     },
  }
}
</script>
<style scoped>
#bar-chart{
  height: 320px;
}
</style>