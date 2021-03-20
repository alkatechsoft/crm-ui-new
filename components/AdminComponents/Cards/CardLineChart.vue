 
<script>
import { Line } from 'vue-chartjs'
 
export default {
  name:'cardLinechart',
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
  name:'cardbarchart',
  props: {
    getSelected: {}
    },
    watch: {
      getSelected:function(){
      console.log('comunication............', this.getSelected)
      this.resetChart();
      this.trackCampaign(this.getSelected)
     }
    },
  extends: Line, 
  
  mounted () {
    console.log('getChartData:::::::::::::', this.getSelected)
       
  },
    methods:{
   sendMessageToParent(campaignStatus){
     this.$emit('messageFromChild', campaignStatus);
   },
  
   resetChart(){
      this.chartData.labes = []
      this.chartData.data1 = []
      this.chartData.data2 = []
      this.chartData.helper_id = []
      this.chartData.count = 0
    },
    mailCount(id){
      this.$axios.post('mtk-report-list-all-tracker-based-helper',{ helper_id: id }).then((response2)=>{ 
              if(response2.data.response_code === 200){
              this.chartData.count++
              console.log('response2 is count', response2.data.response_body.length, this.chartData.count, this.chartData.helper_id.length)
              this.chartData.data1.push(response2.data.response_body.length);
              if (this.chartData.count === this.chartData.helper_id.length){
                this.chartRender();
                this.sendMessageToParent(this.chartData.helper_id.length);
              }
              }
              }).catch(function (error){
            console.log( error);
          });
      
    },
    chartRender(){
      console.log('chart render start')
         this.renderChart({
      labels: this.chartData.labes,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#22c777',
          data: this.chartData.data2,
          lineThickness: 5
        }
      ]
    }, {responsive: true, maintainAspectRatio: true})
},
    
    setDataToChart(selected){
    this.$axios.post('mtk-report-list-all-helper-based-scheduler',{ scheduler_id: selected }).then((response1)=>{
    this.resetChart();
          console.log('response body length', response1.data.response_body.length)
         if(response1.data.response_code === 200 && response1.data.response_body.length > 0){
              response1.data.response_body.map((data) => this.chartData.helper_id.push(data.id));
               this.chartData.helper_id.map((id) =>  {
                this.mailCount(id)
                console.log('before map function')

             })
              response1.data.response_body.map((data) => this.chartData.labes.push(data.execute_at_date));
              response1.data.response_body.map((result) => this.chartData.data2.push(result.mail_opened));
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





</script>
<style scoped>
#bar-chart{
      /* max-height: 55rem !important; */
    width: 689px;
    height: 400px
}
</style>>