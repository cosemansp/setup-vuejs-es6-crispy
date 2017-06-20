/* @flow */

describe('sample test', () => {
  it('should work', () => {
    expect(true).toEqual(true);
  });

  it('has document', () => {
    const div = document.createElement('div');
    expect(div.nodeName).toEqual('DIV');
  });
});

