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
    label: "Expanded Tabs",
  },
  {
    id: "iconFirst",
    label: "Icon-first Tabs",
  },
  {
    id: "priorityTabs",
    label: "Priority Tabs",
  },
  {
    id: "collapsed",
    label: "Collapsed Tabs",
  },
];
