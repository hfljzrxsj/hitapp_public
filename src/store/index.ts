// store.ts
import type {
  RRN_,
  // RRNReactElementGenericity,
  // RRNboolean,
  RRNnumber,
  RRNstring
  // anyReactElementGenericity
} from '@/types';
import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';

// eslint-disable-next-line no-shadow
export enum enumActionName {
  SITE = 'SITE',
  Elevator = 'Elevator',
  ElevatorClear = 'ElevatorClear',
}
type addAction<T> = T & {
  readonly type: RRN_<enumActionName>;
};
type SiteReducerType = RRNstring;
interface SiteState {
  readonly [enumActionName.SITE]: SiteReducerType;
}
export interface ElevatorValueReducerType {
  // readonly id: number;
  readonly state: 'run' | 'stop';
  readonly direction?: 'down' | 'stop' | 'up';
  readonly floor: RRNnumber;
  readonly number: RRNnumber;
}
export type ElevatorReducerType = Required<NonNullable<Record<number, ElevatorValueReducerType>>>;
export type ElevatorReducerReadonlyType = RRN_<Record<RRNnumber, ElevatorValueReducerType>>;
interface ElevatorState {
  readonly [enumActionName.Elevator]: ElevatorReducerType;
}
const initialElevatorState: ElevatorReducerType = {},
  initialSiteState: SiteReducerType = '',
  // eslint-disable-next-line @typescript-eslint/default-param-last, default-param-last, sort-vars
  SiteReducer = (state = initialSiteState, action: addAction<SiteState>): SiteReducerType => {
    switch (action.type) {
      case enumActionName.SITE: {
        return action[enumActionName.SITE];
      }
      default:
        return state;
    }
  },
  // eslint-disable-next-line @typescript-eslint/default-param-last, default-param-last, sort-vars, @typescript-eslint/prefer-readonly-parameter-types
  ElevatorReducer = (state = initialElevatorState, action: addAction<ElevatorState>): ElevatorReducerType => {
    switch (action.type) {
      case enumActionName.Elevator: {
        return {
          ...state,
          ...action[enumActionName.Elevator]
        };
      }
      case enumActionName.ElevatorClear: {
        return initialElevatorState;
      }
      default:
        return state;
    }
  },
  reducer = combineReducers({
    [enumActionName.SITE]: SiteReducer,
    [enumActionName.Elevator]: ElevatorReducer
  });

export default createStore(reducer, applyMiddleware(thunk));
export type RRNState = RRN_<ElevatorState & SiteState>;
// eslint-disable-next-line one-var
export const useTypedSelector: TypedUseSelectorHook<RRNState> = useSelector;
