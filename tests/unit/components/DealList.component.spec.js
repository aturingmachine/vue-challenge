import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { expect } from 'chai';
import DealList from '../../../src/components/DealList';
import DealRow from '../../../src/components/DealRow';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('DealList', () => {
  let component;

  beforeEach(() => {
    const mockState = {
      state: {
        deals: [{ id: '1' }]
      }
    };

    component = shallowMount(DealList, {
      mocks: {
        $store: mockState
      }
    });
  });

  it('should render DealRows', () => {
    expect(component.findComponent(DealRow).exists()).to.be.true;
  });
});
