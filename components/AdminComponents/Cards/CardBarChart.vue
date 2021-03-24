 
<script>
import { Bar } from 'vue-chartjs'
 
export default {
   data() {
      return{
        chartData:{
                showChart:false,
                helper_id:[],
                labes:[],
                data1:[],
                data2:[],
                campaignList:[],
                count:0
             }
        }
    },
  name:'cardBarchart',
  props: {
    getSelected: {}
    },
    watch: {
      getSelected:function(){
            console.log('bar chart comunication from parent to child established', this.getSelected)

      this.resetChart();
      this.trackCampaign(this.getSelected)
     }
    },
  extends: Bar, 
  
  mounted () {
    console.log('getChartData:::::::::::::', this.getSelected)
      // this.$axios.post('mtk-report-list-all-scheduler').then((response)=>{
      //     if(response.data.response_code === 200){
      //       response.data.response_body.map((data) => this.campaignList.push({text: data.title, value:data.id}));
      //       // response.data.response_body.map((data) => this.campaignList.push({value: data.title, label:data.id}));
      //     }else{
      //       this.campaignList.push({ value: null, label: ' 👀 No data Found' })
      //     }
      //   }).catch(function (error){
      //     console.log( error);
      //   });

    // Overwriting base render method with actual data.
    
    // this.renderChart({
    //   labels: this.chartData.labes,
    //   datasets: [
    //     {
    //       label: 'Total mail send',
    //       backgroundColor: 'blue',
    //       data: this.chartData.data1
    //     },
    //      {
    //       label: 'Total mail opened',
    //       backgroundColor: 'green',
    //       data: this.chartData.data2
    //     }
    //   ]
    // })
  },
    methods:{
   sendMessageToParent(campaignStatus){
     this.$emit('messageFromChild', campaignStatus);
   },
  
 // trackCampaign(selected){
    //   alert('selected')
    //       this.$axios.post('mtk-report-list-all-helper-based-scheduler',
    //         { scheduler_id: selected }
    //       ).then((response)=>{
    //          console.log('trackCampaign result:', response)
    //         // this.items=response.data.response_body;
    //         }).catch(function (error){
    //         console.log( error);
    //       });
    //     },
  resetChart(){
      this.chartData.labes = []
      this.chartData.data1 = []
      this.chartData.data2 = []
      this.chartData.helper_id = []
      this.chartData.count = 0
    },
    mailCount(id){
                this.chartRender();
                this.sendMessageToParent(this.chartData.helper_id.length);
      // this.$axios.post('mtk-report-list-all-tracker-based-helper',{ helper_id: id }).then((response2)=>{
      //         if(response2.data.response_code === 200){
      //         this.chartData.count++
      //         console.log('response2 is count', response2.data.response_body.length, this.chartData.count, this.chartData.helper_id.length)
      //         this.chartData.data1.push(response2.data.response_body.length);
      //         if (this.chartData.count === this.chartData.helper_id.length){
      //           this.chartRender();
      //           this.sendMessageToParent(this.chartData.helper_id.length);
      //         }
      //         }
      //         }).catch(function (error){
      //          console.log( error);
      //     });
    },
    chartRender(){
      console.log('chart render start')
        this.renderChart({
          labels: this.chartData.labes,
          datasets: [
          {
          label: 'Total mail send',
          backgroundColor: '#5b2ba2',
          data: this.chartData.data1,
          barThickness: 45,
          },
          {
          label: 'Total mail opened',
          backgroundColor: '#22c777',
          data: this.chartData.data2,
          barThickness: 45,
          }
          ] 
          }, {responsive: true, maintainAspectRatio: true})
    },

    setDataToChart(selected){
    this.$axios.post('mtk-report-list-all-helper-based-scheduler',{ scheduler_id: selected }).then((response1)=>{
    this.resetChart();
          console.log('response body length', response1.data.response_body.length)
         if(response1.data.response_code === 200 && response1.data.response_body.length > 0){
              response1.data.response_body.map((data) => this.chartData.data1.push(data.total_send_mails));
              this.sendMessageToParent(this.chartData.helper_id.length);
              response1.data.response_body.map((data) => this.chartData.labes.push(data.execute_at_date));
              response1.data.response_body.map((result) => this.chartData.data2.push(result.mail_opened));
              this.chartRender();
              console.log('after map function', this.chartData)

          } else {
            this.sendMessageToParent(0);
            console.log('length', response1.data.response_body.length)
          }
 
          }).catch(function (error){
            console.log( error);
          });
    },
   trackCampaign(selected){
   this.chartRender()
          this.setDataToChart(selected)
  },
  },
  
}





