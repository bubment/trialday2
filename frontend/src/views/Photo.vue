<template>
<div class="container" v-if="albums.length">
    <template v-for="album in albums">
        <div v-if="album.photos.length">
            <h2>{{ album.title }}</h2><br>
            <div class="row">
                <template v-for="photo in album.photos">
                    <div class="col-2 col-xs-4"><img :src="photo" class="mb10"></div>
                </template>
            </div>
            <br>
        </div>

    </template>
</div>
<h2 style="margin: 30px 30px" v-else v-if="!isLoaderOn">There was a problem durring the server communication :(</h2>

  <Loader v-if="isLoaderOn"/>
</template>

<script>
import Loader from '../components/Loader.vue'

export default {
    name: 'Photo',
    components : { Loader },
    data(){
        return{
            albums:[],
            isLoaderOn:false
        }
    },

    mounted(){
      this.isLoaderOn = true
      fetch("http://localhost:1337/getPhotosByAlbums")
      .then(res => res.json())
      .then(result => {
        this.albums = result.albums ? result.albums : []
      })
      .catch(err => {
          console.log(err)
      })
      .finally(() => this.isLoaderOn = false);
    }
}
</script>
<style scoped>
.mb10{
    margin-bottom: 10px;
}
</style>