// Modules
import { MouseEvent, KeyboardEvent, ChangeEvent } from 'react';

/**
 * Mouse event handler type
 */
export type MouseEventHandlerT = (e: MouseEvent<HTMLElement>) => void;

/**
 * Keyboard event handler type
 */
export type KeyboardEventHandlerT = (e: KeyboardEvent<HTMLElement>) => void;

/**
 * Input change event handler type
 */
export type InputChangeEventHandlerT = (e: ChangeEvent<HTMLInputElement>) => void;

/**
 * Select change event handler type
 */
export type SelectChangeEventHandlerT = (e: ChangeEvent<HTMLSelectElement>) => void;
