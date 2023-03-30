export interface FormProps<T> {
  onSubmit: (value: T) => void;
  disabled?: boolean;
  loading?: boolean;
}
