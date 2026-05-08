import SvgIcon from "../Ui/SvgIcon";

const DropDownArrowUpIcon = ({ className, ...props }) => {
  return (
    <SvgIcon viewBox="0 0 12 12" className={className} {...props}>
      <path
        d="M9 7.5L6.72125 5.22125C6.32291 4.82291 5.67709 4.82291 5.27875 5.22125L3 7.5"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default DropDownArrowUpIcon;
