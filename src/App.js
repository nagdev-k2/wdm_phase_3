import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import store, { persistor } from './State';
import Entry from './Entry';

const App = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="anonymous" />
      <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossOrigin="anonymous" />
      <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="anonymous" />
      <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
      <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
      <script src="https://unpkg.com/prop-types/prop-types.min.js"></script>
      <script src="https://unpkg.com/recharts/umd/Recharts.js"></script>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Entry />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;