# react-js-drawer

- Add native feeling to your web app and PWA by replicating Android native drawer.
- Swipe from the screen edge to open the drawer.
- Detect swipe momentum to open/close the drawer.
- Swipe gesture avilable for touch and mouse input.

![](https://github.com/alabsi91/React-js-Drawer/blob/readme/UniConverter_20211001151937.gif?raw=true)

# Drawer type standard

- When `changePageWidth = true` the drawer shares the body width with the page (the page shrinks when drawer opens).

![](https://github.com/alabsi91/react-js-drawer/blob/readme/drawertypestandardwidthenabled.png)

- When `changePageWidth = false` the drawer will add it's width to the body and scrollbar will appear.

![](https://github.com/alabsi91/react-js-drawer/blob/readme/drawertypestandardwidthdisabled.png)

# Drawer type modal

- The Drawer will appear on the top off the page.

![](https://github.com/alabsi91/react-js-drawer/blob/readme/drawermodal.png)

## Installation

`npm install react-js-drawer`

## How to use

- Make sure to put the drawer on the top of your main page.
- The drawer should have one sibling element for stability.

```javascript
import Drawer from 'react-js-drawer';

export default function Index() {

    let drawerMethods = null;

    const openDrawerHandle = () => {
        drawerMethods.open();
    };

    return (
        <>
            <Drawer ref={node => (drawerMethods = node)}>

                // ... drawer content

            </Drawer>

            <div>  // wrap the page contents with container

                // ... page contents
                <button onClick={openDrawerHandle}>Open Drawer</button>

            </div>
        </>
    );
};
```

## Props

### type : _['modal' | 'standard'] [optional]_

- modal : show the drawer on top of the page (deosn't effect the page layout).
- standard : show the drawer beside the page (effects the page layout).
- **Default Value** 'modal'

### standardOptions : _[Object] [optional]_

- Options for drawer type `standard` .
- `changePageWidth?: boolean` chrink the page width to fit the drawer when it's open (co-planar with page content). (default :
  false)
- `preventPageScrolling?: boolean` Prevent the page from scrolling when the drawer is open. (default : true)

### modalOptions : _[Object] [optional]_

- Options for drawer type `modal` .
- `preventPageScrolling?: boolean` Prevent the page from scrolling when the drawer is open. (default : true)

### direction : _['left' | 'right'] [optional]_

- Position the drawer on the left or on the right side of the Html page.
- **Default Value** 'left'

### defaultStatus : _['closed' | 'open'] [optional]_

- The initial status of the drawer.
- **Default Value** 'closed'

### width : _[Number] [optional]_

- The drawer width when it's open.
- **Default Value** 300

### handleWidth : _[Number] [optional]_

- The drawer handle width, the handle is unvisible element that receive swipe gesture input when the drawer is close.
- **Default Value** 10
- ![](https://github.com/alabsi91/react-js-drawer/blob/readme/drawerclosed.png)

### handleBackgroundColor : _[String] [optional]_

- The drawer handle background color, use only for debuging.
- **Default Value** 'initial'

### duration : _[Number] [optional]_

- The drawer open and close animation duration.
- **Default Value** 200

### ease : _[String] [optional]_

- Drawer open and close animation transition timing function (CSS Value).
- **Default Value** 'ease-out'

### enableMouseGestures : _[Boolean] [optional]_

- Enable open and close drawer with mouse swipe gestures.
- **Default Value** true

### enableTouchGestures : _[Boolean] [optional]_

- Enable open and close drawer with touch swipe gestures.
- **Default Value** true

### backgroundColor : _[Srting] [optional]_

- The background color of drawer shading layer.
- **Default Value** 'rgba(0,0,0,0.5)'

### drawerStyle : _[Object] [optional]_

- The drawer container style (React inline style object).

### onOpen : _[Callback] [optional]_

- A callback fired when the drawer opens.

### onClose : _[Callback] [optional]_

- A callback fired when the drawer closes.

## Methods

- `open()`

- `close()`

- `toggle()`

#
