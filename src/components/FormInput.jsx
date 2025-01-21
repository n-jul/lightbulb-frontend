// FormInput.jsx
export const FormInput = ({
  label,
  name,
  type,
  value,
  onChange,
  icon,
  required = true
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
        required={required}
      />
    </div>
  </div>
);