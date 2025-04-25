import { Stack } from 'react-bootstrap';
import React from 'react';
import { GxfsTextMode } from '../util/common-model';

interface GxfsTextProps {
  value?: string;
  label?: string;
  mode?: GxfsTextMode;
  className?: string;
}

interface ConfigItem {
  mode: GxfsTextMode;
  labelClass: string;
  valueClass: string;
}

const GxfsText = (props: GxfsTextProps) => {
  const mode = props.mode || GxfsTextMode.SMALL;
  const config = CONFIG_ITEMS.find((item) => item.mode === mode);
  return (
    <Stack className={`mb-1 ${props.className}`}>
      <div className={config?.labelClass}>{props.label}</div>
      <div className={config?.valueClass}>{props.value}</div>
    </Stack>
  );
};

export default GxfsText;

const CONFIG_ITEMS: ConfigItem[] = [
  {
    mode: GxfsTextMode.SMALL,
    labelClass: 'gxfs-font-dark-small-normal',
    valueClass: 'gxfs-font-light-grey-small-normal',
  },
  {
    mode: GxfsTextMode.BOLD_SMALL,
    labelClass: 'gxfs-font-dark-small-bold',
    valueClass: 'gxfs-font-dark-small-normal',
  },
  {
    mode: GxfsTextMode.FIELD_MIDSMALL,
    labelClass: 'gxfs-font-dark-midsmall-normal',
    valueClass: 'gxfs-font-dark-xxs-normal',
  },
  {
    mode: GxfsTextMode.FIELD_BOLD_MIDSMALL,
    labelClass: 'gxfs-font-dark-midsmall-bold',
    valueClass: 'gxfs-font-dark-xxs-normal',
  },
  { mode: GxfsTextMode.MEDIUM, labelClass: 'gxfs-font-dark-medium', valueClass: 'gxfs-font-dark-medium-normal' },
];
