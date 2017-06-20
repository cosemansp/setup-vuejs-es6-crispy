/* @flow */

import Vue from 'vue';
import { mount } from 'avoriaz';
import VueWrapper from 'avoriaz/dist/VueWrapper';

// simplified mount function
// export const mount = (Component, propsData = {}) => {
//   const Ctor = Vue.extend(Component);
//   const vm = new Ctor({ propsData });
//   vm.$mount();
//   return vm;
// };

export const mountConfig = (config: ComponentOptions<Vue>) => {
  const vm = new Vue(config);
  vm.$mount();
  return new VueWrapper(vm);
};

/*
 * Original code
 * https://gist.github.com/chartinger/ca67dc17a5657334adb35357f40ad2b9
 *
 * Extra unit test info
 * https://gist.github.com/roberthamel/670640351ccac7a63630ec8b68537455
 * https://www.drydenwilliams.co.uk/code/2017/06/03/unit-testing-in-vuejs/
 * https://www.gitbook.com/book/eddyerburgh/avoriaz/details
 * https://tyronetudehope.com/2016/11/24/vue-js-vuex-testing-an-introduction/
 * https://www.coding123.org/mock-vuex-in-vue-unit-tests/
 */

const mockComponent = (name, props) => ({
  props,
  render(createElement) {
    return createElement(name, { props });
  },
});

export const getChildFromSelector = (parent, selector) => {
  const domElement = parent.$el.querySelector(selector);
  if (domElement == null || parent.$children === undefined) {
    return null;
  }
  // eslint-disable-next-line
  for (let i = 0; i < parent.$children.length; i++) {
    if (parent.$children[i].$el === domElement) {
      return parent.$children[i];
    }
  }
  return null;
};

const ignoreComponents = (elements, ignoreList) => {
  if (elements !== undefined) {
    if (elements.constructor === Array) {
      throw new Error('Array based component configuration is not supported');
    }
    Object.entries(elements).forEach(
      ([key]) => {
        ignoreList.push(key.toLowerCase());
      },
    );
  }
};

const mockComponents = (elements, mocks) => {
  if (elements !== undefined) {
    Object.entries(elements).forEach(([key, value]) => {
      // eslint-disable-next-line
      mocks[key] = mockComponent(key.toLowerCase(), value.props);
    });
  }
};

/* eslint-disable no-param-reassign */
export const shallow = (Component, propsData = {}, mock = false) => {
  const savedLocalComponents = Component.components;
  const savedName = Component.name;
  const savedGlobalComponents = Vue.options.components;
  const savedIgnoredElements = Vue.config.ignoredElements;

  const ignoredElements = [];
  const mocks = {};

  Vue.options.components = {};

  ignoreComponents(savedGlobalComponents, ignoredElements);
  if (mock) {
    mockComponents(savedGlobalComponents, mocks);
  }

  ignoreComponents(savedLocalComponents, ignoredElements);
  if (mock) {
    mockComponents(savedLocalComponents, mocks);
  }

  // Prevent recursive rendering
  if (Component.name !== undefined) {
    Array.push(ignoredElements, Component.name);
    Component.name = null;
  }

  Component.components = mocks;
  Vue.config.ignoredElements = ignoredElements;

  const testContainer = {
    components: {
      testcomponent: Component,
    },
    render(createElement) {
      return createElement('testcomponent', { props: propsData });
    },
  };

  const Ctor = Vue.extend(testContainer);
  const vm = new Ctor({ propsData }).$mount();

  vm.$children[0].getChildFromSelector = selector => getChildFromSelector(this, selector);

  Component.components = savedLocalComponents;
  Component.name = savedName;
  Vue.options.components = savedGlobalComponents;
  Vue.options.ignoredElements = savedIgnoredElements;

  return new VueWrapper(vm.$children[0]);
};

export { mount };

export const output = {
  of(component) {
    return component.$el.outerHTML;
  },
};

