import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/posts/Post.vue'
import PostDetails from '../views/posts/PostDetail.vue'
import Photo from '../views/Photo.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/:id',
    name: 'PostDetails',
    component: PostDetails
  },
  {
    path: '/photo',
    name: 'Photo',
    component: Photo
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },

]

routes.forEach(routeItem =>{ routeItem['props'] = true })

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
