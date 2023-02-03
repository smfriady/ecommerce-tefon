const FormInput = ({ value, onChange, label, name, ...props }) => {
  return (
    <div className="flex flex-col mb-3">
      {label && (
        <label htmlFor={label} className="text-lg mb-1 text-gray-900 capitalize">
          {label}
        </label>
      )}
      <input
        type="text"
        className="bg-white focus:outline-none border w-full px-3 py-3 focus:border-black border-gray-400"
        autoComplete="off"
        value={value}
        name={name}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default FormInput;
