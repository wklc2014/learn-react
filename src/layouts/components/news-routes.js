import React from 'react';
import { Route, Link } from "react-router-dom";
import HMenu from '@components/hmenu/index.js';
import Example from '@pages/example/index.js';
import styles from '@layouts/index.less';

function NewsRoutes(props) {

  const { } = props;

  return (
    <section>
        <ul className={`${styles.nav} clearfix`}>
            <li>
                <Link to={'/example/101'}>Example 101</Link>
            </li>
            <li>
                <Link to={'/example/102'}>Example 102</Link>
            </li>
            <li>
                <Link to={'/example/103'}>Example 103</Link>
            </li>
            <li>
                <Link to={'/nest/b'}>Example b</Link>
            </li>
        </ul>
        <Route path="/example/:id?" component={Example} />
    </section>
  )
}

export default NewsRoutes;
