import SvgIcon from "../Ui/SvgIcon";

const DropDownArrowDownIcon = ({ className, ...props }) => {
  return (
    <SvgIcon viewBox="0 0 12 12" className={className} {...props}>
      <path
        d="M3 5.5L5.27875 7.77875C5.67709 8.17709 6.32291 8.17709 6.72125 7.77875L9 5.5"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default DropDownArrowDownIcon;
