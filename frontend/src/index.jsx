import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = process.env.REACT_APP_AUTH_DOMAIN;
const clientID = process.env.REACT_APP_AUTH_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH_AUDIENCE;

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientID}
    authorizationParams={{
      audience: audience,
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>,
);
