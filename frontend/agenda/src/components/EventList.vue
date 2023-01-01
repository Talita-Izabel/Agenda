<template>
  <div class="list">
    <h1>Eventos</h1>

    <div class="container align-self-center">
      <div v-for="event in this.events" :key="event.id">
        <div class="row d-flex justify-content-center">
          <div class="card" style="width: 21rem">
            <div class="card-body">
              <div class="row justify-content-between">
                <h5 class="col-4 card-title">{{ event.summary }}</h5>
                <button class="col-4 btn" @click="deleteEvent(event.id)">
                  <i class="fa fa-trash"></i>
                </button>
              </div>

              <h6 class="card-subtitle mb-2 text-muted">
                {{ event.location }}
              </h6>
              <p class="card-text">
                {{ event.description }} <br />
                <br />
                {{ event.start }} <br />
                {{ event.end }}
              </p>
              <a @click="updateEvent(event.id)" class="card-link">Atualizar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    console.log("teste");
    this.getEvents();
  },
  methods: {
    async deleteEvent(id) {
      console.log("banana de pijama", id);
      let result = await axios.delete(
        `http://localhost:5969/calendar/delete/event/${id}`
      );
      console.log(result);

      // Remove o evento do array
      this.events.forEach((event, index) => {
        if (event.id == id) this.events.splice(index, 1);
      });
    },
    async getEvents() {
      console.log("getEvents");
      let result = await axios.get(
        `http://localhost:5969/calendar/list/events`
      );

      this.events = result.data.events;

      console.log(this.events);
    },
    details(id) {
      console.log("details", id);
    },
    updateEvent(id) {
      console.log("updateEvent", id);
      this.$router.replace({ path: `/atualizar/:id`, query: { id } });
    },
  },
  data() {
    return {
      events: [],
    };
  },
};
</script>

<style scoped>
.card {
  margin-top: 2rem;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    position: absolute;
    align-items: center;
  }
}
</style>
