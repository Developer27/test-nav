import SvgIcon from "../Ui/SvgIcon";

const EllipsesIcon = ({ className, ...props }) => {
  return (
    <SvgIcon viewBox="0 0 16 16" className={className} {...props}>
      <path
        d="M8 6.39844C7.173 6.39844 6.5 7.07144 6.5 7.89844C6.5 8.72544 7.173 9.39844 8 9.39844C8.827 9.39844 9.5 8.72544 9.5 7.89844C9.5 7.07144 8.827 6.39844 8 6.39844Z"
        fill="currentColor"
      />
      <path
        d="M3 6.39844C2.173 6.39844 1.5 7.07144 1.5 7.89844C1.5 8.72544 2.173 9.39844 3 9.39844C3.827 9.39844 4.5 8.72544 4.5 7.89844C4.5 7.07144 3.827 6.39844 3 6.39844Z"
        fill="currentColor"
      />
      <path
        d="M13 6.39844C12.173 6.39844 11.5 7.07144 11.5 7.89844C11.5 8.72544 12.173 9.39844 13 9.39844C13.827 9.39844 14.5 8.72544 14.5 7.89844C14.5 7.07144 13.827 6.39844 13 6.39844Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default EllipsesIcon;
