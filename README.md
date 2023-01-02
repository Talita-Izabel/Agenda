# Agenda

Trabalho de Web Services 'Agenda' que utiliza a combinação de duas APIs ([Google Calendar](https://developers.google.com/calendar/api/guides/overview) e [Telegram](https://core.telegram.org/bots/api)). Este trabalho tem como funcionalidade de criar, listar, editar, deletar e avisar no horário dos eventos da Agenda Google, onde em cada uma dessas ações serão notificadas no Telegram (Bot). Atualmente os [métodos de entrega](https://developers.google.com/calendar/api/concepts/reminders?hl=en)/notificação oferecidos pelo Google Agenda são por e-mail ou pop-up.

No back-end foi utilizado [Node.js](https://nodejs.org/en/about/) com express para realizar a comunicação com o fron-end. No front-end foi utilizado o [Vue.js](https://vuejs.org/). Como a api apenas notifica por e-mail ou pop-up, foi utilizado a biblioteca [Bree](https://github.com/breejs/bree) para realizar o agendamento dos eventos.

*GitHub Pages* - https://talita-izabel.github.io/Agenda/

*Bot* - @NyyyyxBot

### APIs
* [Google Calendar](https://developers.google.com/calendar/api/guides/overview)
* [Telegram](https://core.telegram.org/bots/api)

#### Execução da aplicação - Back-End

OBS.: É necessário adicionar os arquivos .env (variáveis de ambiente) e token.json (arquivo gerado pelo Google com as credenciais do projeto).

```shell
cd backend
```

```shell
npm install
```

Logo após execute o sistema:

```
npm run start
```

---

#### Execução da aplicação - Front-End

```shell
cd frontend/agenda
```

```shell
npm install
```

Logo após execute o sistema:

```
npm run dev
```

---


#### Variáveis de ambiente

* `CORS_ORIGIN_ALLOWED` - Adicionar hosts para permissionamento do CORS( Cross Origin Resource Sharing ).
* `PORT` - Porta da aplicação backend.
* `TOKEN` - Token do bot da api do Telegram.
* `CHAT_ID` - ID do chat/conversa com o bot.

## Authors

* **Talita Silva** - *Complements* - [Talita-Izabel](https://github.com/Talita-Izabel)