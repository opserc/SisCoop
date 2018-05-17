import Vue from 'vue'
import Router from 'vue-router'

// Views
import HomeView from '@/views/Home/Home'
import DetailPokemonView from '@/views/DetailPokemon/DetailPokemon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/detail/:pokemonName',
      name: 'DetailPokemon',
      component: DetailPokemonView
    }
  ]
})
