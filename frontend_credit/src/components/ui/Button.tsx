import { forwardRef } from 'react';
import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { cn } from '@/lib/cn';

export type ButtonProps = MuiButtonProps;


const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'contained', ...props },
  ref,
) {
  return (
    <MuiButton
      ref={ref}
      variant={variant}
      className={cn('!normal-case !rounded-lg !font-medium', className)}
      {...props}
    />
  );
});

export default Button;
