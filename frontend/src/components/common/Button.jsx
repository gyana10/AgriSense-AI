function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
}) {
  const baseStyle =
    "rounded-xl px-6 py-3 font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700",

    secondary:
      "border border-green-600 text-green-700 hover:bg-green-50",

    outline:
      "border border-slate-300 text-slate-700 hover:bg-slate-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;