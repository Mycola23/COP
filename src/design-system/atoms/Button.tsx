import type { ButtonProps } from '@/types';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '@/constants';

export const Button = ({
  variant = 'control',
  size = 'md',
  isActive = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const variantClass = BUTTON_VARIANTS[variant] || '';
  const sizeClass = BUTTON_SIZES[size] || '';
  const activeClass = isActive ? 'is-active' : '';

  return (
    <button
      className={`${variantClass} ${sizeClass} ${activeClass} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="ds-btn__icon" aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
};