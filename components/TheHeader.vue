<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/products" class="nav-link">Products</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/form" class="nav-link">Form</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>