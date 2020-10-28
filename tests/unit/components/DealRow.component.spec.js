import { shallowMount } from '@vue/test-utils';
import chai from 'chai';
const expect = chai.expect;
import DealRow from '../../../src/components/DealRow';

describe('Deal Row Component', () => {
  let component;
  let mockDeal;

  beforeEach(() => {
    mockDeal = {
      image: 'imageUrl',
      headline: 'dealHeadline',
      description_preview: 'description preview',
      editor: 'john doe',
      categories: [
        { slug: 'cat1Slug', name: 'cat1Name' },
        { slug: 'cat2Slug', name: 'cat2Name' }
      ],
      merchant: {
        logo_urls: { '100x32': 'merchantImage' }
      },
      brads_deals_exclusive: true,
      expires_at: '2020-11-21T23:59:00.000-05:00'
    };

    component = shallowMount(DealRow, {
      propsData: {
        deal: mockDeal
      }
    });
  });

  it('should show the deal image and set its src to the deals image property', () => {
    const dealImage = component.find('.deal-image');
    expect(dealImage.exists()).to.be.true;
    expect(dealImage.attributes('src')).to.equal('imageUrl');
  });

  it('should render the headline and description of the deal', () => {
    expect(component.find('.details-main a').text()).to.equal('dealHeadline');
    expect(component.find('.details-main p').text()).to.equal(
      'description preview'
    );
  });

  it('should render the deals editor in the footer', () => {
    expect(component.find('.details-footer .editor-tag').text()).to.equal(
      'From: john doe'
    );
  });

  it('should render a category chip for each category', () => {
    const categoryChips = component.findAll('.details-footer v-chip-stub');
    expect(categoryChips.length).to.equal(2);
    expect(categoryChips.at(0).text()).to.equal('cat1Name');
    expect(categoryChips.at(1).text()).to.equal('cat2Name');
  });

  it('should render the merchant logo', () => {
    const merchantImage = component.find('.aux-container  img');
    expect(merchantImage.attributes('src')).to.equal('merchantImage');
  });

  it('should render a exclusive chip if the deal is exclusive', () => {
    const exclusiveChip = component.find('.aux-container v-chip-stub');
    expect(exclusiveChip.exists()).to.be.true;
    expect(exclusiveChip.text()).to.equal('Exclusive!');
  });

  it('should not render a exclusive chip if the deal is not exclusive', () => {
    mockDeal.brads_deals_exclusive = false;
    component = shallowMount(DealRow, {
      propsData: {
        deal: mockDeal
      }
    });
    const exclusiveChip = component.find('.aux-container .v-chip-stub');
    expect(exclusiveChip.exists()).to.be.false;
  });

  describe('Modal Interactions', () => {
    it('should set detailsDialog to true when the headline is clicked', async () => {
      const headline = component.find('.details-main a');
      expect(component.vm.detailsDialog).to.be.false;
      await headline.trigger('click');
      expect(component.vm.detailsDialog).to.be.true;
    });

    it('should set detailsDialog to true when the deal image is clicked', async () => {
      const dealImage = component.find('.deal-image');
      expect(component.vm.detailsDialog).to.be.false;
      await dealImage.trigger('click');
      expect(component.vm.detailsDialog).to.be.true;
    });
  });
});
