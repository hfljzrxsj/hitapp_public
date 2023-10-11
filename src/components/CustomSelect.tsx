import * as React from 'react';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import {
  enumActionName,
  useTypedSelector
} from '@/store';
import { type ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import styleModule from '@/style/ElevatorsShow.module.scss';
interface Props {
  readonly title: string;
  readonly options: readonly string[];
}
export default function CustomSelect (props: Props): ReactElement {
  const { title, options } = props,
    dispatch = useDispatch(),
    { [enumActionName.SITE]: site } = useTypedSelector(
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      (state) =>
      ({
        [enumActionName.SITE]: state[enumActionName.SITE],
      })
    );
  // eslint-disable-next-line react/jsx-no-comment-textnodes
  return (<React.StrictMode><FormControl fullWidth>
    <InputLabel
      // eslint-disable-next-line react/forbid-component-props
      className={styleModule['InputLabel'] ?? ''}
    >{title}</InputLabel>
    <Select
      fullWidth
      // input={
      //   <OutlinedInput />
      // }
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      onChange={(event): void => {
        dispatch({ type: enumActionName.SITE, [enumActionName.SITE]: event.target.value });
        dispatch({ type: enumActionName.ElevatorClear });
      }}
      value={site}
    >{
        // eslint-disable-next-line no-magic-numbers, @typescript-eslint/no-magic-numbers
        options.map((option, index) => <MenuItem key={`option${index + 1}`} value={index} >{option}</MenuItem>)
      }
    </Select>
  </FormControl>
  </React.StrictMode>);
};