import * as React from 'react';
import Elevator from './pages/Elevator';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import store from '@/store';
import styleModule from './APP.module.scss';
export default function APP (): React.ReactElement {
  return (
    <StrictMode>
      <div className={styleModule['APP']}>
        <Provider store={store}>
          <Elevator />
        </Provider>
      </div>
    </StrictMode>);

}
