import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { styled } from '@mui/material';
import { ReactNode } from 'react';

interface LoadingButtonCustomIconProps extends Exclude<LoadingButtonProps, 'loadingIndicator'> {
  loadingIcon: ReactNode;
}

const Keyframes = styled('div')({
  '@keyframes spinner': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  animation: 'spinner 1.7s linear infinite',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function LoadingButtonCustomIcon(props: LoadingButtonCustomIconProps) {
  const { loadingIcon } = props;
  return (
    <LoadingButton {...props} loadingIndicator={<Keyframes>{loadingIcon}</Keyframes>}>
      {props.children}
    </LoadingButton>
  );
}
