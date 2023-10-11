import * as React from 'react';
import CustomSelect from '@/components/CustomSelect';
import ElevatorsShow from '@/components/ElevatorsShow';
import { type ReactElement, useEffect } from 'react';
import ElevatorEventSource from '@/actions/ElevatorEventSource';
export default function Elevator (): ReactElement {
  // useEffect(() => {
  //   ElevatorEventSource();
  // }, []);
  const options = Object.freeze([
    {
      label: '主楼',
      elevators: [[1, 2], [3, 4]]
    }, {
      label: '图书馆',
      elevators: [[1, 2], [3]]
    }
  ]);
  return (
    <React.StrictMode
    >
      <div>
        <CustomSelect
          // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
          options={options.map((option) => option.label)}
          title="请选择地点"
        />
        <ElevatorsShow />
      </div>
      <ElevatorEventSource />
    </React.StrictMode>
  );
}