const SvgIcon = ({ width, height, size, viewBox, children, ...props }) => {
  return (
    <svg
      width={size || width || 20}
      height={size || height || 20}
      viewBox={viewBox || "0 0 20 20"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};

export default SvgIcon;
