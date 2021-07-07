<template>
  <div id="nav">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid mr-1r">
    <a class="navbar-brand" href="#"><img class="logo-img" src="@/assets/sample-logo.svg"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
      <ul class="navbar-nav ">
        <li class="nav-item">
          <router-link :to="{name : 'Posts' }" class="nav-link">Posts</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name : 'Photo' }" class="nav-link">Photos</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </div>
  <router-view/>
</template>

<style>
.logo-img{
    height: 40px;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
