import React from 'react';
import * as TestUtils from 'react-addons-test-utils';

import ExampleComponent from '../../src/components/ExampleComponent';

describe('ExampleComponent', () => {

  it('Should exist', () => {
    const component = TestUtils.renderIntoDocument(<ExampleComponent />);
    expect(component).to.exist;
  });

  it('Should handle clicks on its header', ()=> {
    let someValue = 'some value';
    const actionOne = () => someValue = 'some other value';

    const props = {
      someProp: 'someProp',
      actionOne: actionOne,
      data: 'data',
      asyncAction: () => ''
    }

    const component = TestUtils.renderIntoDocument(<ExampleComponent {...props} />);
    
    expect(component.props.someProp).to.equal('someProp');

    const header = TestUtils.findRenderedDOMComponentWithTag(component, 'header');
    TestUtils.Simulate.click(header);

    expect(someValue).to.equal('some other value');
  });

});


