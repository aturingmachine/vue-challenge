import Vue from 'vue';
import Vuex from 'vuex';
import dealsService from '../services/deals-service';
import {
  dealsActionTypes,
  dealsStatus,
  dealsMutationTypes
} from './dealsStoreTypes';

Vue.use(Vuex);

const state = {
  status: dealsStatus.Unloaded,
  deals: undefined
};

export const dealsMutations = {
  [dealsMutationTypes.StartLoad](state) {
    state.status = dealsStatus.Loading;
  },

  [dealsMutationTypes.GetDealsSuccess](state, payload) {
    state.status = dealsStatus.Success;
    state.deals = payload.deals;
  },

  [dealsMutationTypes.GetDealsError](state) {
    state.status = dealsStatus.Error;
    state.deals = [];
  }
};

export const dealsActions = {
  [dealsActionTypes.GetDeals](context) {
    context.commit({
      type: dealsMutationTypes.StartLoad
    });

    dealsService
      .getDeals()
      .then((response) => {
        console.log(response);
        context.commit({
          type: dealsMutationTypes.GetDealsSuccess,
          deals: response.data.deals
        });
      })
      .catch((response) => {
        console.error(response);
        context.commit({
          type: dealsMutationTypes.GetDealsError
        });
      });
  }
};

export default new Vuex.Store({
  state: state,
  mutations: dealsMutations,
  actions: dealsActions,
  modules: {}
});
