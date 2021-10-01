import './react-js-drawer.css';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

let x, y, t, isSwipe;

document.body.style.overscrollBehaviorX = 'none';
document.body.style.margin = '0px';

const Drawer = forwardRef((props, ref) => {
  const direction = props.direction || 'left';
  const default_Status = props.defaultStatus || 'closed';
  const handle_width = props.handleWidth ?? 10;
  const handle_background_color = props.handleBackgroundColor || 'initial';
  const width = (props.width ?? 300) + handle_width;
  const duration = props.duration ?? 200;
  const ease = props.ease || 'ease-out';
  const enable_mouse_gestures = props.enableMouseGestures ?? true;
  const enable_touch_gestures = props.enableTouchGestures ?? true;
  const background_color = props.backgroundColor || 'rgba(0,0,0,0.5)';
  const on_open = props.onOpen;
  const on_close = props.onClose;
  const drawer_style = props.drawerStyle || {
    backgroundImage: 'linear-gradient(180deg, #e0ecfc 7%, #bcbcdd 100%)',
    boxShadow: '0 2px 30px 0 rgb(31 38 103 / 20%)',
  };

  // drawer style when it's on the left side
  const wrapper_style_left = {
    left: default_Status === 'closed' ? -(width - handle_width) + 'px' : '0px',
    width: width + 'px',
    flexDirection: 'row-reverse',
  };
  // drawer style when it's on the right side
  const wrapper_style_right = {
    right: default_Status === 'closed' ? -(width - handle_width) + 'px' : '0px',
    width: width + 'px',
  };

  // input duration and distance settings to determine fast swipe
  const time_min = 75;
  const time_max = 300;
  const input_distance = 30;

  const [useAnimation, setUseAnimation] = useState(true);
  const [isOpen, setIsOpen] = useState(default_Status !== 'closed');

  // Mouse inputs

  const drawer_handle_onMove = useCallback(
    e => {
      const drawer = document.getElementById('Drawer_Wrapper');
      const background = document.getElementById('Drawer-Background');
      background.style.display = 'block';

      // used to cancel mouse onMove event if mouse pointer exceeded the drawer element while swiping.
      const drawer_current_pos = drawer.getBoundingClientRect()[direction === 'left' ? 'right' : 'left'];

      const scroll_width = window.innerWidth - document.body.scrollWidth;

      // the value that change drawer position (track)
      let move_width =
        direction === 'left'
          ? -(width - handle_width / 2) + e.clientX + (isOpen ? width - handle_width / 2 - x : 0)
          : -(width - handle_width / 2) +
            (window.innerWidth - e.clientX) +
            (isOpen ? width - handle_width / 2 - (window.innerWidth - x) : -scroll_width);

      move_width = move_width >= 0 ? 0 : move_width;
      drawer.style[direction] = move_width + 'px';

      const move_percentage = ((move_width + width) * 100) / width;
      background.style.opacity = move_percentage / 100;

      // cancel mouse onMove event if mouse pointer exceeded the drawer element
      if (direction === 'right') {
        if (e.clientX <= drawer_current_pos) drawer_handle_onMouseUp(e);
      } else {
        if (e.clientX >= drawer_current_pos - 1) drawer_handle_onMouseUp(e);
      }
    },
    [handle_width, direction, width, isOpen]
  );

  const drawer_handle_onMouseDown = e => {
    // cancel transition animation.
    setUseAnimation(false);
    // register first click position to calculate swipe distance later (on mouse up event).
    x = e.clientX;
    // register first click time to calculate swipe duration later (on mouse up event).
    t = Date.now();
    // add on mouse move event listener to the drawer element.
    const drawer = document.getElementById('Drawer_Wrapper');
    drawer.addEventListener('mousemove', drawer_handle_onMove);
  };

  const drawer_handle_onMouseUp = useCallback(
    e => {
      const drawer = document.getElementById('Drawer_Wrapper');
      const background = document.getElementById('Drawer-Background');

      const moving_distance = e.clientX - x;
      const moving_direction = moving_distance < 0 ? 'left' : 'right';
      const moving_time = Date.now() - t;
      // re-enable tranistion animation
      setUseAnimation(true);
      const drawer_current_pos = parseInt(window.getComputedStyle(drawer)[direction]);
      // hide the shaded background if swipe failed to open the drawer.
      if (Math.abs(moving_distance) <= 1 && !isOpen) background.style.display = 'none';

      // open the drawer if more than half of it is opend or on fast swipe.
      if (
        (drawer_current_pos > -width / 2 && moving_direction !== direction) ||
        (moving_time > time_min &&
          moving_time < time_max &&
          moving_direction !== direction &&
          Math.abs(moving_distance) > input_distance)
      ) {
        // position the drawer on the open state.
        drawer.style[direction] = '0px';
        // the shaded background
        background.style.opacity = 1;
        // props callback
        on_open?.();

        setIsOpen(true);
        // close the drawer if more than half of it is closed or on fast swipe.
      } else if (
        (drawer_current_pos < -width / 2 && moving_direction === direction) ||
        (moving_time > time_min &&
          moving_time < time_max &&
          moving_direction === direction &&
          Math.abs(moving_distance) > input_distance)
      ) {
        // position the drawer on the close state.
        drawer.style[direction] = -(width - handle_width) + 'px';
        // the shaded background
        background.style.opacity = 0;
        // props callback
        on_close?.();

        setIsOpen(false);
        // if none of the above re-positoin the drawer on open or close state.
      } else {
        drawer.style[direction] = isOpen ? '0px' : -(width - handle_width) + 'px';
        background.style.opacity = isOpen ? 1 : 0;
      }
      // remove on mouse move event from the drawer element.
      drawer.removeEventListener('mousemove', drawer_handle_onMove);
    },
    [drawer_handle_onMove, width, direction, handle_width, isOpen, on_open, on_close]
  );

  // Touch inputs
  const drawer_handle_onTouchStart = e => {
    // cancel transition animation.
    setUseAnimation(false);
    // register first touch position on the x-axis to calculate swipe distance later (on touch end event).
    x = e.targetTouches[0].pageX;
    // register first touch position on the y-axis to calculate swipe distance to enable or disable scrolling later (on touch end event).
    y = e.targetTouches[0].pageY;
    // register first touch time to calculate swipe duration later (on touch end event).
    t = Date.now();
    // add on touch move event listener to the drawer element.
    const drawer = document.getElementById('Drawer_Wrapper');
    drawer.addEventListener('touchmove', drawer_handle_onTouchMove);
  };

  const drawer_handle_onTouchMove = useCallback(
    e => {
      if (e.cancelable) e.preventDefault();

      const drawer = document.getElementById('Drawer_Wrapper');
      const background = document.getElementById('Drawer-Background');
      background.style.display = 'block';

      const horizontal_distance = Math.abs(e.changedTouches[0].pageX - x);
      const verical_destance = Math.abs(e.changedTouches[0].pageY - y);
      isSwipe = isSwipe === true ? true : horizontal_distance > 10;
      // cancel touch move event if user is scrolling inside the drawer.
      if (verical_destance > 10 && !isSwipe && isOpen) {
        drawer.style[direction] = '0px';
        drawer.removeEventListener('touchmove', drawer_handle_onTouchMove);
        return;
      }

      // the value that change drawer position (track)
      let move_width =
        direction === 'left'
          ? -(width - handle_width) + e.targetTouches[0].pageX + (isOpen ? width + handle_width - x : -handle_width)
          : -(width + handle_width) +
            (window.innerWidth - e.targetTouches[0].pageX) +
            (isOpen ? width + handle_width - (window.innerWidth - x) : handle_width);

      move_width = move_width >= 0 ? 0 : move_width;

      // change shaded background on drawer move.
      const move_percentage = ((move_width + width) * 100) / width;
      background.style.opacity = move_percentage / 100;
      // make the drawer tracks the touch.
      drawer.style[direction] = move_width + 'px';
    },
    [handle_width, direction, width, isOpen]
  );

  const drawer_handle_onTouchEnd = useCallback(
    e => {
      isSwipe = null;
      const drawer = document.getElementById('Drawer_Wrapper');
      const background = document.getElementById('Drawer-Background');

      const moving_distance = e.changedTouches[0].pageX - x;
      const moving_direction = moving_distance < 0 ? 'left' : 'right';
      const moving_time = Date.now() - t;
      // re-enable tranistion animation
      setUseAnimation(true);
      const drawer_current_pos = parseInt(window.getComputedStyle(drawer)[direction]);
      // open the drawer if more than half of it is opend or on fast swipe.
      if (
        (drawer_current_pos > -width / 2 && moving_direction !== direction) ||
        (moving_time > time_min &&
          moving_time < time_max &&
          moving_direction !== direction &&
          Math.abs(moving_distance) > input_distance)
      ) {
        // position the drawer on the open state.
        drawer.style[direction] = '0px';
        // the shaded background
        background.style.opacity = 1;
        // props callback
        on_open?.();

        setIsOpen(true);
      } else if (
        (drawer_current_pos < -width / 2 && moving_direction === direction) ||
        (moving_time > time_min &&
          moving_time < time_max &&
          moving_direction === direction &&
          Math.abs(moving_distance) > input_distance)
      ) {
        // position the drawer on the close state.
        drawer.style[direction] = -(width - handle_width) + 'px';
        // the shaded background
        background.style.opacity = 0;
        // props callback
        on_close?.();

        setIsOpen(false);
        // if none of the above re-positoin the drawer on open or close state.
      } else {
        drawer.style[direction] = isOpen ? '0px' : -(width - handle_width) + 'px';
        background.style.opacity = isOpen ? 1 : 0;
      }
      // remove on touch move event from the drawer element.
      drawer.removeEventListener('touchmove', drawer_handle_onTouchMove);
    },
    [drawer_handle_onTouchMove, width, direction, handle_width, isOpen, on_open, on_close]
  );

  // Shaded background touch inputs (only when the drawer is open)
  const shaded_onTouchStart = e => {
    // cancel transition animation.
    setUseAnimation(false);
    // register first touch position on the x-axis to calculate swipe distance later (on touch end event).
    x = e.targetTouches[0].pageX;
    // register first touch position on the y-axis to calculate swipe distance to enable or disable scrolling later (on touch end event).
    y = e.targetTouches[0].pageY;
    // register first touch time to calculate swipe duration later (on touch end event).
    t = Date.now();
    // add on touch move event listener to the drawer element.
    const shaded = document.getElementById('Drawer-Background');
    shaded.addEventListener('touchmove', shaded_onTouchMove);
  };

  const shaded_onTouchMove = useCallback(
    e => {
      if (e.cancelable) e.preventDefault();
      const drawer = document.getElementById('Drawer_Wrapper');
      const background = document.getElementById('Drawer-Background');

      // the value that change drawer position (track)
      let move_width =
        direction === 'left' ? -width + e.targetTouches[0].pageX : -width + (window.innerWidth - e.targetTouches[0].pageX);

      move_width = move_width >= 0 ? 0 : move_width;

      // change shaded background on drawer move.
      const move_percentage = ((move_width + width) * 100) / width;
      background.style.opacity = move_percentage / 100;
      // make the drawer tracks the touch.
      drawer.style[direction] = move_width + 'px';
    },
    [direction, width]
  );

  const shaded_onTouchEnd = useCallback(
    e => {
      const shaded = document.getElementById('Drawer-Background');
      const drawer = document.getElementById('Drawer_Wrapper');
      const background = document.getElementById('Drawer-Background');

      const moving_distance = e.changedTouches[0].pageX - x;
      const moving_direction = moving_distance < 0 ? 'left' : 'right';
      const moving_time = Date.now() - t;
      // re-enable tranistion animation
      setUseAnimation(true);
      const drawer_current_pos = parseInt(window.getComputedStyle(drawer)[direction]);
      // open the drawer if more than half of it is opend or on fast swipe.
      if (
        (drawer_current_pos > -width / 2 && moving_direction !== direction) ||
        (moving_time > time_min &&
          moving_time < time_max &&
          moving_direction !== direction &&
          Math.abs(moving_distance) > input_distance)
      ) {
        // position the drawer on the open state.
        drawer.style[direction] = '0px';
        // the shaded background
        background.style.opacity = 1;
        // props callback
        on_open?.();

        setIsOpen(true);
      } else if (
        (drawer_current_pos < -width / 2 && moving_direction === direction) ||
        (moving_time > time_min &&
          moving_time < time_max &&
          moving_direction === direction &&
          Math.abs(moving_distance) > input_distance)
      ) {
        // position the drawer on the close state.
        drawer.style[direction] = -(width - handle_width) + 'px';
        // the shaded background
        background.style.opacity = 0;
        // props callback
        on_close?.();

        setIsOpen(false);
        // if none of the above re-positoin the drawer on open or close state.
      } else {
        drawer.style[direction] = isOpen ? '0px' : -(width - handle_width) + 'px';
        background.style.opacity = isOpen ? 1 : 0;
      }
      // remove on touch move event from the drawer element.
      shaded.removeEventListener('touchmove', shaded_onTouchMove);
    },
    [shaded_onTouchMove, width, direction, handle_width, isOpen, on_open, on_close]
  );

  // Methods that used with ref
  const wait = time => new Promise(e => setTimeout(e, time));

  const close = e => {
    e?.stopPropagation();
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background');
    drawer.style[direction] = -(width - handle_width) + 'px';
    background.style.opacity = 0;
    on_close?.();
    setIsOpen(false);
  };

  const open = async () => {
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background');
    drawer.style[direction] = '0px';
    background.style.display = 'block';
    await wait(10);
    background.style.opacity = 1;
    on_open?.();
    setIsOpen(true);
  };

  const toggle = () => (isOpen ? close() : open());

  useImperativeHandle(ref, () => ({ close, open, toggle }));

  return (
    <>
      <div
        id='Drawer_Wrapper'
        style={{
          transitionDuration: (useAnimation ? duration : 0) + 'ms',
          transitionTimingFunction: ease,
          transitionProperty: direction + '',
          ...(direction === 'left' ? wrapper_style_left : wrapper_style_right),
        }}
        onDrag={e => e.preventDefault()}
        onMouseDown={enable_mouse_gestures ? drawer_handle_onMouseDown : null}
        onMouseUp={enable_mouse_gestures ? drawer_handle_onMouseUp : null}
        onTouchStart={enable_touch_gestures ? drawer_handle_onTouchStart : null}
        onTouchEnd={enable_touch_gestures ? drawer_handle_onTouchEnd : null}
      >
        <div id='Drawer_handle' style={{ width: handle_width + 'px', backgroundColor: handle_background_color }} />
        <div id='Drawer_Container' style={{ ...drawer_style, width: width - handle_width + 'px' }}>
          {props.children}
        </div>
      </div>
      <div
        id='Drawer-Background'
        style={{
          opacity: isOpen ? 1 : 0,
          transitionDuration: (useAnimation ? duration || 200 : 0) + 'ms',
          transitionProperty: 'opacity',
          backgroundColor: background_color,
          display: default_Status !== 'closed' ? 'block' : 'none',
        }}
        onTransitionEnd={e => (e.target.style.display = isOpen ? 'block' : 'none')}
        onClick={close}
        onTouchStart={isOpen ? shaded_onTouchStart : null}
        onTouchEnd={isOpen ? shaded_onTouchEnd : null}
      />
    </>
  );
});

export default Drawer;
