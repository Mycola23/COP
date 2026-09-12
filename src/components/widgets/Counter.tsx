import { useState, type ReactNode } from 'react';

interface CounterProps {
  label: string;
  initial: number;
  min: number;
  max: number;
  step?: number;
  children?: (value: number) => ReactNode;
}

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export const Counter = ({ label, initial, min, max, step = 1, children }: CounterProps) => {
  const [value, setValue] = useState(initial);

  const shift = (delta: number) => setValue(current => clamp(current + delta, min, max));
  const reset = () => setValue(initial);

  return (
    <div className="counter">
      <span className="counter__label">{label}</span>
      <div className="counter__controls">
        <button type="button" className="counter__btn" onClick={() => shift(-step)} disabled={value <= min}>
          −
        </button>
        <output className="counter__value">{value}</output>
        <button type="button" className="counter__btn" onClick={() => shift(step)} disabled={value >= max}>
          +
        </button>
        <button type="button" className="counter__btn counter__btn--ghost" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="counter__progress" aria-hidden="true">
        <div className="counter__progress-fill" style={{ width: `${((value - min) / (max - min)) * 100}%` }} />
      </div>
      {children ? <div className="counter__preview">{children(value)}</div> : null}
    </div>
  );
};
