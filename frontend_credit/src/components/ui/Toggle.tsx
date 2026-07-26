'use client';

import { useState, type ReactNode } from 'react';

export interface ToggleRenderProps {
  isOn: boolean;
  toggle: () => void;
  setOn: (value: boolean) => void;
}

interface ToggleProps {
  initial?: boolean;
  children: (state: ToggleRenderProps) => ReactNode;
}


export default function Toggle({ initial = false, children }: ToggleProps) {
  const [isOn, setOn] = useState(initial);
  const toggle = () => setOn((value) => !value);

  return <>{children({ isOn, toggle, setOn })}</>;
}
