"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.promise.js");

require("./react-js-drawer.css");

var _react = _interopRequireWildcard(require("react"));

var _requestAnimationNumber = require("request-animation-number");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

document.body.style.overscrollBehaviorX = 'none';
document.body.style.margin = '0px';
const Drawer = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  var _props$type, _props$standardOption, _props$standardOption2, _props$standardOption3, _props$standardOption4, _props$modalOptions$p, _props$modalOptions, _props$handleWidth, _props$width, _props$duration, _props$enableMouseGes, _props$enableTouchGes, _props$useShadedBackg, _props$scrollBarCusto, _props$zIndex;

  const siblings = (0, _react.useRef)();
  const isSwipe = (0, _react.useRef)();
  const t = (0, _react.useRef)();
  const y = (0, _react.useRef)();
  const x = (0, _react.useRef)();
  const drawer_type = (_props$type = props.type) !== null && _props$type !== void 0 ? _props$type : 'modal'; // 'standard'
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const standard_drawer_options = {
    changePageWidth: (_props$standardOption = (_props$standardOption2 = props.standardOptions) === null || _props$standardOption2 === void 0 ? void 0 : _props$standardOption2.changePageWidth) !== null && _props$standardOption !== void 0 ? _props$standardOption : false,
    preventPageScrolling: (_props$standardOption3 = (_props$standardOption4 = props.standardOptions) === null || _props$standardOption4 === void 0 ? void 0 : _props$standardOption4.preventPageScrolling) !== null && _props$standardOption3 !== void 0 ? _props$standardOption3 : false
  }; // eslint-disable-next-line react-hooks/exhaustive-deps

  const modal_drawer_options = {
    preventPageScrolling: (_props$modalOptions$p = (_props$modalOptions = props.modalOptions) === null || _props$modalOptions === void 0 ? void 0 : _props$modalOptions.preventPageScrolling) !== null && _props$modalOptions$p !== void 0 ? _props$modalOptions$p : false
  };
  const direction = props.direction || 'left';
  const default_Status = props.defaultStatus || 'closed'; // 'open'

  const handle_width = (_props$handleWidth = props.handleWidth) !== null && _props$handleWidth !== void 0 ? _props$handleWidth : 20;
  const handle_background_color = props.handleBackgroundColor || 'initial';
  const width = ((_props$width = props.width) !== null && _props$width !== void 0 ? _props$width : 300) + handle_width;
  const duration = (_props$duration = props.duration) !== null && _props$duration !== void 0 ? _props$duration : 200;
  const easingFunction = props.ease || 'easeOutQuart';
  const enable_mouse_gestures = (_props$enableMouseGes = props.enableMouseGestures) !== null && _props$enableMouseGes !== void 0 ? _props$enableMouseGes : false;
  const enable_touch_gestures = (_props$enableTouchGes = props.enableTouchGestures) !== null && _props$enableTouchGes !== void 0 ? _props$enableTouchGes : true;
  const use_shaded_background = (_props$useShadedBackg = props.useShadedBackground) !== null && _props$useShadedBackg !== void 0 ? _props$useShadedBackg : true;
  const background_color = props.backgroundColor || 'rgba(0,0,0,0.5)';
  const enableSrollbarStyle = (_props$scrollBarCusto = props.scrollBarCustomStyle) !== null && _props$scrollBarCusto !== void 0 ? _props$scrollBarCusto : true;
  const zIndex = (_props$zIndex = props.zIndex) !== null && _props$zIndex !== void 0 ? _props$zIndex : 100;
  const on_open = props.onOpen;
  const on_close = props.onClose;
  const drawer_style = props.drawerStyle || {
    backgroundImage: 'linear-gradient(180deg, #e0ecfc 7%, #bcbcdd 100%)',
    boxShadow: '0 2px 30px 0 rgb(31 38 103 / 20%)'
  }; // drawer style when it's on the left side.

  const wrapper_style_left = {
    left: default_Status === 'closed' ? -(width - handle_width) + 'px' : '0px',
    width: width + 'px',
    flexDirection: 'row-reverse',
    direction: 'ltr'
  }; // drawer style when it's on the right side.

  const wrapper_style_right = {
    right: default_Status === 'closed' ? -(width - handle_width) + 'px' : '0px',
    width: width + 'px',
    direction: 'ltr'
  }; // input duration and distance settings that determine fast swipe.

  const time_min = 75;
  const time_max = 300;
  const input_distance = 30;
  const [isOpen, setIsOpen] = (0, _react.useState)(default_Status !== 'closed');

  const get_sibling = () => {
    let el = document.getElementById('Drawer_Wrapper');
    const sibs = [];

    while (el.nextSibling) {
      el = el.nextSibling;
      if (el.id !== 'Drawer-Background') sibs.push(el);
    }

    siblings.current = sibs;
  };

  const set_siblings_style = (0, _react.useCallback)(v => {
    // exit when the drawer type is not standard.
    if (drawer_type === 'modal') return; // adjust translate value when the drawer is on the right.

    const translateValue = direction === 'right' && standard_drawer_options.changePageWidth ? 0 : direction === 'right' && !standard_drawer_options.changePageWidth ? -v : v;

    for (let i = 0; i < siblings.current.length; i++) {
      const el = siblings.current[i];
      el.style.transform = "translateX(".concat(translateValue, "px)");
      if (standard_drawer_options.changePageWidth) el.style.width = "calc(100% - ".concat(v, "px)");
    }
  }, [drawer_type, standard_drawer_options.changePageWidth, direction]);
  (0, _react.useEffect)(() => {
    // remove scrolling from body and drawer's parent if enabled.
    if (standard_drawer_options.preventPageScrolling && drawer_type === 'standard' || modal_drawer_options.preventPageScrolling && drawer_type === 'modal') {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
      document.getElementById('Drawer_Wrapper').parentElement.style.overflow = isOpen ? 'hidden' : 'auto';
    }
  }, [isOpen, standard_drawer_options, drawer_type, modal_drawer_options]);
  (0, _react.useLayoutEffect)(() => {
    get_sibling();

    if (default_Status === 'open') {
      set_siblings_style(width - handle_width);
    } else if (default_Status === 'closed') {
      for (let i = 0; i < siblings.current.length; i++) {
        const el = siblings.current[i]; // el.style.removeProperty('transform');
      }
    } // restore body and drawer's parent style on unmount.


    return () => {
      document.body.style.overflow = 'auto';
      document.getElementById('Drawer_Wrapper').parentElement.style.overflow = 'auto';
    };
  }, [default_Status, handle_width, set_siblings_style, width]);
  const open_animation = (0, _react.useCallback)(from => {
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background'); // animate to open state.

    (0, _requestAnimationNumber.requestNum)({
      from,
      to: [0, 1],
      duration,
      easingFunction
    }, (m, o) => {
      drawer.style[direction] = m + 'px';
      if (background) background.style.opacity = o; // when animation is done

      if (o === 1) {
        // props callback.
        on_open === null || on_open === void 0 ? void 0 : on_open(); // set state to open.

        setIsOpen(true);
      }
    }); // exit when the drawer type isn't standard.

    if (drawer_type === 'modal') return; // loop over drawer's siblings.

    for (let i = 0; i < siblings.current.length; i++) {
      const el = siblings.current[i];
      const translateToValue = direction === 'right' && standard_drawer_options.changePageWidth ? 0 : direction === 'right' && !standard_drawer_options.changePageWidth ? -width + handle_width : width - handle_width;
      const translateFromValue = direction === 'right' && standard_drawer_options.changePageWidth ? 0 : direction === 'right' && !standard_drawer_options.changePageWidth ? -(width - handle_width + from[0]) : width - handle_width + from[0]; // animate drawer's siblilng width and translate vaules to open state.

      (0, _requestAnimationNumber.requestNum)({
        from: [translateFromValue, width - handle_width + from[0]],
        to: [translateToValue, width - handle_width],
        duration,
        easingFunction
      }, (t, w) => {
        el.style.transform = "translateX(".concat(t, "px)");
        if (standard_drawer_options.changePageWidth) el.style.width = "calc(100% - ".concat(w, "px)");
      });
    }
  }, [direction, drawer_type, duration, easingFunction, handle_width, on_open, standard_drawer_options.changePageWidth, width]);
  const close_animation = (0, _react.useCallback)(from => {
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background'); // animate drawer to close state.

    (0, _requestAnimationNumber.requestNum)({
      from,
      to: [-(width - handle_width), 0],
      duration,
      easingFunction
    }, (m, o) => {
      drawer.style[direction] = m + 'px';
      if (background) background.style.opacity = o; // when animation is done.

      if (o === 0) {
        // shaded background.
        background.style.display = 'none'; // porps callback.

        on_close === null || on_close === void 0 ? void 0 : on_close(); // set drawer to close state.

        setIsOpen(false); // clean up if drawer type changed from standard to modal while is still open.

        for (let i = 0; i < siblings.current.length; i++) {
          const el = siblings.current[i];
          el.style.removeProperty('transform');
        }
      }
    }); // exit when the drawer type isn't standard.

    if (drawer_type === 'modal') return; //

    for (let i = 0; i < siblings.current.length; i++) {
      const el = siblings.current[i];
      const translateFromValue = direction === 'right' && standard_drawer_options.changePageWidth ? 0 : direction === 'right' && !standard_drawer_options.changePageWidth ? -(width - handle_width + from[0]) : width - handle_width + from[0];
      (0, _requestAnimationNumber.requestNum)({
        from: [translateFromValue, width - handle_width + from[0]],
        to: [0, 0],
        duration,
        easingFunction
      }, (t, w) => {
        el.style.transform = "translateX(".concat(t, "px)");
        if (standard_drawer_options.changePageWidth) el.style.width = "calc(100% - ".concat(w, "px)");
        if (t === 0) el.style.removeProperty('transform');
      });
    }
  }, [direction, drawer_type, duration, easingFunction, handle_width, on_close, standard_drawer_options.changePageWidth, width]); // Mouse inputs

  const drawer_handle_onMove = (0, _react.useCallback)(e => {
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background');
    if (background) background.style.display = 'block'; // used to cancel mouse onMove event if mouse pointer exceeded the drawer element while swiping.

    const drawer_current_pos = drawer.getBoundingClientRect()[direction === 'left' ? 'right' : 'left']; // calculate scroll bar width.

    const scroll_width = window.innerWidth - document.body.scrollWidth; // the value that change drawer position (track).

    let move_width = direction === 'left' ? -(width - handle_width) + e.clientX + (isOpen ? width - handle_width / 2 - x.current : 0) : -(width - handle_width) + (window.innerWidth - e.clientX) + (isOpen ? width - handle_width / 2 - (window.innerWidth - x.current) : -scroll_width);
    move_width = Math.min(Math.max(move_width, -(width - handle_width)), 0);
    drawer.style[direction] = move_width + 'px';
    set_siblings_style(move_width + width - handle_width);
    const move_percentage = (move_width + width) * 100 / width;
    if (background) background.style.opacity = move_percentage / 100; // cancel mouse onMove event if mouse pointer exceeded the drawer element

    if (direction === 'right') {
      if (e.clientX <= drawer_current_pos) drawer_handle_onMouseUp(e);
    } else {
      if (e.clientX >= drawer_current_pos - 1) drawer_handle_onMouseUp(e);
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [handle_width, direction, width, isOpen, set_siblings_style]);

  const drawer_handle_onMouseDown = e => {
    // register first click position to calculate swipe distance later (on mouse up event).
    x.current = e.clientX; // register first click time to calculate swipe duration later (on mouse up event).

    t.current = Date.now(); // add on mouse move event listener to the body.

    document.body.addEventListener('mousemove', drawer_handle_onMove);
  };

  const drawer_handle_onMouseUp = (0, _react.useCallback)(e => {
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background');
    const moving_distance = e.clientX - x.current;
    const moving_direction = moving_distance < 0 ? 'left' : 'right';
    const moving_time = Date.now() - t.current;
    const drawer_current_pos = parseInt(window.getComputedStyle(drawer)[direction]);
    const move_percentage = (drawer_current_pos + width) * 100 / width; // hide the shaded background if swipe failed to open the drawer.

    if (Math.abs(moving_distance) <= 1 && !isOpen && background) background.style.display = 'none'; // open the drawer if more than half of it is opend or on fast swipe.

    if (drawer_current_pos > -width / 2 && moving_direction !== direction || moving_time > time_min && moving_time < time_max && moving_direction !== direction && Math.abs(moving_distance) > input_distance) {
      // position the drawer on the open state.
      open_animation([drawer_current_pos, move_percentage / 100]); // close the drawer if more than half of it is closed or on fast swipe.
    } else if (drawer_current_pos < -width / 2 && moving_direction === direction || moving_time > time_min && moving_time < time_max && moving_direction === direction && Math.abs(moving_distance) > input_distance) {
      // position the drawer on the close state.
      close_animation([drawer_current_pos, move_percentage / 100]); // if none of the above re-positoin the drawer on open or close state.
    } else {
      isOpen ? open_animation([drawer_current_pos, move_percentage / 100]) : close_animation([drawer_current_pos, move_percentage / 100]);
    } // remove on mouse move event from the drawer element.


    document.body.removeEventListener('mousemove', drawer_handle_onMove);
  }, [direction, width, isOpen, drawer_handle_onMove, open_animation, close_animation]); // Touch inputs

  const drawer_handle_onTouchStart = e => {
    // register first touch position on the x-axis to calculate swipe distance later (on touch end event).
    x.current = e.targetTouches[0].pageX; // register first touch position on the y-axis to calculate swipe distance to enable or disable scrolling later (on touch end event).

    y.current = e.targetTouches[0].pageY; // register first touch time to calculate swipe duration later (on touch end event).

    t.current = Date.now(); // add on touch move event listener to the drawer element.

    const drawer = document.getElementById('Drawer_Wrapper');
    drawer.addEventListener('touchmove', drawer_handle_onTouchMove);
  };

  const drawer_handle_onTouchMove = (0, _react.useCallback)(e => {
    if (e.cancelable) e.preventDefault();
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background');
    if (background) background.style.display = 'block';
    const horizontal_distance = Math.abs(e.changedTouches[0].pageX - x.current);
    const verical_destance = Math.abs(e.changedTouches[0].pageY - y.current);
    isSwipe.current = isSwipe.current === true ? true : horizontal_distance > 10; // cancel touch move event if user is scrolling inside the drawer.

    if (verical_destance > 10 && !isSwipe.current && isOpen) {
      drawer.style[direction] = '0px';
      drawer.removeEventListener('touchmove', drawer_handle_onTouchMove);
      return;
    } // the value that change drawer position (track)


    let move_width = direction === 'left' ? -(width - handle_width) + e.targetTouches[0].pageX + (isOpen ? width - handle_width / 2 - x.current : -handle_width) : -(width + handle_width) + (window.innerWidth - e.targetTouches[0].pageX) + (isOpen ? width + handle_width - (window.innerWidth - x.current) : handle_width);
    move_width = Math.min(Math.max(move_width, -(width - handle_width)), 0); // change shaded background on drawer move.

    const move_percentage = (move_width + width) * 100 / width;
    if (background) background.style.opacity = move_percentage / 100; // make the drawer tracks the touch.

    drawer.style[direction] = move_width + 'px';
    set_siblings_style(move_width + width - handle_width);
  }, [handle_width, direction, width, isOpen, set_siblings_style]);
  const drawer_handle_onTouchEnd = (0, _react.useCallback)(e => {
    isSwipe.current = null;
    const drawer = document.getElementById('Drawer_Wrapper');
    const moving_distance = e.changedTouches[0].pageX - x.current;
    const moving_direction = moving_distance < 0 ? 'left' : 'right';
    const moving_time = Date.now() - t.current;
    const drawer_current_pos = parseInt(window.getComputedStyle(drawer)[direction]);
    const move_percentage = (drawer_current_pos + width) * 100 / width; // open the drawer if more than half of it is opend or on fast swipe.

    if (drawer_current_pos > -width / 2 && moving_direction !== direction || moving_time > time_min && moving_time < time_max && moving_direction !== direction && Math.abs(moving_distance) > input_distance) {
      // position the drawer on the open state.
      open_animation([drawer_current_pos, move_percentage / 100]);
    } else if (drawer_current_pos < -width / 2 && moving_direction === direction || moving_time > time_min && moving_time < time_max && moving_direction === direction && Math.abs(moving_distance) > input_distance) {
      // position the drawer on the close state.
      close_animation([drawer_current_pos, move_percentage / 100]); // if none of the above re-positoin the drawer on open or close state.
    } else {
      isOpen ? open_animation([drawer_current_pos, move_percentage / 100]) : close_animation([drawer_current_pos, move_percentage / 100]);
    } // remove on touch move event from the drawer element.


    drawer.removeEventListener('touchmove', drawer_handle_onTouchMove);
  }, [direction, width, drawer_handle_onTouchMove, open_animation, close_animation, isOpen]); // Shaded background touch inputs (only when the drawer is open)

  const shaded_onTouchStart = e => {
    // register first touch position on the x-axis to calculate swipe distance later (on touch end event).
    x.current = e.targetTouches[0].pageX; // register first touch position on the y-axis to calculate swipe distance to enable or disable scrolling later (on touch end event).

    y.current = e.targetTouches[0].pageY; // register first touch time to calculate swipe duration later (on touch end event).

    t.current = Date.now(); // add on touch move event listener to shaded background element.

    const shaded = document.getElementById('Drawer-Background');
    shaded.addEventListener('touchmove', shaded_onTouchMove);
  };

  const shaded_onTouchMove = (0, _react.useCallback)(e => {
    if (e.cancelable) e.preventDefault();
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background'); // the value that change drawer position (track)

    let move_width = direction === 'left' ? -width + e.targetTouches[0].pageX : -width + (window.innerWidth - e.targetTouches[0].pageX);
    move_width = Math.min(Math.max(move_width, -(width - handle_width)), 0); // change shaded background on drawer move.

    const move_percentage = (move_width + width) * 100 / width;
    if (background) background.style.opacity = move_percentage / 100; // make the drawer tracks the touch.

    drawer.style[direction] = move_width + 'px';
    set_siblings_style(move_width + width - handle_width);
  }, [direction, width, set_siblings_style, handle_width]);
  const shaded_onTouchEnd = (0, _react.useCallback)(e => {
    const shaded = document.getElementById('Drawer-Background');
    const drawer = document.getElementById('Drawer_Wrapper');
    const moving_distance = e.changedTouches[0].pageX - x.current;
    const moving_direction = moving_distance < 0 ? 'left' : 'right';
    const moving_time = Date.now() - t.current;
    const drawer_current_pos = parseInt(window.getComputedStyle(drawer)[direction]);
    const move_percentage = (drawer_current_pos + width) * 100 / width; // open the drawer if more than half of it is opend or on fast swipe.

    if (drawer_current_pos > -width / 2 && moving_direction !== direction || moving_time > time_min && moving_time < time_max && moving_direction !== direction && Math.abs(moving_distance) > input_distance) {
      // position the drawer on the open state.
      open_animation([drawer_current_pos, move_percentage / 100]);
    } else if (drawer_current_pos < -width / 2 && moving_direction === direction || moving_time > time_min && moving_time < time_max && moving_direction === direction && Math.abs(moving_distance) > input_distance) {
      close_animation([drawer_current_pos, move_percentage / 100]); // if none of the above re-positoin the drawer on open or close state.
    } else {
      isOpen ? open_animation([drawer_current_pos, move_percentage / 100]) : close_animation([drawer_current_pos, move_percentage / 100]);
    } // remove on touch move event from the drawer element.


    shaded.removeEventListener('touchmove', shaded_onTouchMove);
  }, [direction, width, shaded_onTouchMove, open_animation, close_animation, isOpen]);

  const wait = time => new Promise(e => setTimeout(e, time));

  const close = e => {
    e === null || e === void 0 ? void 0 : e.stopPropagation();
    close_animation([0, 1]);
  };

  const open = async () => {
    const background = document.getElementById('Drawer-Background');
    if (background) background.style.display = 'block';
    await wait(10);
    open_animation([-(width - handle_width), 0]);
  };

  const toggle = () => isOpen ? close() : open();

  (0, _react.useImperativeHandle)(ref, () => ({
    close,
    open,
    toggle
  }));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    id: "Drawer_Wrapper",
    style: _objectSpread({
      position: 'fixed',
      top: '0px',
      height: '100%',
      display: 'flex',
      willChange: 'left, right',
      zIndex,
      userSelect: 'none'
    }, direction === 'left' ? wrapper_style_left : wrapper_style_right),
    onDrag: e => e.preventDefault(),
    onMouseDown: enable_mouse_gestures ? drawer_handle_onMouseDown : null,
    onMouseUp: enable_mouse_gestures ? drawer_handle_onMouseUp : null,
    onTouchStart: enable_touch_gestures ? drawer_handle_onTouchStart : null,
    onTouchEnd: enable_touch_gestures ? drawer_handle_onTouchEnd : null
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: handle_width + 'px',
      backgroundColor: handle_background_color,
      height: '100%',
      touchAction: 'none'
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "Drawer_Container",
    className: enableSrollbarStyle ? 'enable_scrollbar_custom_style' : '',
    style: _objectSpread(_objectSpread({}, drawer_style), {}, {
      width: width - handle_width + 'px',
      height: '100%',
      padding: '0px',
      overflowX: 'hidden',
      overflowY: 'auto'
    })
  }, props.children)), use_shaded_background ? /*#__PURE__*/_react.default.createElement("div", {
    id: "Drawer-Background",
    style: {
      opacity: isOpen ? 1 : 0,
      backgroundColor: background_color,
      display: default_Status !== 'closed' ? 'block' : 'none',
      position: 'fixed',
      top: '0px',
      width: '100%',
      height: '100%',
      touchAction: 'none',
      zIndex: zIndex - 1
    },
    onClick: close,
    onTouchStart: isOpen ? shaded_onTouchStart : null,
    onTouchEnd: isOpen ? shaded_onTouchEnd : null
  }) : null);
});
var _default = Drawer;
exports.default = _default;