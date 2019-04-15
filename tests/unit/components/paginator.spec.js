
import Vue from 'vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Paginator from '../../../src/components/data-table/Paginator.component.vue';

function getRenderedItems(Component, propsData) {
  const Constructor = Vue.extend(Component);
  const vm = new Constructor({ propsData }).$mount();
  return vm.filteredItems;
}

const columns = [
  { name: 'Key', key: true, sortable: true },
  { name: 'Name', sortable: true, editable: true },
  { name: 'Description', sortable: true, editable: true },
  {
    name: 'Amount', key: true, sortable: true, editable: true,
  },
  { name: 'Date', sortable: true, editable: true }];

const data = [{ id: 1, name: 'Falz' }, { id: 1, name: 'Yemi' }];
const testData2 = [{ id: 1, price: 1000 }, { id: 1, price: 5000 }];

describe('Paginator.component.vue', () => {
  it('renders correctly with different props', () => {
    expect(getRenderedItems(Paginator, {
      items: data, columns: [],
    })).to.equal(data);

    expect(getRenderedItems(Paginator, {
      items: testData2, columns: [],
    })).to.equal(testData2);
  });
});

describe('Paginator.component.vue Created', () => {
  it('Should correctly set columns when created', () => {
    const wrapper = shallowMount(Paginator, {
      propsData: { columns, items: [] },
    });
    expect(wrapper.vm.columns).to.equal(columns);
  });
  // Inspect the raw component options
  it('Paginator.component: has a created hook', () => {
    expect(Paginator.created).to.be.a('function');
  });

  it('Checks to see that data is a function', () => {
    expect(Paginator.data).to.be.a('function');
  });
});
