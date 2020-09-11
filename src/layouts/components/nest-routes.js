import React from 'react';
import { Route } from "react-router-dom";
import get from 'lodash/get';
import HMenu from '@components/hmenu/index.js';
import navConfig from '@layouts/common/nest-config.js';

function NestRoutes(props) {

  const { } = props;
  const prefix = get(props, 'match.path', '');

  return (
    <section>
        {/*<HMenu
            configs={navConfig}
            menuApi={{
                theme: 'light',
                mode: 'horizontal',
            }}
        />*/}
        <Route path={`${prefix}/a`} render={() => <h2>Page A</h2>} />
        <Route path={`${prefix}/b`} render={() => <h2>Page B</h2>} />
        <Route path={`${prefix}/c`} render={() => <h2>Page C</h2>} />
        <Route exact path={`${prefix}/d`} render={() => <h2>Page D</h2>} />
        <Route path={`${prefix}/d/d-1`} render={() => <h2>Page D-1</h2>} />
        <Route path={`${prefix}/d/d-2`} render={() => <h2>Page D-2</h2>} />
        <Route path={`${prefix}/e`} render={() => <h2>Page E</h2>} />
    </section>
  )
}

export default NestRoutes;
