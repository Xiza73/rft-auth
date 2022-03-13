type AlertProps = {
  message: string;
};

export function Alert({ message }: AlertProps) {
  return (
    <div
      className="alert"
    >
      <span className="sm:inline-block">{message}</span>
    </div>
  );
}
