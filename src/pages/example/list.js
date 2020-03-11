import React, { Component } from 'react';
import propTypes from 'prop-types';
import is from 'is_js';
import styles from './styles.less';

class List extends Component {

  static defaultProps = {
    list: [],
  }

  render() {
    const { list } = this.props;
    if (is.not.array(list)) return null;

    return (
      <ul style={{ minHeight: 200 }}>
        {list.map((v, i) => {
          return <li key={i}>{`${i + 1}. ${v.name}`}</li>
        })}
      </ul>
    )
  }

}

List.propTypes = {
  list: propTypes.array,
}

export default List;
