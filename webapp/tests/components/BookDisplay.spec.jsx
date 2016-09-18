import React from 'react';
import * as TestUtils from 'react-addons-test-utils';

import BookDisplay from '../../src/components/BookDisplay';

describe('BookDisplay', () => {
  it('should exist', () => {
    const props = {
      book: {
        data: {
          text: "writing",
          seed: "1234"
        },
        error: null
      }
    };
    const component = TestUtils.renderIntoDocument(<BookDisplay {...props} />);
    expect(component).to.exist;
  });
});
