<template>
  <div v-if="currentDeliverer" class="edit-form">
    <h4>Deliverer</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentDeliverer.title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentDeliverer.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentDeliverer.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentDeliverer.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteDeliverer">
      Delete
    </button>

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
      DataService.update(this.currentDeliverer.key, {
        published: status,
      })
        .then(() => {
          this.currentDeliverer.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateDeliverer() {
      const data = {
        title: this.currentDeliverer.title,
        description: this.currentDeliverer.description,
      };

      DelivererDataService.update(this.currentDeliverer.key, data)
        .then(() => {
          this.message = "The eliverer was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteDeliverer() {
      DelivererDataService.delete(this.currentDeliverer.key)
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
