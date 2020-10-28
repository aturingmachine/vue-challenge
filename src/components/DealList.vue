<template>
  <div class="list-container">
    <div class="pa-5">
      <DealRow v-for="deal in deals" :key="deal.id" :deal="deal" />
    </div>
  </div>
</template>

<script>
import DealRow from './DealRow';

export default {
  components: {
    DealRow
  },

  computed: {
    deals() {
      return this.$store.state.deals;
    }
  }
};
</script>

<style scoped>
.list-container {
  max-width: 1000px;
  display: flex;
  margin: auto;
}

@media screen and (max-width: 900px) {
  .list-container {
    max-width: 100%;
  }
}
</style>
