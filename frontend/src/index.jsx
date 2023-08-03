import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-simrw8xejcxeakm8.us.auth0.com"
    clientId="NO4hQCa82c9ciWYmXeZWYzj6kgbWHYaJ"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />;
  </Auth0Provider>,
);
