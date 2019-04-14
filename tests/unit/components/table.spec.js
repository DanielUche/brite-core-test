
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Table from '../../../src/components/data-table/Table.component.vue';

describe('Table.component.vue Created', () => {
  it('Should Render Table Component when Required Props is Passed', () => {
    const columns = [
      { name: 'Key', key: true, sortable: true },
      { name: 'Name', sortable: true, editable: true },
      { name: 'Description', sortable: true, editable: true },
      {
        name: 'Amount', key: true, sortable: true, editable: true,
      },
      { name: 'Date', sortable: true, editable: true }];
    const wrapper = shallowMount(Table, {
      propsData: { columns, data: [] },
    });
    expect(wrapper.vm.columns).to.equal(columns);
  });

  // Inspect the raw component options
  it('Table.component: has a created hook', () => {
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
