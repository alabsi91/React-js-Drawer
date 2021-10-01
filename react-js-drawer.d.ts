
type NamedColor =
    | "aliceblue"
    | "antiquewhite"
    | "aqua"
    | "aquamarine"
    | "azure"
    | "beige"
    | "bisque"
    | "black"
    | "blanchedalmond"
    | "blue"
    | "blueviolet"
    | "brown"
    | "burlywood"
    | "cadetblue"
    | "chartreuse"
    | "chocolate"
    | "coral"
    | "cornflowerblue"
    | "cornsilk"
    | "crimson"
    | "cyan"
    | "darkblue"
    | "darkcyan"
    | "darkgoldenrod"
    | "darkgray"
    | "darkgreen"
    | "darkgrey"
    | "darkkhaki"
    | "darkmagenta"
    | "darkolivegreen"
    | "darkorange"
    | "darkorchid"
    | "darkred"
    | "darksalmon"
    | "darkseagreen"
    | "darkslateblue"
    | "darkslategray"
    | "darkslategrey"
    | "darkturquoise"
    | "darkviolet"
    | "deeppink"
    | "deepskyblue"
    | "dimgray"
    | "dimgrey"
    | "dodgerblue"
    | "firebrick"
    | "floralwhite"
    | "forestgreen"
    | "fuchsia"
    | "gainsboro"
    | "ghostwhite"
    | "gold"
    | "goldenrod"
    | "gray"
    | "green"
    | "greenyellow"
    | "grey"
    | "honeydew"
    | "hotpink"
    | "indianred"
    | "indigo"
    | "ivory"
    | "khaki"
    | "lavender"
    | "lavenderblush"
    | "lawngreen"
    | "lemonchiffon"
    | "lightblue"
    | "lightcoral"
    | "lightcyan"
    | "lightgoldenrodyellow"
    | "lightgray"
    | "lightgreen"
    | "lightgrey"
    | "lightpink"
    | "lightsalmon"
    | "lightseagreen"
    | "lightskyblue"
    | "lightslategray"
    | "lightslategrey"
    | "lightsteelblue"
    | "lightyellow"
    | "lime"
    | "limegreen"
    | "linen"
    | "magenta"
    | "maroon"
    | "mediumaquamarine"
    | "mediumblue"
    | "mediumorchid"
    | "mediumpurple"
    | "mediumseagreen"
    | "mediumslateblue"
    | "mediumspringgreen"
    | "mediumturquoise"
    | "mediumvioletred"
    | "midnightblue"
    | "mintcream"
    | "mistyrose"
    | "moccasin"
    | "navajowhite"
    | "navy"
    | "oldlace"
    | "olive"
    | "olivedrab"
    | "orange"
    | "orangered"
    | "orchid"
    | "palegoldenrod"
    | "palegreen"
    | "paleturquoise"
    | "palevioletred"
    | "papayawhip"
    | "peachpuff"
    | "peru"
    | "pink"
    | "plum"
    | "powderblue"
    | "purple"
    | "rebeccapurple"
    | "red"
    | "rosybrown"
    | "royalblue"
    | "saddlebrown"
    | "salmon"
    | "sandybrown"
    | "seagreen"
    | "seashell"
    | "sienna"
    | "silver"
    | "skyblue"
    | "slateblue"
    | "slategray"
    | "slategrey"
    | "snow"
    | "springgreen"
    | "steelblue"
    | "tan"
    | "teal"
    | "thistle"
    | "tomato"
    | "transparent"
    | "turquoise"
    | "violet"
    | "wheat"
    | "white"
    | "whitesmoke"
    | "yellow"
    | "yellowgreen";

export interface DrawerProps {

    /**
     * - Position the drawer on the left or on the right side of the Html page.
     * - **Default Value** 'left'
     */
    direction?: 'left' | 'right';

    /**
     * - The initial status of the drawer.
     * - **Default Value** 'closed'
     */
    defaultStatus?: 'closed' | 'open';

    /**
     * - The drawer width when it's open.
     * - **Default Value** 300
     */
    width?: number;

    /** 
     * - The drawer handle width, the handle is unvisible element that receive swipe gesture input when the drawer is close.
     * - **Default Value** 10
     */
    handleWidth?: number;

    /** 
     * - The drawer handle background color, use only for debuging.
     * - **Default Value** 'initial'
     */
    handleBackgroundColor?: NamedColor;

    /** 
     * - The drawer open and close animation duration.
     * - **Default Value** 200
     */
    duration?: number;

    /** 
     * - Drawer open and close animation transition timing function.
     * - **Default Value** 'ease-out'
     */
    ease?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'cubic-bezier(0, 0, 0, 0)';

    /** 
     * - Enable open and close drawer with mouse swipe gestures.
     * - **Default Value** true     
     */
    enableMouseGestures?: boolean;

    /** 
     * - Enable open and close drawer with touch swipe gestures.
     * - **Default Value** true
     */
    enableTouchGestures?: boolean;

    /** 
     * - The background color of drawer shading layer.
     * - **Default Value** 'rgba(0,0,0,0.5)'
     */
    backgroundColor?: NamedColor;

    /** 
     * - The drawer container style.
     */
    drawerStyle?: React.CSSProperties;

    /** 
     * - A callback fired when the drawer opens.
     */
    onOpen?: Function;

    /** 
     * - A callback fired when the drawer closes.
     */
    onClose?: Function;
}

declare const Drawer: React.FunctionComponent<DrawerProps>

export default Drawer