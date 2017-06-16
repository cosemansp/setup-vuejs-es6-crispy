import { mount, shallow, mountConfig } from 'test/helper';
import Hello from './hello';

describe('Hello Component', () => {
  it('should have the data hook', () => {
    expect(typeof Hello.data).toBe('function');
  });

  it('should have a default "msg" set to "Welcome"', () => {
    const defaultData = Hello.data();
    expect(defaultData.msg).toMatch('Welcome');
  });

  it('should renders correctly', () => {
    // render component as a single unit
    const fixture = shallow(Hello);
    fixture.setData({ msg: 'Hello World' });
    expect(fixture).toMatchSnapshot();
  });

  it('should renders correctly with childs', () => {
    // render component with children
    const fixture = mount(Hello);
    expect(fixture).toMatchSnapshot();
  });

  it('should renders config', () => {
    const componentConfig = {
      template: `
        <div>
          <hello ref="component"></hello>
        </div>
      `,
      components: {
        Hello,
      },
    };
    const fixture = mountConfig(componentConfig);
    expect(fixture).toMatchSnapshot();
    expect(fixture.vm.$refs.component).toBeTruthy();
    expect(fixture.vm.$refs.component.msg).toMatch('Welcome');
  });
});

