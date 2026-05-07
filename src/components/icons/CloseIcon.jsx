import SvgIcon from "../Ui/SvgIcon";

const CloseIcon = ({ className, ...props }) => {
  return (
    <SvgIcon viewBox="0 0 16 16" className={className} {...props}>
      <path
        d="M11 5L5 11"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 5L11 11"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default CloseIcon;
