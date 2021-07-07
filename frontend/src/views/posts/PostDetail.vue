<template>
  <div v-if="postInfo.username">
      <h1>{{ postInfo.title }}</h1><br>
      <h3>Written by {{ postInfo.username }}</h3>
      <p>{{ postInfo.body }}</p>
      <br><br>
      <div v-if="comments">
            <h3>Comments</h3><br>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Comment Name</th>
                <th scope="col">Comment Body</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="comment in comments">
                <tr>
                    <td>{{comment.name}}</td>
                    <td>{{comment.body}}</td>
                </tr>
                </template>
            </tbody>
            </table>
      </div>
  </div>
  <div v-else v-if="!isLoaderOn">
      <h1>The post you are looking for is no longer exists or never existed :(</h1>
  </div>
  <Loader v-if="isLoaderOn"/>
</template>

<script>
import Loader from '../../components/Loader.vue'

export default {
    props: ['id'],
    components : { Loader },
    data(){
        return{
            isLoaderOn:false,
            postId: this.$route.params.id,
            postInfo: {},
            comments: []
        }
    },
    mounted(){
      this.isLoaderOn = true

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({postId:this.postId}),
        } 

      fetch("http://localhost:1337/getPostDetails",options)
      .then(res => res.json())
      .then(result => {
        this.postInfo = result.postDetails.postInfo ? result.postDetails.postInfo : {}
        this.comments = result.postDetails.comments ? result.postDetails.comments : []
      })
      .catch(err => {
        console.log("Error:",err)
      })
      .finally(() => this.isLoaderOn = false);
    }
}
</script>

<style>

</style>