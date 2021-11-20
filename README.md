# react-js-drawer

- Add native feeling to your web app and PWA by replicating Android/IOS native drawer.
- Swipe from the screen edge to open the drawer.
- Detect swipe momentum to open/close the drawer.
- Swipe gestures are available for touch and mouse input.

![](https://github.com/alabsi91/react-js-drawer/blob/de95105e9b9496c8d2aea9589f619b3e2401b0a4/black-Drawer.gif?raw=true)

# Drawer type standard

- Drawer type standard appears beside the page (co-planar with page content).
- Effects the page layout.
- When [`changePageWidth`](#standardoptions--object-optional) is enabled the drawer shares the body width with the page (the page shrinks when drawer opens).

![](https://github.com/alabsi91/react-js-drawer/blob/readme/drawertypestandardwidthenabled.png?raw=true)

- When [`changePageWidth`](#standardoptions--object-optional) is disabled the drawer will push page content and add it's width to the body causing scrollbar to appear.

![](https://github.com/alabsi91/react-js-drawer/blob/readme/drawertypestandardwidthdisabled.png?raw=true)

# Drawer type modal

- Drawer type `modal` appears on the top off the page.
- deosn't effect the page layout.

![](https://github.com/alabsi91/react-js-drawer/blob/readme/drawermodal.png?raw=true)

## Installation

`npm install react-js-drawer`

## How to use

- Make sure to put the drawer on the top of your main page.
- The drawer should have one sibling element (the page) for stability reasons.

```jsx
// ...
import Drawer from 'react-js-drawer';

export default function App() {
  let drawerMethods = null;

  const openDrawerHandle = () => {
    drawerMethods.open();
  };

  return (
    <>
      <Drawer ref={node => (drawerMethods = node)}>{/* ... drawer content */}</Drawer>
      // wrap the page contents with container
      <div>
        // ... page contents
        <button onClick={openDrawerHandle}>Open Drawer</button>
      </div>
    </>
  );
}
```

## Props

### type : _[ 'modal' | 'standard' ] [optional]_

- `modal` : the drawer appears on top of the page (deosn't effect the page layout).
- `standard` : the drawer appears beside the page (effects the page layout).
- **Default Value** `modal`

### standardOptions : _[Object] [optional]_

- Options for drawer type `standard` .

|         Option         | Description                                                                           | Default |
| :--------------------: | ------------------------------------------------------------------------------------- | :-----: |
|   `changePageWidth`    | chrink the page width to fit the drawer when it's open (co-planar with page content). | `false` |
| `preventPageScrolling` | Prevent the page from scrolling when the drawer is open.                              | `false` |

### modalOptions : _[Object] [optional]_

- Options for drawer type `modal` .

|         Option         | Description                                              | Default |
| :--------------------: | -------------------------------------------------------- | :-----: |
| `preventPageScrolling` | Prevent the page from scrolling when the drawer is open. | `false` |

### direction : _[ 'left' | 'right' ] [optional]_

- Position the drawer on the left or on the right side of the Html page.
- **Default Value** `left`

### defaultStatus : _[ 'closed' | 'open' ] [optional]_

- The initial status of the drawer.
- **Default Value** `closed`

### width : _[Number] [optional]_

- The drawer width when it's open.
- **Default Value** `300`

### handleWidth : _[Number] [optional]_

- The drawer handle width, the handle is unvisible element that receive swipe gesture input.
- **Default Value** `20`

![](https://github.com/alabsi91/react-js-drawer/blob/readme/drawerclosed.png?raw=true)

### handleBackgroundColor : _[String] [optional]_

- The drawer handle background color, use only for debuging.
- **Default Value** `initial`

### duration : _[Number] [optional]_

- Drawer open and close animation duration.
- **Default Value** `200`

### ease : _[ String | Function ] [optional]_

- Drawer open and close animation transition timing function.
- Check [easings.net](https://easings.net/) to learn more.
- **Default Value** `easeOutQuart`
- If you want to provide your own timing-function make sure that the function takes one parameter and returns one value.

```javascript
function easeInQuad(x) {
  return x * x;
}
```

### enableMouseGestures : _[Boolean] [optional]_

- Enable open and close drawer with mouse swipe gestures.
- **Default Value** `false`

### enableTouchGestures : _[Boolean] [optional]_

- Enable open and close drawer with touch swipe gestures.
- **Default Value** `true`

### backgroundColor : _[Srting] [optional]_

- The background color of drawer shading layer.
- **Default Value** `rgba(0,0,0,0.5)`

### drawerStyle : _[Object] [optional]_

- The drawer container style (React inline style object).
- You can also use `id` or `className` attributes to add style from CSS StyleSheet.

### onOpen : _[Callback] [optional]_

- A callback fired when the drawer opens.

### onClose : _[Callback] [optional]_

- A callback fired when the drawer closes.
### onMove : _[ (percent: Number) => void ] [optional]_

- A callback fired everytime the drawer moves.
- Takes the `percent` argument `(0-1)` that indicates the open percentage of the drawer.

### zIndex : _[Number] [optional]_

- Drawer wrapper element z-index css value.
- **Default Value** `100`

## Methods

- `open()`

- `close()`

- `toggle()`

#
