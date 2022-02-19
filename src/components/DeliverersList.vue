<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Deliverers List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(deliverer, index) in deliverers"
          :key="index"
          @click="setActiveDeliverer(deliverer, index)"
        >
          {{ deliverer.key }} <br />
          {{ deliverer.user.Fullname }}

         
        </li>
      </ul>

      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllDeliverers">
        Remove All
      </button> -->
    </div>
    <div class="col-md-6">
      <div v-if="currentDeliverer">
        <deliverer-details
          :deliverer="currentDeliverer"
          @refreshList="refreshList"
        />
      </div>
      <div v-else>
        <br />
        <p>Please click on a Deliverer...</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import DelivererDetails from "./Deliverer";

export default {
  name: "deliverers-list",
  components: { DelivererDetails },
  data() {
    return {
      deliverers: [],
      currentDeliverer: null,
      currentIndex: -1
    };
  },
  methods: {
    //   onDataChange(items) {
    //   let _deliverers = [];

    //   items.forEach((item) => {
    //     let key = item.key;
    //     let data = item.val().Profile;
    //     console.log(key);
    //     // debugger
    //       // console.log("items is:\n", JSON.stringify(items, null, 2));
    //     // let AccountStatus = item.val().Profile.AccountStatus
    //     _deliverers.push({
    //       // key: key,
    //       // // title: data.profile.email,
    //       // //  status: data.AccountStatus,
    //       // status: AccountStatus,
    //       // email: data.Email,
    //       data
    //     });
    //   });
      
    //    this.deliverers = _deliverers;
    //   //  console.log(JSON.stringify(this.data))
    //     console.log(this.data)
    //  },


    // onDataChange(items) {
    //   let _deliverers = [];

    //   Object.values(items).forEach((item) => {
    //     let key = item.key;
        
    //     // let data = item['Profile']
       
    //     // let FullName = data.FullName;
    //     // _deliverers.push({
    //     //   key: key,
    //     //   title: FullName,
    //     //   description: data.AccountStatus,
    //     //   // published: data.published,
    //     // });
    //     console.log(key)
    //   });

    //   this.deliverers = _deliverers;
    // },

    // onDataChange(snapshot) {
    //   var data = snapshot.val();

    //   let _deliverers=[
    //     {
    //       Email: '',
    //       AccountStatus: '',
    //     }
    //   ];
    //   for(let i in data){
    //     console.log(data[i].Profile.Email);
    //     _deliverers.push(data[i].Profile.Email)

    //   }
    //   this.deliverers = _deliverers

    // },

//     onDataChange(snapshot) {
//   const items = snapshot.val();
//   // console.log("items is:\n", JSON.stringify(items, null, 2));
        
//   let _deliverers = [];
//  Object.values(items).forEach((item) => {
//     // let item = items[key];
//     let one  = item.Profile;
    
//     // console.log(item.Profile.Email);
//     // let data = items.val().Profile;
//     // _deliverers.push({
//     //   // key: key,
//     //   status: data.AccountStatus,
//     //   email: data.Email,
//     // });
//   });

//   this.deliverers = _deliverers;
// },

onDataChange(snapshot) {
    
      let data = snapshot.val();
      console.log(data);
      let _deliverers = [];
      Object.keys(data).forEach(key => {
         _deliverers.push({
         key: key,
         user: data[key].Profile,
          // text: data[key].text}
         });
      });
      this.deliverers = _deliverers;

     

    },


    refreshList() {
      this.currentDeliverer = null;
      this.currentIndex = -1;
    },

    setActiveDeliverer(deliverer, index) {
      this.currentDeliverer = deliverer;
      this.currentIndex = index;
    },

    removeAllDeliverers() {
      DataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    DataService.getAll().on("value", this.onDataChange);
//  DataService.getAll().on("value", (snapshot)=> {
    //   var data = snapshot.val();
    //   let _tutorials=[]
    //   for(let i in data){
    //     console.log(data[i].Profile.Email);
    //     // _tutorials.push(data[i].Profile.Email)

    //   }
    //   // this.tutorials = _tutorials

      
    // });
  },
  beforeDestroy() {
    DataService.getAll().off("value", this.onDataChange);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
