interface IForm {
  error?: string;
  errorMessage?: JSX.Element;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  fields: FormField[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  successButton: string;
  extra?: JSX.Element;
}

export default function Form({
  error,
  errorMessage,
  handleSubmit,
  fields,
  handleChange,
  extra,
}: IForm) {
  return (
    <div className="form">
      {error && errorMessage}
      <form onSubmit={handleSubmit} className="form-container">
        {fields.map(({ label, input }, i) => (
          <div key={`${i}`} className="form-field">
            {label && <label htmlFor={label.for}>{label.name}</label>}
            <input
              type={input.type}
              name={input.name}
              id={input.id ? input.id : ""}
              placeholder={input.placeholder ? input.placeholder : ""}
              required={input.required ? input.required : false}
              onChange={handleChange}
            />
          </div>
        ))}
        <button>Ingresar</button>
      </form>
      {extra && extra}
    </div>
  );
}

export type FormField = {
  label?: {
    name: string;
    for: string;
  };
  input: {
    type: React.HTMLInputTypeAttribute;
    name: string;
    id?: string;
    placeholder?: string;
    required?: boolean;
  };
};
