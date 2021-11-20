import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { requestNum } from 'request-animation-number';

document.body.style.overscrollBehaviorX = 'none';
document.body.style.margin = '0px';

const Drawer = forwardRef((props, ref) => {
  const drawerRef = useRef(null); // drawer wrapper element
  const backgroundRef = useRef(null); // shaded background element
  const siblings = useRef(null); // siblings (the rest of the page) elements
  const isSwipe = useRef(null); // is swipe gesture
  const t = useRef(null); // touch duration
  const y = useRef(null); // touch y position
  const x = useRef(null); // touch x position

  // props
  const drawer_type = props.type ?? 'modal'; // 'standard'
  const changePageWidth = props.standardOptions?.changePageWidth ?? false;
  const preventPageScrolling = props.standardOptions?.preventPageScrolling ?? false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const standard_drawer_options = {
    changePageWidth,
    preventPageScrolling,
  };
  const modalPreventPageScrolling = props.modalOptions?.preventPageScrolling ?? false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modal_drawer_options = { preventPageScrolling: modalPreventPageScrolling };
  const direction = props.direction || 'left'; // 'right'
  const default_Status = props.defaultStatus || 'closed'; // 'open'
  const handle_width = props.handleWidth ?? 20;
  const handle_background_color = props.handleBackgroundColor ?? 'initial';
  const propsWidth = props.width ?? 300;
  const width = propsWidth + handle_width;
  const duration = props.duration ?? 200;
  const easingFunction = props.ease || 'easeOutQuart';
  const enable_mouse_gestures = props.enableMouseGestures ?? false;
  const enable_touch_gestures = props.enableTouchGestures ?? true;
  const use_shaded_background = props.useShadedBackground ?? true;
  const background_color = props.backgroundColor || 'rgba(0,0,0,0.5)';
  const zIndex = props.zIndex ?? 100;
  const on_open = props.onOpen;
  const on_close = props.onClose;
  const on_move = props.onMove;
  const drawer_style = props.drawerStyle ?? {
    backgroundImage: 'linear-gradient(180deg, #e0ecfc 7%, #bcbcdd 100%)',
    boxShadow: '0 2px 30px 0 rgb(31 38 103 / 20%)',
  };

  // check drawer direction css property.
  const [isRtl, setIsRtl] = useState(null);

  // drawer wrapper element style when it's on the left side.
  const wrapper_style_left = {
    left: default_Status === 'closed' ? -(width - handle_width) + 'px' : '0px',
    width: width + 'px',
    flexDirection: isRtl ? 'row' : 'row-reverse',
  };
  // drawer wrapper element style when it's on the right side.
  const wrapper_style_right = {
    right: default_Status === 'closed' ? -(width - handle_width) + 'px' : '0px',
    width: width + 'px',
    flexDirection: isRtl ? 'row-reverse' : 'row',
  };

  // validate props
  const checkTypes = () => {
    if (drawer_type !== 'modal' && drawer_type !== 'standard') console.error('react-js-drawer: props.type has invalid value.');
    if (typeof changePageWidth !== 'boolean')
      console.error('react-js-drawer: props.standardOptions.changePageWidth has invalid value.');
    if (typeof preventPageScrolling !== 'boolean')
      console.error('react-js-drawer: props.standardOptions.preventPageScrolling has invalid value.');
    if (typeof standard_drawer_options !== 'object') console.error('react-js-drawer: props.standardOptions has invalid value.');
    if (typeof modalPreventPageScrolling !== 'boolean')
      console.error('react-js-drawer: props.modalOptions.preventPageScrolling has invalid value.');
    if (typeof modal_drawer_options !== 'object') console.error('react-js-drawer: props.modalOptions has invalid value.');
    if (direction !== 'left' && direction !== 'right') console.error('react-js-drawer: props.direction has invalid value.');
    if (default_Status !== 'closed' && default_Status !== 'open')
      console.error('react-js-drawer: props.defaultStatus has invalid value.');
    if (typeof handle_width !== 'number' || handle_width < 0)
      console.error('react-js-drawer: props.handleWidth has invalid value.');
    if (typeof handle_background_color !== 'string')
      console.error('react-js-drawer: props.handleBackgroundColor has invalid value.');
    if (typeof propsWidth !== 'number' || propsWidth < 0) console.error('react-js-drawer: props.width has invalid value.');
    if (typeof duration !== 'number' || duration < 0) console.error('react-js-drawer: props.duration has invalid value.');
    if (
      (!new Set([
        'linear',
        'easeInSine',
        'easeOutSine',
        'easeInOutSine',
        'easeInQuad',
        'easeOutQuad',
        'easeInOutQuad',
        'easeInCubic',
        'easeOutCubic',
        'easeInOutCubic',
        'easeInQuart',
        'easeOutQuart',
        'easeInOutQuart',
        'easeInQuint',
        'easeOutQuint',
        'easeInOutQuint',
        'easeInExpo',
        'easeOutExpo',
        'easeInOutExpo',
        'easeInCirc',
        'easeOutCirc',
        'easeInOutCirc',
        'easeInBack',
        'easeOutBack',
        'easeInOutBack',
        'easeInElastic',
        'easeOutElastic',
        'easeInOutElastic',
        'easeInBounce',
        'easeOutBounce',
        'easeInOutBounce',
      ]).has(easingFunction) &&
        typeof easingFunction === 'string') ||
      (typeof easingFunction !== 'string' && typeof easingFunction !== 'function')
    )
      console.error('react-js-drawer: props.ease has invalid value.');
    if (typeof enable_mouse_gestures !== 'boolean')
      console.error('react-js-drawer: props.enableMouseGestures has invalid value.');
    if (typeof enable_touch_gestures !== 'boolean')
      console.error('react-js-drawer: props.enableTouchGestures has invalid value.');
    if (typeof use_shaded_background !== 'boolean')
      console.error('react-js-drawer: props.useShadedBackground has invalid value.');
    if (typeof background_color !== 'string') console.error('react-js-drawer: props.backgroundColor has invalid value.');
    if (typeof zIndex !== 'number') console.error('react-js-drawer: props.zIndex has invalid value.');
    if (on_open && typeof on_open !== 'function') console.error('react-js-drawer: props.onOpen has invalid value.');
    if (on_close && typeof on_close !== 'function') console.error('react-js-drawer: props.onClose has invalid value.');
    if (on_move && typeof on_move !== 'function') console.error('react-js-drawer: props.onMove has invalid value.');
    if (typeof drawer_style !== 'object') console.error('react-js-drawer: props.drawerStyle has invalid value.');
    if (props.id && typeof props.id !== 'string') console.error('react-js-drawer: props.id has invalid value.');
    if (props.className && typeof props.className !== 'string')
      console.error('react-js-drawer: props.className has invalid value.');

    const allProps = new Set([
      'type',
      'standardOptions',
      'modalOptions',
      'direction',
      'wheelScrollWithAnimation',
      'defaultStatus',
      'handleWidth',
      'handleBackgroundColor',
      'width',
      'duration',
      'ease',
      'enableMouseGestures',
      'enableTouchGestures',
      'useShadedBackground',
      'backgroundColor',
      'adjustPagesSize',
      'zIndex',
      'onOpen',
      'onClose',
      'onMove',
      'drawerStyle',
      'id',
      'className',
      'children',
    ]);
    for (const key in props) {
      if (Object.hasOwnProperty.call(props, key)) {
        if (!allProps.has(key)) console.error(`react-js-drawer: can't recognize props.${key} it's not a valid prop.`);
      }
    }
  };
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') checkTypes();

  // input duration and distance settings that determine fast swipe.
  const time_min = 75;
  const time_max = 300;
  const input_distance = 30;

  // drawer status
  const [isOpen, setIsOpen] = useState(default_Status !== 'closed');

  // save sibling (the rest of the page elements) to a siblings ref, used for 'standard' drawer type only.
  const get_sibling = () => {
    let el = drawerRef.current;
    const sibs = [];
    while (el.nextSibling) {
      el = el.nextSibling;
      if (el !== backgroundRef.current) sibs.push(el);
    }
    siblings.current = sibs;
  };

  // change page elements position and width for drawer type 'standard'.
  const mutatePage = useCallback(() => {
    const drawer = drawerRef.current;
    const width = drawer.getBoundingClientRect().width - handle_width;
    const pos = parseInt(window.getComputedStyle(drawer).getPropertyValue(direction)) + width;
    // props onMove callback
    on_move?.(pos / width);
    // exit when the drawer type is not type'standard'.
    if (drawer_type === 'modal') return;
    // adjust transform translate value depending on drawer direction left or right.
    const translateValue = isRtl
      ? direction === 'right' && standard_drawer_options.changePageWidth
        ? -pos
        : direction === 'right' && !standard_drawer_options.changePageWidth
        ? -pos
        : direction === 'left' && standard_drawer_options.changePageWidth
        ? 0
        : pos
      : direction === 'right' && standard_drawer_options.changePageWidth
      ? 0
      : direction === 'right' && !standard_drawer_options.changePageWidth
      ? -pos
      : pos;

    // loop over the page elements and change the style.
    for (let i = 0; i < siblings.current.length; i++) {
      const el = siblings.current[i];
      el.style.transform = `translateX(${translateValue}px)`;
      if (standard_drawer_options.changePageWidth) el.style.width = `calc(100% - ${pos}px)`;
    }
  }, [direction, drawer_type, handle_width, isRtl, on_move, standard_drawer_options.changePageWidth]);

  useEffect(() => {
    // observe the drawerRef and mutate the page elements for drawer type 'standard'.
    const observer = new MutationObserver(mutatePage);
    observer.observe(drawerRef.current, { attributes: true });

    // remove scrolling from body and drawer's parent if enabled.
    if (
      (standard_drawer_options.preventPageScrolling && drawer_type === 'standard') ||
      (modal_drawer_options.preventPageScrolling && drawer_type === 'modal')
    ) {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
      drawerRef.current.parentElement.style.overflow = isOpen ? 'hidden' : 'auto';
    }

    return () => {
      observer.disconnect();
    };
  }, [isOpen, standard_drawer_options, drawer_type, modal_drawer_options, mutatePage]);

  useLayoutEffect(() => {
    setIsRtl(window.getComputedStyle(drawerRef.current).direction === 'rtl');
    get_sibling();

    // restore body and drawer's parent style on unmount.
    const drawer = drawerRef.current;
    return () => {
      document.body.style.overflow = 'auto';
      drawer.parentElement.style.overflow = 'auto';
    };
  }, [handle_width, mutatePage, width, default_Status]);

  const open_animation = useCallback(
    from => {
      const drawer = drawerRef.current;
      const background = backgroundRef.current;
      // animate to open state.
      requestNum({ from, to: [0, 1], duration, easingFunction }, (m, o) => {
        drawer.style[direction] = m + 'px';
        if (background) background.style.opacity = o;
        // when animation is done
        if (o === 1) {
          // props callback.
          on_open?.();
          // set state to open.
          setIsOpen(true);
        }
      });
    },
    [direction, duration, easingFunction, on_open]
  );

  const close_animation = useCallback(
    from => {
      const drawer = drawerRef.current;
      const background = backgroundRef.current;
      // animate drawer to close state.
      requestNum({ from, to: [-(width - handle_width), 0], duration, easingFunction }, (m, o) => {
        drawer.style[direction] = m + 'px';
        if (background) background.style.opacity = o;
        // when animation is done.
        if (o === 0) {
          // shaded background.
          background.style.display = 'none';
          // porps callback.
          on_close?.();
          // set drawer to close state.
          setIsOpen(false);
          // clean up if drawer type changed from standard to modal while is still open.
          for (let i = 0; i < siblings.current.length; i++) {
            const el = siblings.current[i];
            el.style.removeProperty('transform');
          }
        }
      });
    },
    [direction, duration, easingFunction, handle_width, on_close, width]
  );

  // Mouse inputs
  const drawer_handle_onMove = useCallback(
    e => {
      const drawer = drawerRef.current;
      const background = backgroundRef.current;
      if (background) background.style.display = 'block';

      // used to cancel mouse onMove event if mouse pointer exceeded the drawer element while swiping.
      const drawer_current_pos = drawer.getBoundingClientRect()[direction === 'left' ? 'right' : 'left'];
      // calculate scroll bar width.
      const scroll_width = window.innerWidth - document.body.scrollWidth;

      // the value that change drawer position (track).
      let move_width =
        direction === 'left'
          ? -(width - handle_width) + e.clientX + (isOpen ? width - handle_width / 2 - x.current : 0)
          : -(width - handle_width) +
            (window.innerWidth - e.clientX) +
            (isOpen ? width - handle_width / 2 - (window.innerWidth - x.current) : -scroll_width);

      move_width = Math.min(Math.max(move_width, -(width - handle_width)), 0);

      drawer.style[direction] = move_width + 'px';

      const move_percentage = ((move_width + width) * 100) / width;
      if (background) background.style.opacity = move_percentage / 100;

      // cancel mouse onMove event if mouse pointer exceeded the drawer element
      if (direction === 'right') {
        if (e.clientX <= drawer_current_pos) drawer_handle_onMouseUp(e);
      } else {
        if (e.clientX >= drawer_current_pos - 1) drawer_handle_onMouseUp(e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handle_width, direction, width, isOpen]
  );

  const drawer_handle_onMouseDown = e => {
    // register first click position to calculate swipe distance later (on mouse up event).
    x.current = e.clientX;
    // register first click time to calculate swipe duration later (on mouse up event).
    t.current = Date.now();
    // add on mouse move event listener to the body.
    document.body.addEventListener('mousemove', drawer_handle_onMove);
  };

  const drawer_handle_onMouseUp = useCallback(
    e => {
      const drawer = drawerRef.current;
      const background = backgroundRef.current;

      const moving_distance = e.clientX - x.current;
      const moving_direction = moving_distance < 0 ? 'left' : 'right';
      const moving_time = Date.now() - t.current;
      const drawer_current_pos = parseInt(window.getComputedStyle(drawer)[direction]);
      const move_percentage = ((drawer_current_pos + width) * 100) / width;
      // hide the shaded background if swipe failed to open the drawer.
      if (Math.abs(moving_distance) <= 1 && !isOpen && background) background.style.display = 'none';

      // open the drawer if more than half of it is opend or on fast swipe.
      if (
        (drawer_current_pos > -width / 2 && moving_direction !== direction) ||
        (moving_time > time_min &&
          moving_time < time_max &&
          moving_direction !== direction &&
          Math.abs(moving_distance) > input_distance)
      ) {
        // position the drawer on the open state.
        open_animation([drawer_current_pos, move_percentage / 100]);

        // close the drawer if more than half of it is closed or on fast swipe.
      } else if (
        (drawer_current_pos < -width / 2 && moving_direction === direction) ||
        (moving_time > time_min &&
          moving_time < time_max &&
          moving_direction === direction &&
          Math.abs(moving_distance) > input_distance)
      ) {
        // position the drawer on the close state.
        close_animation([drawer_current_pos, move_percentage / 100]);

        // if none of the above re-positoin the drawer on open or close state.
      } else {
        isOpen
          ? open_animation([drawer_current_pos, move_percentage / 100])
          : close_animation([drawer_current_pos, move_percentage / 100]);
      }
      // remove on mouse move event from the drawer element.
      document.body.removeEventListener('mousemove', drawer_handle_onMove);
    },
    [direction, width, isOpen, drawer_handle_onMove, open_animation, close_animation]
  );

  // Touch inputs
  const drawer_handle_onTouchStart = e => {
    // register first touch position on the x-axis to calculate swipe distance later (on touch end event).
    x.current = e.targetTouches[0].pageX;
    // register first touch position on the y-axis to calculate swipe distance to enable or disable scrolling later (on touch end event).
    y.current = e.targetTouches[0].pageY;
    // register first touch time to calculate swipe duration later (on touch end event).
    t.current = Date.now();
    // add on touch move event listener to the drawer element.
    drawerRef.current.addEventListener('touchmove', drawer_handle_onTouchMove);
  };

  const drawer_handle_onTouchMove = useCallback(
    e => {
      if (e.cancelable) e.preventDefault();
      const drawer = drawerRef.current;
      const background = backgroundRef.current;
      if (background) background.style.display = 'block';

      const horizontal_distance = Math.abs(e.changedTouches[0].pageX - x.current);
      const verical_destance = Math.abs(e.changedTouches[0].pageY - y.current);
      isSwipe.current = isSwipe.current === true ? true : horizontal_distance > 10;
      // cancel touch move event if user is scrolling inside the drawer.
      if (verical_destance > 10 && !isSwipe.current && isOpen) {
        drawer.style[direction] = '0px';
        drawer.removeEventListener('touchmove', drawer_handle_onTouchMove);
        return;
      }

      // the value that change drawer position (track)
      let move_width =
        direction === 'left'
          ? -(width - handle_width) + e.targetTouches[0].pageX + (isOpen ? width - handle_width / 2 - x.current : -handle_width)
          : -(width + handle_width) +
            (window.innerWidth - e.targetTouches[0].pageX) +
            (isOpen ? width + handle_width - (window.innerWidth - x.current) : handle_width);

      move_width = Math.min(Math.max(move_width, -(width - handle_width)), 0);

      // change shaded background on drawer move.
      const move_percentage = ((move_width + width) * 100) / width;
      if (background) background.style.opacity = move_percentage / 100;
      // make the drawer tracks the touch.
      drawer.style[direction] = move_width + 'px';
    },
    [handle_width, direction, width, isOpen]
  );

  const drawer_handle_onTouchEnd = useCallback(
    e => {
      isSwipe.current = null;
      const drawer = drawerRef.current;

      const moving_distance = e.changedTouches[0].pageX - x.current;
      const moving_direction = moving_distance < 0 ? 'left' : 'right';
      const moving_time = Date.now() - t.current;
      const drawer_current_pos = parseInt(window.getComputedStyle(drawer)[direction]);
      const move_percentage = ((drawer_current_pos + width) * 100) / width;

      // open the drawer if more than half of it is opend or on fast swipe.
      if (
        (drawer_current_pos > -width / 2 && moving_direction !== direction) ||
        (moving_time > time_min &&
          moving_time < time_max &&
          moving_direction !== direction &&
          Math.abs(moving_distance) > input_distance)
      ) {
        // position the drawer on the open state.
        open_animation([drawer_current_pos, move_percentage / 100]);
      } else if (
        (drawer_current_pos < -width / 2 && moving_direction === direction) ||
        (moving_time > time_min &&
          moving_time < time_max &&
          moving_direction === direction &&
          Math.abs(moving_distance) > input_distance)
      ) {
        // position the drawer on the close state.
        close_animation([drawer_current_pos, move_percentage / 100]);

        // if none of the above re-positoin the drawer on open or close state.
      } else {
        isOpen
          ? open_animation([drawer_current_pos, move_percentage / 100])
          : close_animation([drawer_current_pos, move_percentage / 100]);
      }
      // remove on touch move event from the drawer element.
      drawer.removeEventListener('touchmove', drawer_handle_onTouchMove);
    },
    [direction, width, drawer_handle_onTouchMove, open_animation, close_animation, isOpen]
  );

  // Shaded background touch inputs (only when the drawer is open)
  const shaded_onTouchStart = e => {
    // register first touch position on the x-axis to calculate swipe distance later (on touch end event).
    x.current = e.targetTouches[0].pageX;
    // register first touch position on the y-axis to calculate swipe distance to enable or disable scrolling later (on touch end event).
    y.current = e.targetTouches[0].pageY;
    // register first touch time to calculate swipe duration later (on touch end event).
    t.current = Date.now();
    // add on touch move event listener to shaded background element.
    backgroundRef.current.addEventListener('touchmove', shaded_onTouchMove);
  };

  const shaded_onTouchMove = useCallback(
    e => {
      if (e.cancelable) e.preventDefault();
      const drawer = drawerRef.current;
      const background = backgroundRef.current;

      // the value that change drawer position (track)
      let move_width =
        direction === 'left' ? -width + e.targetTouches[0].pageX : -width + (window.innerWidth - e.targetTouches[0].pageX);

      move_width = Math.min(Math.max(move_width, -(width - handle_width)), 0);

      // change shaded background on drawer move.
      const move_percentage = ((move_width + width) * 100) / width;
      if (background) background.style.opacity = move_percentage / 100;
      // make the drawer tracks the touch.
      drawer.style[direction] = move_width + 'px';
    },
    [direction, width, handle_width]
  );

  const shaded_onTouchEnd = useCallback(
    e => {
      const drawer = drawerRef.current;
      const shaded = backgroundRef.current;

      const moving_distance = e.changedTouches[0].pageX - x.current;
      const moving_direction = moving_distance < 0 ? 'left' : 'right';
      const moving_time = Date.now() - t.current;
      const drawer_current_pos = parseInt(window.getComputedStyle(drawer)[direction]);
      const move_percentage = ((drawer_current_pos + width) * 100) / width;
      // open the drawer if more than half of it is opend or on fast swipe.
      if (
        (drawer_current_pos > -width / 2 && moving_direction !== direction) ||
        (moving_time > time_min &&
          moving_time < time_max &&
          moving_direction !== direction &&
          Math.abs(moving_distance) > input_distance)
      ) {
        // position the drawer on the open state.
        open_animation([drawer_current_pos, move_percentage / 100]);
      } else if (
        (drawer_current_pos < -width / 2 && moving_direction === direction) ||
        (moving_time > time_min &&
          moving_time < time_max &&
          moving_direction === direction &&
          Math.abs(moving_distance) > input_distance)
      ) {
        close_animation([drawer_current_pos, move_percentage / 100]);
        // if none of the above re-positoin the drawer on open or close state.
      } else {
        isOpen
          ? open_animation([drawer_current_pos, move_percentage / 100])
          : close_animation([drawer_current_pos, move_percentage / 100]);
      }
      // remove on touch move event from the drawer element.
      shaded.removeEventListener('touchmove', shaded_onTouchMove);
    },
    [direction, width, shaded_onTouchMove, open_animation, close_animation, isOpen]
  );

  const wait = time => new Promise(e => setTimeout(e, time));

  const close = e => {
    e?.stopPropagation();
    close_animation([0, 1]);
  };

  const open = async () => {
    const background = backgroundRef.current;
    if (background) background.style.display = 'block';
    await wait(10);
    open_animation([-(width - handle_width), 0]);
  };

  const toggle = () => (isOpen ? close() : open());

  useImperativeHandle(ref, () => ({ close, open, toggle }));

  return (
    <>
      <div
        ref={drawerRef}
        style={{
          position: 'fixed',
          top: '0px',
          height: '100%',
          display: 'flex',
          willChange: 'left, right',
          zIndex,
          userSelect: 'none',
          ...(direction === 'left' ? wrapper_style_left : wrapper_style_right),
        }}
        onDrag={e => e.preventDefault()}
        onMouseDown={enable_mouse_gestures ? drawer_handle_onMouseDown : null}
        onMouseUp={enable_mouse_gestures ? drawer_handle_onMouseUp : null}
        onTouchStart={enable_touch_gestures ? drawer_handle_onTouchStart : null}
        onTouchEnd={enable_touch_gestures ? drawer_handle_onTouchEnd : null}
      >
        {/* drawer handle */}
        <div
          style={{ width: handle_width + 'px', backgroundColor: handle_background_color, height: '100%', touchAction: 'none' }}
        />
        {/* drawer contents container */}
        <div
          className={props.className}
          id={props.id}
          style={{
            ...drawer_style,
            width: width - handle_width + 'px',
            height: '100%',
            padding: '0px',
            overflow: 'hidden overlay',
          }}
        >
          {props.children}
        </div>
      </div>
      {/* drawer shaded background */}
      {use_shaded_background ? (
        <div
          ref={backgroundRef}
          style={{
            opacity: default_Status !== 'closed' ? 1 : 0,
            display: default_Status !== 'closed' ? 'block' : 'none',
            backgroundColor: background_color,
            position: 'fixed',
            top: '0px',
            width: '100%',
            height: '100%',
            touchAction: 'none',
            zIndex: zIndex - 1,
          }}
          onClick={close}
          onTouchStart={isOpen ? shaded_onTouchStart : null}
          onTouchEnd={isOpen ? shaded_onTouchEnd : null}
        />
      ) : null}
    </>
  );
});

export default Drawer;
