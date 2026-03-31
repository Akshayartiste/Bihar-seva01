"use client"

export function Input({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`input ${className}`}
      {...props}
    />
  )
}
