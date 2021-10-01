# React-js Drawer

- Add native feeling to your web app and PWA by replicating Android native drawer.
- Swipe from the screen edge to open the drawer.
- Detect swipe momentum to open/close the drawer.
- Swipe gesture avilable for touch and mouse input.

## How to use

- Make sure to put the drawer on the top of your main page.

```

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

            // ... page content
            
            <button onClick={openDrawerHandle}>Open Drawer</button>
        
        </>
    );
}
```

## Props

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
