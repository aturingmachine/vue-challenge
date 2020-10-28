<template>
  <v-app>
    <v-app-bar app color="primary">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="bdlogo.svg"
          transition="scale-transition"
          width="195"
        />
      </div>
    </v-app-bar>

    <v-main>
      <div v-if="!isLoading">
        <DealList />
      </div>
      <div v-else-if="isLoading" class="loading-spinner">
        Fetching The Latest Deals...
        <v-progress-circular
          indeterminate
          color="primary"
          :size="150"
          :width="15"
        ></v-progress-circular>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import DealList from './components/DealList';
import { dealsActionTypes, dealsStatus } from './store/dealsStoreTypes';

export default {
  name: 'App',

  components: {
    DealList
  },

  computed: {
    isLoading() {
      return [dealsStatus.Unloaded, dealsStatus.Loading].includes(
        this.$store.state.status
      );
    }
  },

  data: () => ({
    //
  }),

  mounted() {
    this.$store.dispatch(dealsActionTypes.GetDeals);
  }
};
</script>

<style scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  height: 300px;
  align-items: center;
  flex-direction: column;
  font-style: italic;
}
</style>
