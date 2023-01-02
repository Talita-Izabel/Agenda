<template>
  <div class="container align-self-center">
    <h2>Cadastrar Evento</h2>
    <div class="mb-3 pt-2">
      <label for="summary" class="form-label">Titulo</label>
      <input type="text" class="form-control" v-model="summary" id="summary" />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Descrição</label>
      <input
        type="text"
        class="form-control"
        id="description"
        v-model="description"
      />
    </div>
    <div class="mb-3">
      <label for="location" class="form-label">Local</label>
      <input
        type="text"
        class="form-control"
        id="location"
        v-model="location"
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
          v-model="start"
          required
        />
      </div>

      <div class="mb-3">
        <label for="dateEnd" class="form-label">Fim</label>
        <input
          type="datetime-local"
          class="form-control"
          id="dateEnd"
          v-model="end"
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
          v-model="start"
          required
        />
      </div>

      <div class="mb-3">
        <label for="dateEnd" class="form-label">Fim</label>
        <input
          type="date"
          class="form-control"
          id="dateEnd"
          v-model="end"
          required
        />
      </div>
    </div>
    <button @click="register()" class="btn btn-primary">Criar Evento</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    async register() {
      let dateEnd;
      let dateStart = new Date();

      this.event = {
        summary: this.summary,
        location: this.location,
        description: this.description,
        reminders: {
          useDefault: true,
        },
      };

      if (!this.chekbox && this.start.length != 0) {
        let dateArr = this.start.split("T")[0].split("-");
        let hourArr = this.start.split("T")[1].split(":");

        dateStart.setDate(dateArr[2]);
        dateStart.setMonth(dateArr[1] - 1);
        dateStart.setFullYear(dateArr[0]);
        dateStart.setHours(hourArr[0]);
        dateStart.setMinutes(hourArr[1]);

        this.event.start = {
          dateTime: dateStart.toISOString("pt-br"),
          timeZone: "America/Sao_Paulo",
        };

        if (this.end.length == 0) {
          dateEnd = dateStart;
          dateEnd.setDate(dateEnd.getDate() + 1);
          this.event.end = {
            dateTime: dateEnd.toISOString("pt-br"),
            timeZone: "America/Sao_Paulo",
          };
        } else {
          dateEnd = new Date();
          dateArr = this.end.split("T")[0].split("-");
          hourArr = this.end.split("T")[1].split(":");

          dateEnd.setDate(dateArr[2]);
          dateEnd.setMonth(dateArr[1] - 1);
          dateEnd.setFullYear(dateArr[0]);
          dateEnd.setHours(hourArr[0]);
          dateEnd.setMinutes(hourArr[1]);

          this.event.end = {
            dateTime: dateEnd.toISOString("pt-br"),
            timeZone: "America/Sao_Paulo",
          };
        }
      } else if (this.chekbox && this.start.length != 0) {
        // let dateArr = this.start.split("-");

        // dateStart.setDate(dateArr[2]);
        // dateStart.setMonth(dateArr[1] - 1);
        // dateStart.setFullYear(dateArr[0]);

        this.event.start = {
          date: this.start,
        };

        if (this.end.length == 0) {
          dateEnd = dateStart;
          //dateEnd.setDate(dateEnd.getDate() + 1);
          this.event.end = {
            date: this.start,
          };
        } else {
          dateEnd = new Date();
          //   dateArr = this.end.split("-");

          //   dateEnd.setDate(dateArr[2]);
          //   dateEnd.setMonth(dateArr[1] - 1);
          //   dateEnd.setFullYear(dateArr[0]);

          this.event.end = {
            date: this.end,
          };
        }
      }

      console.log(this.event);
      let result = await axios.post(
        `http://localhost:5969/calendar/create/event`,
        this.event
      );
      console.log(result);
      this.$router.replace({ path: `/eventos` });
    },
  },
  data() {
    return {
      summary: "",
      description: "",
      location: "",
      start: "",
      end: "",
      chekbox: false,
      event: {},
    };
  },
};
</script>
