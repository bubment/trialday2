<template>
  <!-- <div class="home">
    <h1>Hello there</h1>
  </div> -->
  <table class="table" v-if="users.length">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Gender</th>
      <th scope="col">Birth</th>
    </tr>
  </thead>
  <tbody>
    <template v-for="user in users">
      <tr>
        <td>{{user.given_name}} {{user.family_name}}</td>
        <td>{{user.gender}}</td>
        <td>{{user.birthdate}}</td>
      </tr>
    </template>
  </tbody>
</table>
  <Loader v-if="isLoaderOn"/>
</template>

<script>
import Loader from '../components/Loader.vue'

export default {
    name: 'Home',
    components : { Loader },
    // props:{
    //     projectsSrc : String
    // },
    data(){
        return{
          users:[],
          userMessage:"",
          isLoaderOn:false
        }
    },
    methods:{
            test: function(){

            }
    },
    mounted(){
      this.isLoaderOn = true
      fetch("http://localhost:1337/getComments")
      .then(res => res.json())
      .then(result => {
        console.log(result.data)
        this.users = result.data
      })
      .catch(err => this.userMessage(err))
      .finally(() => this.isLoaderOn = false);
    }
}
</script>

