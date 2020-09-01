/**
 * Common `label-value` data structure
 */
export interface LabelValueI<V = number, L = string> {
  value: V;
  label: L;
}
