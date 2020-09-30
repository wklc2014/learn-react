import React from 'react';
import { Route } from "react-router-dom";
import get from 'lodash/get';
import HMenu from '@components/hmenu/index.js';
import nestConfig from '@layouts/common/nest-config.js';

function NestRoutes(props) {

  const { location } = props;
  const prefix = get(props, 'match.path', '');

  return (
    <section>
        <HMenu
            configs={nestConfig}
            menuOpen={false}
            menuSelected={location.pathname}
            menuApi={{
                theme: 'light',
                mode: 'horizontal',
            }}
        />
        <div style={{ padding: 16 }}>
            <Route path={`${prefix}/a`} render={() => <h2>Page A</h2>} />
            <Route path={`${prefix}/b/1`} render={() => <h2>Page B-1</h2>} />
            <Route path={`${prefix}/b/2`} render={() => <h2>Page B-2</h2>} />
            <Route path={`${prefix}/c/1`} render={() => <h2>Page C-1</h2>} />
            <Route path={`${prefix}/c/2`} render={() => <h2>Page C-2</h2>} />
            <Route path={`${prefix}/d/1`} render={() => <h2>Page D-1</h2>} />
            <Route path={`${prefix}/d/2`} render={() => <h2>Page D-2</h2>} />
            <Route path={`${prefix}/d/3`} render={() => <h2>Page D-3</h2>} />
            <Route path={`${prefix}/e`} render={() => <h2>Page E</h2>} />
        </div>
    </section>
  )
}

export default NestRoutes;
