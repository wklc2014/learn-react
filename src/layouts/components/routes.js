import React, { Fragment } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from '@pages/home/index.js';
import Demo from '@pages/demo/index.js';
import NewsRoutes from '@layouts/components/news-routes.js';
import NestRoutes from '@layouts/components/nest-routes.js';

function LayoutRoute(props) {

  const { } = props;

  return (
    <section>
        <Route path="/" exact component={Home} />
        <Route path="/demo" component={Demo} />
        <Route path="/example/:id?" component={NewsRoutes} />
        <Route path="/nest" component={NestRoutes} />
    </section>
  )
}

export default LayoutRoute;
