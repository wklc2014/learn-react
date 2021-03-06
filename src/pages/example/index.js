import React, { Component } from 'react';
import get from 'lodash/get';
import propTypes from 'prop-types';
import styles from './index.less';

class Index extends Component {

  static defaultProps = {
  }

  render() {
    const pageId = get(this.props, 'match.params.id', null);

    return (
      <div>
        <h2>Example</h2>
        <p>
            {pageId ? pageId : 'not found url id'}
        </p>
      </div>
    )
  }

}

Index.propTypes = {
}

export default Index;
