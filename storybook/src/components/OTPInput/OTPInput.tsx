import { useRef, useState, KeyboardEvent, ClipboardEvent, ChangeEvent } from 'react';
import styles from './OTPInput.module.css';

export interface OTPInputProps {
  /** Number of digit cells (default: 6) */
  length?: number;
  /** Called whenever the value changes, receives the current string */
  onChange?: (value: string) => void;
  /** Called when all cells are filled */
  onComplete?: (value: string) => void;
  /** Marks all cells with error styling */
  error?: boolean;
  /** Marks all cells with success styling */
  success?: boolean;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({
  length = 6,
  onChange,
  onComplete,
  error = false,
  success = false,
  disabled = false,
  className,
}: OTPInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function focusCell(index: number) {
    refs.current[index]?.focus();
  }

  function updateValues(next: string[]) {
    setValues(next);
    const joined = next.join('');
    onChange?.(joined);
    if (joined.length === length) onComplete?.(joined);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const raw = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...values];
    next[index] = raw;
    updateValues(next);
    if (raw && index < length - 1) focusCell(index + 1);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Backspace') {
      if (values[index]) {
        const next = [...values];
        next[index] = '';
        updateValues(next);
      } else if (index > 0) {
        focusCell(index - 1);
        const next = [...values];
        next[index - 1] = '';
        updateValues(next);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusCell(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      focusCell(index + 1);
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>, index: number) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length - index);
    if (!pasted) return;
    const next = [...values];
    for (let i = 0; i < pasted.length; i++) {
      next[index + i] = pasted[i];
    }
    updateValues(next);
    const lastFilled = Math.min(index + pasted.length, length - 1);
    focusCell(lastFilled);
  }

  const cellState = error ? styles.error : success ? styles.success : '';

  return (
    <div className={[styles.otpRoot, className ?? ''].filter(Boolean).join(' ')}>
      {values.map((val, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el; }}
          className={[styles.otpCell, cellState, val ? styles.filled : ''].filter(Boolean).join(' ')}
          type="text"
          inputMode="numeric"
          maxLength={2}
          value={val}
          placeholder="·"
          disabled={disabled}
          aria-label={`Dígito ${i + 1} de ${length}`}
          onChange={e => handleChange(e, i)}
          onKeyDown={e => handleKeyDown(e, i)}
          onPaste={e => handlePaste(e, i)}
          onFocus={e => e.target.select()}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}