// export default {
//      data() {
//       return{
//          selected: null,
//          campaignList:[
//             {value:'iooioo', text:'logo'},
//             {value:'iooioo', text:'doctors'},
//             {value:'iooioo', text:'insuarance'}
//             ]
//       }
//     },
//     methods:{
//     trackCampaign(selected){
//           this.$axios.post('mtk-report-list-all-helper-based-scheduler',
//             { scheduler_id: selected }
//           ).then((response)=>{
//              console.log(response)
//             // this.items=response.data.response_body;
//             }).catch(function (error){
//             console.log( error);
//           });
//         },
 
//   },
//   mounted: 
//   function () {
//          this.$axios.post('mtk-report-list-all-scheduler').then((response)=>{
//           if(response.data.response_code === 200){
//             response.data.response_body.map((data) => this.campaignList.push({text: data.title, value:data.id}));
//             // response.data.response_body.map((data) => this.campaignList.push({value: data.title, label:data.id}));
//           }else{
//             this.category.push({ value: null, label: ' 👀 No data Found' })
//           }
//         }).catch(function (error){
//           console.log( error);
//         });
//   },
//   function () {
//     this.$nextTick(function () {
//       let config = {
//         type: "bar",
//         data: {
//           labels: [
//             "12-03-2021",
//             "12-03-2021",
//             "12-03-2021",
//             "12-03-2021",
//             "12-03-2021",
//             "12-03-2021",
//             "12-03-2021", 
//           ],
//           datasets: [
//             {
//               label: 'Total mail send',
//               backgroundColor: "blue",
//               borderColor: "blue",
//               data: [1000, 1000, 1000, 1000, 1000, 1000, 1000],
//               fill: false,
//               barThickness: 25,
//             },
//             {
//               label: 'Total mail Opened',
//               fill: false,
//               backgroundColor: "green",
//               borderColor: "green",
//               data: [220, 268, 286, 274, 90, 224, 207],
//               barThickness: 25,
//             },
//           ],
//         },
//         options: {
//           maintainAspectRatio: false,
//           responsive: true,
//           title: {
//             display: false,
//             text: "Orders Chart",
//           },
//           tooltips: {
//             mode: "index",
//             intersect: true,
//           },
//           hover: {
//             mode: "nearest",
//             intersect: true,
//           },
//           legend: {
//             labels: {
//               fontColor: "rgba(0,0,0,.4)",
//             },
//             align: "center",
//             position: "top",
//           },
//           scales: {
//             xAxes: [
//               {
//                 display: true,
//                 scaleLabel: {
//                   display: true,
//                   labelString: "Time",
//                 },
//                 gridLines: {
//                   borderDash: [2],
//                   borderDashOffset: [2],
//                   color: "rgba(33, 37, 41, 0.3)",
//                   zeroLineColor: "rgba(33, 37, 41, 0.3)",
//                   zeroLineBorderDash: [2],
//                   zeroLineBorderDashOffset: [2],
//                 },
//               },
//             ],
//             yAxes: [
//               {
//                 display: true,
//                 scaleLabel: {
//                   display: false,
//                   labelString: "Value",
//                 },
//                 gridLines: {
//                   borderDash: [2],
//                   drawBorder: false,
//                   borderDashOffset: [2],
//                   color: "rgba(33, 37, 41, 0.2)",
//                   zeroLineColor: "rgba(33, 37, 41, 0.15)",
//                   zeroLineBorderDash: [2],
//                   zeroLineBorderDashOffset: [2],
//                 },
//               },
//             ],
//           },
//         },
//       };
//       let ctx = document.getElementById("bar-chart").getContext("2d");
//       window.myBar = new Chart(ctx, config);
//     });
//   },
// };
</script>
<style scoped>
#bar-chart{
      /* max-height: 55rem !important; */
    width: 689px;
    height: 400px
}
</style>>