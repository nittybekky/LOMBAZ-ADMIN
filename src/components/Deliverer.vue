<template>
  <div v-if="currentDeliverer" class="edit-form">
    <h4>Deliverer</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="fullname"
          v-model="currentDeliverer.user['Fullname']"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentDeliverer.user['AccountStatus']"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentDeliverer.user.AccountStatus == "Verified" ? "Verified" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentDeliverer.user.AccountStatus == 'Verified'"
      @click="updatePublished('Unverified')"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished('Verified')"
    >
      Publish
    </button>

    <!-- <button class="badge badge-danger mr-2" @click="deleteDeliverer">
      Delete
    </button> -->

    <button type="submit" class="badge badge-success" @click="updateDeliverer">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Deliverer...</p>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "deliverer",
  props: ["deliverer"],
  data() {
    return {
      currentDeliverer: null,
      message: "",
    };
  },
  watch: {
    deliverer: function(deliverer) {
      this.currentDeliverer = { ...deliverer };
      this.message = "";
    },
  },
  methods: {
    updatePublished(status) {
      DataService.update(encodeURI((this.currentDeliverer.key)+"/Profile"), {
        AccountStatus: status,
      })
        .then(() => {
          this.currentDeliverer.user.AccountStatus = status;
          this.message = "User status was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateDeliverer() {
      const data = {
        AccountStatus:  this.currentDeliverer.user.AccountStatus,
        Fullname: this.currentDeliverer.user.Fullname,
      };

      DataService.update(encodeURI((this.currentDeliverer.key)+"/Profile"), data)
        .then(() => {
          this.message = "The Deliverer was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteDeliverer() {
      DataService.delete(this.currentDeliverer.key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentDeliverer = { ...this.deliverer }
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
