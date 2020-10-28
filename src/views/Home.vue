<template>
  <div class="home">
    <DealList />
  </div>
</template>

<script>
// @ is an alias to /src
import DealList from '@/components/DealRow.vue';
import { dealsActionTypes } from '../store/dealsStoreTypes';

export default {
  name: 'Home',
  components: {
    DealList
  },

  methods: {},
  mounted() {
    console.log('Home Created', this.$store.state.status);
    this.$store.dispatch(dealsActionTypes.GetDeals);
  }
};
</script>
