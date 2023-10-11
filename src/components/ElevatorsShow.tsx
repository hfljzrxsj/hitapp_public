/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-magic-numbers */
import * as React from 'react';
import {
  enumActionName,
  useTypedSelector,
} from '@/store';
import { Paper } from '@mui/material';
import { type ReactElement } from 'react';
import styleModule from '@/style/ElevatorsShow.module.scss';
const direction = (dir?: string): "停止" | "向上" | "向下" => {
  switch (dir) {
    case 'up':
      return '向上';
    case 'down':
      return '向下';
    default:
      return '停止';
  }
};
export default function ElevatorsShow (): ReactElement {

  const { [enumActionName.Elevator]: elevator } = useTypedSelector(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    (state) =>
    ({
      [enumActionName.Elevator]: state[enumActionName.Elevator],
    })
  );
  return (<React.StrictMode>
    <div
      className={styleModule['EachelevatorsShow']}
    >
      {
        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
        ((elevators = {}): ReactElement => {
          const res = [];
          if (!Object.keys(elevators).length) {
            return <div>暂无电梯信息</div>;
          }
          for (const item in elevators) {
            if (Object.hasOwn(elevators, item)) {
              const elev = elevators[item];
              if (elev) {
                const { number } = elev,
                  loadFactor = ~~(number * 100 / 14);
                res.push(<div key={item}>
                  <Paper
                    elevation={3}
                    sx={{
                      backgroundColor: ((loadF): string => {
                        if (loadF > 80) {
                          return 'rgb(253, 237, 237)';
                        }
                        if (loadF > 60) {
                          return 'rgb(255, 244, 229)';
                        }
                        if (loadF > 40) {
                          return 'rgb(229, 246, 253)';
                        }
                        return 'rgb(237, 247, 237)';
                      })(loadFactor)

                    }}
                  >
                    <div>电梯编号：{item}</div>
                    <div>电梯状态：{elev.state === 'run' ? "运行" : "暂停"}</div>
                    <div>电梯方向：{direction(elev.direction)}</div>
                    <div>电梯当前楼层：{elev.floor}</div>
                    <div>电梯人数：{number}</div>
                    <div
                      style={{
                        color: ((loadF): string => {
                          if (loadF > 80) {
                            return 'rgb(95, 33, 32)';
                          }
                          if (loadF > 60) {
                            return 'rgb(102, 60, 0)';
                          }
                          if (loadF > 40) {
                            return 'rgb(1, 67, 97)';
                          }
                          return 'rgb(30, 70, 32)';
                        })(loadFactor), fontWeight: 'bolder'
                      }}
                    > 满载率：{`${loadFactor}%`}</div>
                  </Paper>
                </div>);
              }
            }
          }
          return <React.StrictMode>{res}</React.StrictMode>;
        })(elevator)
      }
    </div >
  </React.StrictMode >);
};