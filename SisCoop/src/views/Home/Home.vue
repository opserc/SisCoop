<template>
  <default-layout>
    <section slot="filters" class="pokedex-filters mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-6 ml-auto mr-auto">
            <div class="text-center">
              <label>Busca a tu pokemon favorito:</label>
              <input
                type="text"
                class="form-control"
                v-model="filter"
                placeholder="Introduce el nombre del pokemon">
              <small id="emailHelp" class="form-text text-muted">Actualmente solo se pueden hacer búsquedas por nombre</small>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section slot="content" class="podexex-items">
      <div class="row">
        <div
          class="col-md-4 col-lg-3 mb-3"
          v-for="(item, index) in filteredPokemon"
          :key="index"
          @click.prevent="goToDetails(item)">
          <pokedex-card
            :pokemon="item"></pokedex-card>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center mt-3">
          <button v-if="filter === ''" class="btn btn-primary" @click.prevent="showMorePokemon">Cargar más pokemon</button>
        </div>
      </div>
    </section>
  </default-layout>
</template>
<script>
import DefaultLayout from '@/layouts/DefaultLayout'
import PokedexCard from '@/components/PokedexCard'
import {getPokemon} from '@/services/pokemon'
import _ from 'lodash'
export default {
  name: 'HomeView',
  data () {
    return {
      pokemon: [],
      limit: 12,
      filter: ''
    }
  },
  created () {
    getPokemon().then(response => {
      this.pokemon = response.data
    }).catch(err => console.error(err))
  },
  computed: {
    filteredPokemon () {
      let filteredPokemon = (this.filter === '') ? this.pokemon : this.pokemon.filter(item => {
        return _.includes(item.name.toLowerCase(), this.filter.toLowerCase())
      })
      return filteredPokemon.slice(0, this.limit)
    }
  },
  methods: {
    showMorePokemon () {
      this.limit += 12
    },
    goToDetails (pokemon) {
      this.$router.push({
        name: 'DetailPokemon',
        params: {
          pokemonName: pokemon.slug,
          pokemon: pokemon
        }
      })
    }
  },
  components: {
    DefaultLayout,
    PokedexCard
  }
}
</script>
