
import { expect } from 'chai';
// import { shallowMount } from '@vue/test-utils';
import Table from '@/components/data-table/Table.component.vue';

require('jsdom-global')();

describe('Table.component.vue Created', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message';
//     const wrapper = shallowMount(Table, {
//       propsData: { msg },
//     });
//     expect(wrapper.text()).to.include(msg);
//   });

  // Inspect the raw component options
  it('has a created hook', () => {
    expect(Table.created).to.be.a('function');
  });

  const defaultData = Table.data();
  it('Checks to see that data is a function', () => {
    expect(Table.data).to.be.a('function');
  });
  it('check to see if data has sort props', () => {
    expect(defaultData.sort).to.be.a('Object');
  });
  it('check to see if data has sortedItems props', () => {
    expect(defaultData.sortedItems).to.be.a('Array');
  });
});
