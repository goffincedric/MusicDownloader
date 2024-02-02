import { FC, PropsWithChildren } from 'react';

interface ConditionalWrapperProps<T> {
  condition: () => boolean;
  wrapper: FC<T>;
  wrapperProps: PropsWithChildren<T>;
}

export function ConditionalWrapper<T>({
  condition,
  wrapper,
  wrapperProps,
  children,
}: ConditionalWrapperProps<T> & PropsWithChildren<any>): JSX.Element {
  const Wrapper = wrapper;
  return condition() ? <Wrapper {...wrapperProps}>{children}</Wrapper> : children;
}
