import TextToImageIcon from "../components/icons/TextToImageIcon";
import TextToVideoIcon from "../components/icons/TextToVideoIcon";
import ImageToImageIcon from "../components/icons/ImageToImageIcon";
import ImageToVideoIcon from "../components/icons/ImageToVideoIcon";
import AudioToVideoIcon from "../components/icons/AudioToVideoIcon";
import VideoToVideoIcon from "../components/icons/VideoToVideoIcon";
import ImageToAvatarIcon from "../components/icons/ImageToAvatarIcon";
import UpscaleIcon from "../components/icons/UpscaleIcon";

export const DEFAULT_NAV_ITEMS = [
  {
    Icon: TextToImageIcon,
    title: "Text to image",
  },
  {
    Icon: TextToVideoIcon,
    title: "Text to Video",
  },
  {
    Icon: ImageToImageIcon,
    title: "Image to Image",
  },
  {
    Icon: ImageToVideoIcon,
    title: "Image to Video",
  },
  {
    Icon: AudioToVideoIcon,
    title: "Audio to Video",
  },
  {
    Icon: VideoToVideoIcon,
    title: "Video to Video",
  },
  {
    Icon: ImageToAvatarIcon,
    title: "Image to Avatar",
  },
  {
    Icon: UpscaleIcon,
    title: "Upscale",
  },
];

export const TAB_MODES = [
  {
    id: "expanded",
    label: "Expanded",
    subtitle: "Display all creation modes with full labels",
  },
  {
    id: "priorityTabs",
    label: "Priority",
    subtitle: "Keep main modes visible. Group the rest under “More”.",
  },
  {
    id: "iconFirst",
    label: "Icon-first",
    subtitle: "Show compact icon tabs. Labels appear on hover",
  },
  {
    id: "collapsed",
    label: "Compact",
    subtitle: "Show essential tabs only. Collapse the rest under “More”",
  },
];
