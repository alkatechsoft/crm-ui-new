export default function ({$axios ,store, $config}) {



    // Set the initial number of items
   $axios.$post('lcrm-app-setting',
    ).then(response =>{
      $config.appLogo = response.response_body[0].app_logo;
      $config.appFavicon = response.response_body[0].app_favicon;
      $config.appName = response.response_body[0].app_title;
      var temp={'appLogo':$config.appLogo , 'appFavicon':$config.appFavicon,'appName':$config.appName}
     store.commit('updateAppSetting',temp);
    }).catch(function (error){
      console.log( error);
    });




}
