import { shallowMount } from '@vue/test-utils';
import chai from 'chai';
const expect = chai.expect;
import CountdownTimer from '../../../src/components/CountdownTimer';

describe('Countdown Timer Component', () => {
  let component;

  it('should show a countdown to the expires_at date', () => {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 2);
    component = shallowMount(CountdownTimer, {
      propsData: {
        expiryTime: expirationDate.toString()
      }
    });

    const timer = component.find('.expiration-timer');

    component.vm.$mount();

    expect(timer.text()).to.equal('Expires In: 0d 0h 1m');
  });

  it('should show an expired label if the expiration date has passed', () => {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() - 2);
    component = shallowMount(CountdownTimer, {
      propsData: {
        expiryTime: expirationDate.toString()
      }
    });

    const timer = component.find('.expiration-timer');

    component.vm.$mount();

    expect(timer.text()).to.equal('EXPIRED');
  });
});
