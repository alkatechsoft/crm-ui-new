<template>
  <!-- Header -->
  <div class="relative bg-green-400 md:pt-32 pb-16 pt-12 text-black dark:bg-gray-800 dark:text-white">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <admin-components-cards-card-stats
              statSubtitle="THIS WEEK USERS"
              :statTitle="allNewUsers"
              statArrow="up"
              statPercent="3.48"
              statPercentColor="text-green-500"
              statDescripiron="Since last month"
              statIconName="users"
              statIconColor="bg-yellow-500"


            />

          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <admin-components-cards-card-stats
              statSubtitle="ALL USERS"
              :statTitle="allUsers"
              statArrow="down"
              statPercent="3.48"
              statPercentColor="text-red-500"
              statDescripiron="Since last week"
              statIconName="users"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <admin-components-cards-card-stats
              statSubtitle="UP COMING CAMPAIGN"
              :statTitle="allUpComingSchedules"
              statArrow="down"
              statPercent="1.10"
              statPercentColor="text-orange-500"
              statDescripiron="Since yesterday"
              statIconName="chart-bar"
              statIconColor="bg-pink-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <admin-components-cards-card-stats
              statSubtitle="TOTAL CAMPAIGN"
              :statTitle="allSchedules"
              statArrow="up"
              statPercent="12"
              statPercentColor="text-green-500"
              statDescripiron="Since last month"
              statIconName="chart-bar"
              statIconColor="bg-denim-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data(){
    return{
      allUsers:0,
      allNewUsers:0,
      allSchedules:0,
      allUpComingSchedules:0

    }
  },

  mounted() {
    this.subcirbersStates();
    this.SchedulerStates();
  },

  methods:{

    async subcirbersStates() {
      try {
          let response = await this.$axios.post('client-by-stets')
          if(response.data.response_body !==''){
            this.allUsers=response.data.response_body.allUsers
              this.allNewUsers=response.data.response_body.allNewUsers

          }

      } catch (err) {
        console.log(err)
        this.$toast.error(err)
      }
    },


    async SchedulerStates() {
      try {
        let response = await this.$axios.post('mtk-list-schedule-states')
        if(response.data.response_body !==''){
          this.allSchedules=response.data.response_body.campaign
          this.allUpComingSchedules=response.data.response_body.new_campaign

        }

      } catch (err) {
        console.log(err)
        this.$toast.error(err)
      }
    },
  }

};
</script>
