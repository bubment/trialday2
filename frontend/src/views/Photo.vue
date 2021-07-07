<template>
<div class="container" v-if="albums.length">
    <template v-for="album in albums">
        <div v-if="album.photos.length">
            <h2>{{ album.title }}</h2><br>
            <div class="row">
                <template v-for="photo in album.photos">
                    <div class="col-2 col-xs-4"><img :src="photo"></div>
                </template>
            </div>
            <br>
        </div>

    </template>
</div>

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