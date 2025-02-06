export default (function InputTextSecondry({
  type = "text",
  className = "",
  ...props
}) {
  return (
    <input
      {...props}
      type={type}
      className="rounded-md border-gray-400 border-[2px]"
    />
  );
});
