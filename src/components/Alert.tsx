type AlertProps = {
  message: string;
};

export function Alert({ message }: AlertProps) {
  return (
    <div
      className="bg-red-200 border border-red-600 text-red-700 px-3 py-1 
        rounded-lg mb-2 text-center"
    >
      <span className="sm:inline-block">{message}</span>
    </div>
  );
}
