import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/posts/Post.vue'
import PostDetails from '../views/posts/PostDetail.vue'

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
]

routes.forEach(routeItem =>{ routeItem['props'] = true })

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
