type NamedColor =
  | 'aliceblue'
  | 'antiquewhite'
  | 'aqua'
  | 'aquamarine'
  | 'azure'
  | 'beige'
  | 'bisque'
  | 'black'
  | 'blanchedalmond'
  | 'blue'
  | 'blueviolet'
  | 'brown'
  | 'burlywood'
  | 'cadetblue'
  | 'chartreuse'
  | 'chocolate'
  | 'coral'
  | 'cornflowerblue'
  | 'cornsilk'
  | 'crimson'
  | 'cyan'
  | 'darkblue'
  | 'darkcyan'
  | 'darkgoldenrod'
  | 'darkgray'
  | 'darkgreen'
  | 'darkgrey'
  | 'darkkhaki'
  | 'darkmagenta'
  | 'darkolivegreen'
  | 'darkorange'
  | 'darkorchid'
  | 'darkred'
  | 'darksalmon'
  | 'darkseagreen'
  | 'darkslateblue'
  | 'darkslategray'
  | 'darkslategrey'
  | 'darkturquoise'
  | 'darkviolet'
  | 'deeppink'
  | 'deepskyblue'
  | 'dimgray'
  | 'dimgrey'
  | 'dodgerblue'
  | 'firebrick'
  | 'floralwhite'
  | 'forestgreen'
  | 'fuchsia'
  | 'gainsboro'
  | 'ghostwhite'
  | 'gold'
  | 'goldenrod'
  | 'gray'
  | 'green'
  | 'greenyellow'
  | 'grey'
  | 'honeydew'
  | 'hotpink'
  | 'indianred'
  | 'indigo'
  | 'ivory'
  | 'khaki'
  | 'lavender'
  | 'lavenderblush'
  | 'lawngreen'
  | 'lemonchiffon'
  | 'lightblue'
  | 'lightcoral'
  | 'lightcyan'
  | 'lightgoldenrodyellow'
  | 'lightgray'
  | 'lightgreen'
  | 'lightgrey'
  | 'lightpink'
  | 'lightsalmon'
  | 'lightseagreen'
  | 'lightskyblue'
  | 'lightslategray'
  | 'lightslategrey'
  | 'lightsteelblue'
  | 'lightyellow'
  | 'lime'
  | 'limegreen'
  | 'linen'
  | 'magenta'
  | 'maroon'
  | 'mediumaquamarine'
  | 'mediumblue'
  | 'mediumorchid'
  | 'mediumpurple'
  | 'mediumseagreen'
  | 'mediumslateblue'
  | 'mediumspringgreen'
  | 'mediumturquoise'
  | 'mediumvioletred'
  | 'midnightblue'
  | 'mintcream'
  | 'mistyrose'
  | 'moccasin'
  | 'navajowhite'
  | 'navy'
  | 'oldlace'
  | 'olive'
  | 'olivedrab'
  | 'orange'
  | 'orangered'
  | 'orchid'
  | 'palegoldenrod'
  | 'palegreen'
  | 'paleturquoise'
  | 'palevioletred'
  | 'papayawhip'
  | 'peachpuff'
  | 'peru'
  | 'pink'
  | 'plum'
  | 'powderblue'
  | 'purple'
  | 'rebeccapurple'
  | 'red'
  | 'rosybrown'
  | 'royalblue'
  | 'saddlebrown'
  | 'salmon'
  | 'sandybrown'
  | 'seagreen'
  | 'seashell'
  | 'sienna'
  | 'silver'
  | 'skyblue'
  | 'slateblue'
  | 'slategray'
  | 'slategrey'
  | 'snow'
  | 'springgreen'
  | 'steelblue'
  | 'tan'
  | 'teal'
  | 'thistle'
  | 'tomato'
  | 'transparent'
  | 'turquoise'
  | 'violet'
  | 'wheat'
  | 'white'
  | 'whitesmoke'
  | 'yellow'
  | 'yellowgreen'
  | (string & {});

