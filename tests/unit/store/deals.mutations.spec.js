import { expect } from 'chai';
import {
  dealsStatus,
  dealsMutationTypes
} from '../../../src/store/dealsStoreTypes';
import { dealsMutations } from '../../../src/store/index';

describe('Deals Mutations', () => {
  describe('StartLoad', () => {
    it('should set the status to loading', () => {
      const state = {
        status: undefined
      };

      dealsMutations[dealsMutationTypes.StartLoad](state);

      expect(state.status).to.equal(dealsStatus.Loading);
    });
  });

  describe('GetDealsSuccess', () => {
    it('should set the status to success and insert the deals into state', () => {
      const state = {
        status: undefined,
        deals: undefined
      };

      const payload = {
        type: dealsMutationTypes.GetDealsSuccess,
        deals: [
          {
            id: '1'
          }
        ]
      };

      dealsMutations[dealsMutationTypes.GetDealsSuccess](state, payload);

      expect(state.status).to.equal(dealsStatus.Success);
      expect(state.deals.length).to.equal(1);
      expect(state.deals[0].id).to.equal('1');
    });
  });

  describe('GetDealsError', () => {
    it('should set the status to error and the deals to an empty array', () => {
      const state = {
        status: undefined,
        deals: undefined
      };

      dealsMutations[dealsMutationTypes.GetDealsError](state);

      expect(state.status).to.equal(dealsStatus.Error);
      expect(state.deals).to.not.be.undefined;
      expect(state.deals).to.have.lengthOf(0);
    });
  });
});
