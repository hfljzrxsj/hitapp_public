/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as React from 'react';
import {
  type ElevatorReducerReadonlyType,
  type ElevatorReducerType,
  enumActionName,
  useTypedSelector,
} from '@/store';
import { type ReactElement, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// if (typeof obj !== 'object' || obj === null) {
//   return false;
// }
// for (const key in obj) {
//   if (!obj.hasOwnProperty(key)) {
//     continue;
//   }

//   const value = obj[key];
//   if (typeof value !== 'object' || value === null ||
//     typeof value.state !== 'string' || !['run', 'stop'].includes(value.state) ||
//     typeof value.floor !== 'number' ||
//     typeof value.number !== 'number') {
//     return false;
//   }

//   if (value.direction && !['down', 'stop', 'up'].includes(value.direction)) {
//     return false;
//   }
// }
const { random } = Math,
  getRandom = (isFirst: boolean): ElevatorReducerType => {
    const arr: ElevatorReducerType = {};
    for (let index = 1; index < 4; index += 1) {
      if (random() > 0.5 || isFirst) {
        arr[index] = {
          floor: ~~(random() * 10) + 1,
          number: ~~(random() * 14),
          state: random() > 0.5 ? "run" : "stop",
          ...(random() > 0.5 && { direction: random() > 0.5 ? "up" : "down" }),
        };
      }
    }
    return arr;
  };
export default function ElevatorEventSource (): ReactElement {
  let isFirst = true;
  const dispatch = useDispatch(),
    { [enumActionName.SITE]: site } = useTypedSelector(
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      (state) =>
      ({
        [enumActionName.SITE]: state[enumActionName.SITE],
      })
    ),
    isElevatorReducerType = (obj: unknown): obj is ElevatorReducerType => Boolean(obj);
  ;
  useEffect(() => {
    const modify = (data: ElevatorReducerReadonlyType): void => {
      dispatch({ type: enumActionName.Elevator, [enumActionName.Elevator]: data });
    },
      // eslint-disable-next-line sort-vars
      init = (): () => void => {
        const isSiteNotEmpty = site !== '';
        if (!isSiteNotEmpty) {
          return () => false;
        }
        // eslint-disable-next-line one-var
        const evsrc = new EventSource(`/api/ElevatorEventSource?site=${site}`,
          { 'withCredentials': false });
        // evsrc.onopen = function onopen (): void {
        //   console.log('start');
        // };
        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
        evsrc.onmessage = function onmessage (ev: MessageEvent<string>): void {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const data = JSON.parse(ev.data);
          if (!isElevatorReducerType(data)) {
            return;
          }
          modify(data);
        };
        evsrc.onerror = function onerror (): void {
          if (Boolean(isSiteNotEmpty) && Boolean(import.meta) && Boolean(import.meta.env) && import.meta.env.DEV) {
            modify(getRandom(isFirst));
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isFirst = false;
            setTimeout(() => init(), (~~(random() * 10) + 1) * 1e3);
            throw new Error("后端未连接，使用随机测试数据");
          }
          // throw new Error('error');
        };
        return (): void => {
          evsrc.close();
        };
      };
    return init();
  }, [dispatch, site]);
  return (<React.StrictMode />);
}