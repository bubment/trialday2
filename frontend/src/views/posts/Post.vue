<template>
  <table class="table" v-if="posts.length">
  <thead>
    <tr>
      <th scope="col">Username</th>
      <th scope="col">Post title</th>
    </tr>
  </thead>
  <tbody>
    <template v-for="post in posts">
      <tr>
        <td>{{post.username}}</td>
        <td><router-link :to="{name : 'PostDetails', params:{ id:post.id }}" class="dropdown-item">{{post.title}}</router-link></td>
      </tr>
    </template>
  </tbody>
</table>
<h2 style="margin: 30px 30px" v-else v-if="!isLoaderOn">There was a problem durring the server communication :(</h2>
  <Loader v-if="isLoaderOn"/>
</template>

<script>
import Loader from '../../components/Loader.vue'

export default {
    name: 'Posts',
    components : { Loader },
    data(){
        return{
          posts:[],
          userMessage:"",
          isLoaderOn:false
        }
    },

    mounted(){
      this.isLoaderOn = true
      fetch("http://localhost:1337/getPosts")
      .then(res => res.json())
      .then(result => {
        this.posts = result.posts ? result.posts : []
      })
      .catch(err => this.userMessage(err))
      .finally(() => this.isLoaderOn = false);
    }
}
</script>