type requestFrameEasing =
  | 'linear'
  | 'easeInSine'
  | 'easeOutSine'
  | 'easeInOutSine'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeInExpo'
  | 'easeOutExpo'
  | 'easeInOutExpo'
  | 'easeInCirc'
  | 'easeOutCirc'
  | 'easeInOutCirc'
  | 'easeInBack'
  | 'easeOutBack'
  | 'easeInOutBack'
  | 'easeInElastic'
  | 'easeOutElastic'
  | 'easeInOutElastic'
  | 'easeInBounce'
  | 'easeOutBounce'
  | 'easeInOutBounce';

interface standardOptions {
  /**
   * - chrink the page width to fit the drawer when it's open (co-planar with page content).
   * - **Default Value** `false`
   */
  changePageWidth?: boolean;

  /**
   * - Prevent the page from scrolling when the drawer is open.
   * - **Default Value** `false`
   */
  preventPageScrolling?: boolean;
}
interface modalOptions {
  /**
   * - Prevent the page from scrolling when the drawer is open.
   * - **Default Value** `false`
   */
  preventPageScrolling?: boolean;
}

interface DrawerProps {
  /**
   * - Position the drawer on the left or on the right side of the Html page.
   * - **Default Value** `left`
   */
  direction?: 'left' | 'right';

  /**
   * - The initial status of the drawer.
   * - **Default Value** `closed`
   */
  defaultStatus?: 'closed' | 'open';

  /**
   * - modal : show the drawer over the page (deosn't effect the page layout).
   * - standard : show the drawer beside the page (effects the page layout).
   * - **Default Value** `modal`
   */
  type?: 'modal' | 'standard';

  /**
   * - Standard type drawer behaviour options.
   */
  standardOptions?: standardOptions;

  /**
   * - Standard type drawer behaviour options.
   */
  modalOptions?: modalOptions;

  /**
   * - The drawer width when it's open.
   * - **Default Value** `300`
   */
  width?: number;

  /**
   * - The drawer handle width, the handle is unvisible element that receive swipe gesture input when the drawer is close.
   * - **Default Value** `20`
   */
  handleWidth?: number;

  /**
   * - The drawer handle background color, use only for debuging.
   * - **Default Value** `initial`
   */
  handleBackgroundColor?: NamedColor;

  /**
   * - The drawer open and close animation duration.
   * - **Default Value** `200`
   */
  duration?: number;

  /**
   * - Drawer open and close animation transition timing function.
   *
   * - Check [easings.net](https://easings.net/) to learn more.
   *
   * - **Default Value** `easeOutQuart`
   */
  ease?: requestFrameEasing | ((x: number) => number);

  /**
   * - Enable open and close drawer with mouse swipe gestures.
   * - **Default Value** `false`
   */
  enableMouseGestures?: boolean;

  /**
   * - Enable open and close drawer with touch swipe gestures.
   * - **Default Value** `false`
   */
  enableTouchGestures?: boolean;

  /**
   * - The background color of drawer shading layer.
   * - **Default Value** 'rgba(0,0,0,0.5)`
   */
  backgroundColor?: NamedColor;

  /**
   * - The drawer container style.
   * - You can also use `id` or `className` attributes to add style from CSS StyleSheet.
   */
  drawerStyle?: React.CSSProperties;

  /**
   * - A callback fired when the drawer opens.
   */
  onOpen?: () => void;

  /**
   * - A callback fired when the drawer closes.
   */
  onClose?: () => void;

  /**
   * - A callback fired everytime the drawer moves.
   * - Takes the `percent` argument `(0-1)` that indicates the open percentage of the drawer.
   */
  onMove?: (percent?: number) => void;

  /**
   * - Drawer wrapper element z-index css value.
   * - **Default Value** `100`
   */
  zIndex?: number;

  /**
   * - Drawer Methods
   */
  ref?: React.LegacyRef<DrawerMethods>;

  className?: string | undefined;

  id?: string | undefined;
}
interface DrawerMethods {
  /**
   * - Open the drawer.
   */
  open?: () => void;

  /**
   * - Close the drawer.
   */
  close?: () => void;

  /**
   * - Toggle the drawer.
   */
  toggle?: () => void;
}

declare const Drawer: React.FunctionComponent<DrawerProps>;

export default Drawer;
