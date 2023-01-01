<template>
  <nav class="navbar navbar-dark bg-dark m-0" aria-label="First navbar example">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Agenda</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample01"
        aria-controls="navbarsExample01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample01">
        <ul class="navbar-nav me-auto mb-2">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/cadastrar"
              >Cadastrar Evento</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/eventos"
              >Listar Eventos</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
