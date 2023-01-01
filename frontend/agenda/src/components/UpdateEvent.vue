<template>
  <div class="container align-self-center">
    <div class="mb-3">
      <label for="summary" class="form-label">Titulo</label>
      <input
        type="text"
        class="form-control"
        v-model="event.summary"
        id="summary"
      />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Descrição</label>
      <input
        type="text"
        class="form-control"
        id="description"
        v-model="event.description"
      />
    </div>
    <div class="mb-3">
      <label for="location" class="form-label">Local</label>
      <input
        type="text"
        class="form-control"
        id="location"
        v-model="event.location"
      />
    </div>
    <div class="mb-3">
      <label for="creator" class="form-label">Criador</label>
      <input
        type="text"
        class="form-control"
        id="creator"
        v-model="event.creator"
        disabled
      />
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        v-model="chekbox"
        id="flexCheckDefault"
      />
      <label class="form-check-label" for="flexCheckDefault">
        Evento dia inteiro?
      </label>
    </div>
    <div v-if="!chekbox">
      <div class="mb-3">
        <label for="dateStart" class="form-label">Inicio</label>
        <input
          type="datetime-local"
          class="form-control"
          id="dateStart"
          v-model="event.start"
          required
        />
      </div>

      <div class="mb-3">
        <label for="dateEnd" class="form-label">Fim</label>
        <input
          type="datetime-local"
          class="form-control"
          id="dateEnd"
          v-model="event.end"
          required
        />
      </div>
    </div>
    <div v-else>
      <div class="mb-3">
        <label for="dateStart" class="form-label">Inicio</label>
        <input
          type="date"
          class="form-control"
          id="dateStart"
          v-model="event.start"
          required
        />
      </div>

      <div class="mb-3">
        <label for="dateEnd" class="form-label">Fim</label>
        <input
          type="date"
          class="form-control"
          id="dateEnd"
          v-model="event.end"
          required
        />
      </div>
    </div>
    <button @click="update()" class="btn btn-primary">Atualizar</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  async created() {
    this.eventId = this.$route.query.id;

    let result = await axios.get(
      `http://localhost:5969/calendar/event/${this.eventId}`
    );
    this.event = result.data.event;
    console.log(this.event);
  },
  methods: {
    async update() {
      let dateEnd;
      let dateStart = new Date();

      console.log("update");
      console.log(this.event);

      if (!this.chekbox && this.event.start.includes("T")) {
        let dateAux = this.event.start;
        let dateArr = this.event.start.split("T")[0].split("-");
        let hourArr = this.event.start.split("T")[1].split(":");

        dateStart.setDate(dateArr[2]);
        dateStart.setMonth(dateArr[1] - 1);
        dateStart.setFullYear(dateArr[0]);
        dateStart.setHours(hourArr[0]);
        dateStart.setMinutes(hourArr[1]);

        this.event.start = {
          dateTime: dateStart.toISOString("pt-br"),
          timeZone: "America/Sao_Paulo",
        };

        if (this.event.length == 0) {
          this.event.end = dateAux;
        }

        dateEnd = new Date();
        dateArr = this.event.end.split("T")[0].split("-");
        this.event.end = dateAux;
        hourArr = this.event.end.split("T")[1].split(":");

        dateEnd.setDate(dateArr[2]);
        dateEnd.setMonth(dateArr[1] - 1);
        dateEnd.setFullYear(dateArr[0]);
        dateEnd.setHours(hourArr[0]);
        dateEnd.setMinutes(hourArr[1]);

        this.event.end = {
          dateTime: dateEnd.toISOString("pt-br"),
          timeZone: "America/Sao_Paulo",
        };
      } else if (this.chekbox && !this.event.start.includes("T")) {
        this.event.start = {
          date: this.event.start,
        };

        if (!this.event.end.includes("T")) {
          this.event.end = {
            date: this.event.end,
          };
        } else {
          this.event.end = {
            date: this.event.start.date,
          };
        }
      }

      console.log("EVENT", this.event);
      let result = await axios.put(
        `http://localhost:5969/calendar/update/event/${this.eventId}`,
        this.event
      );

      console.log(result);
      this.$router.replace({ path: `/eventos` });
    },
  },
  data() {
    return {
      eventId: "",
      chekbox: false,
      event: {},
    };
  },
};
</script>
