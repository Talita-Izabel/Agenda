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
                <button class="col-4 btn" @click="deleteEvent()">
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
              <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a>
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
    deleteEvent() {
      console.log("banana de pijama");
    },
    async getEvents() {
      console.log("getEvents");
      let result = await axios.get(
        `http://localhost:5969/calendar/list/events`
      );

      this.events = result.data.events;
      console.log(this.events);
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
