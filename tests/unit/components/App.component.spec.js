import { shallowMount } from '@vue/test-utils';
import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
import App from '../../../src/App';
import {
  dealsActionTypes,
  dealsStatus
} from '../../../src/store/dealsStoreTypes';
import DealList from '../../../src/components/DealList';

chai.use(spies);

describe('App Component', () => {
  let component;
  let dispatchSpy = chai.spy(() => {});

  it('should dispatch a GetDeals action on mounted', () => {
    component = shallowMount(App, {
      mocks: {
        $store: {
          state: {
            status: dealsStatus.Unloaded
          },
          dispatch: dispatchSpy
        }
      }
    });

    expect(dispatchSpy).to.have.been.called.with(dealsActionTypes.GetDeals);
  });

  describe('Loading State', () => {
    describe('Unloaded Status', () => {
      beforeEach(() => {
        component = shallowMount(App, {
          mocks: {
            $store: {
              state: {
                status: dealsStatus.Unloaded
              },
              dispatch: dispatchSpy
            }
          }
        });
      });

      it('should show a spinner if the status is Unloaded', () => {
        expect(component.find('.loading-spinner').exists()).to.be.true;
      });

      it('should not show a deal list if the status is Unloaded', () => {
        expect(component.findComponent(DealList).exists()).to.be.false;
      });
    });

    describe('Loading Status', () => {
      beforeEach(() => {
        component = shallowMount(App, {
          mocks: {
            $store: {
              state: {
                status: dealsStatus.Loading
              },
              dispatch: dispatchSpy
            }
          }
        });
      });

      it('should show a spinner if the status is Loading', () => {
        expect(component.find('.loading-spinner').exists()).to.be.true;
      });

      it('should not show a deal list if the status is Loading', () => {
        expect(component.findComponent(DealList).exists()).to.be.false;
      });
    });

    describe('Success Status', () => {
      beforeEach(() => {
        component = shallowMount(App, {
          mocks: {
            $store: {
              state: {
                status: dealsStatus.Success
              },
              dispatch: dispatchSpy
            }
          }
        });
      });

      it('should not show a spinner if the status is Success', () => {
        expect(component.find('.loading-spinner').exists()).to.be.false;
      });

      it('should show a deal list if the status is Success', () => {
        expect(component.findComponent(DealList).exists()).to.be.true;
      });
    });
  });
});
