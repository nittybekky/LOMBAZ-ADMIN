<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="deliverer.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="deliverer.description"
          name="description"
        />
      </div>

      <button @click="saveDeliverer" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newDeliverer">Add</button>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "add-deliverer",
  data() {
    return {
      deliverer: {
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveDeliverer() {
      var data = {
        title: this.deliverer.title,
        description: this.deliverer.description,
        published: false
      };

      DataService.create(data)
        .then(() => {
          console.log("Created new item successfully!");
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newDeliverer() {
      this.submitted = false;
      this.deliverer = {
        title: "",
        description: "",
        published: false
      };
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
