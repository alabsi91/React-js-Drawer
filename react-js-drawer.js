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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let x, y, t, isSwipe;
document.body.style.overscrollBehaviorX = 'none';
document.body.style.margin = '0px';
const Drawer = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  var _props$handleWidth, _props$width, _props$duration, _props$enableMouseGes, _props$enableTouchGes;

  const direction = props.direction || 'left';
  const default_Status = props.defaultStatus || 'closed';
  const handle_width = (_props$handleWidth = props.handleWidth) !== null && _props$handleWidth !== void 0 ? _props$handleWidth : 10;
  const handle_background_color = props.handleBackgroundColor || 'initial';
  const width = ((_props$width = props.width) !== null && _props$width !== void 0 ? _props$width : 300) + handle_width;
  const duration = (_props$duration = props.duration) !== null && _props$duration !== void 0 ? _props$duration : 200;
  const ease = props.ease || 'ease-out';
  const enable_mouse_gestures = (_props$enableMouseGes = props.enableMouseGestures) !== null && _props$enableMouseGes !== void 0 ? _props$enableMouseGes : true;
  const enable_touch_gestures = (_props$enableTouchGes = props.enableTouchGestures) !== null && _props$enableTouchGes !== void 0 ? _props$enableTouchGes : true;
  const background_color = props.backgroundColor || 'rgba(0,0,0,0.5)';
  const on_open = props.onOpen;
  const on_close = props.onClose;
  const drawer_style = props.drawerStyle || {
    backgroundImage: 'linear-gradient(180deg, #e0ecfc 7%, #bcbcdd 100%)',
    boxShadow: '0 2px 30px 0 rgb(31 38 103 / 20%)'
  }; // drawer style when it's on the left side

  const wrapper_style_left = {
    left: default_Status === 'closed' ? -(width - handle_width) + 'px' : '0px',
    width: width + 'px',
    flexDirection: 'row-reverse'
  }; // drawer style when it's on the right side

  const wrapper_style_right = {
    right: default_Status === 'closed' ? -(width - handle_width) + 'px' : '0px',
    width: width + 'px'
  }; // input duration and distance settings to determine fast swipe

  const time_min = 75;
  const time_max = 300;
  const input_distance = 30;
  const [useAnimation, setUseAnimation] = (0, _react.useState)(true);
  const [isOpen, setIsOpen] = (0, _react.useState)(default_Status !== 'closed'); // Mouse inputs

  const drawer_handle_onMove = (0, _react.useCallback)(e => {
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background');
    background.style.display = 'block'; // used to cancel mouse onMove event if mouse pointer exceeded the drawer element while swiping.

    const drawer_current_pos = drawer.getBoundingClientRect()[direction === 'left' ? 'right' : 'left'];
    const scroll_width = window.innerWidth - document.body.scrollWidth; // the value that change drawer position (track)

    let move_width = direction === 'left' ? -(width - handle_width / 2) + e.clientX + (isOpen ? width - handle_width / 2 - x : 0) : -(width - handle_width / 2) + (window.innerWidth - e.clientX) + (isOpen ? width - handle_width / 2 - (window.innerWidth - x) : -scroll_width);
    move_width = move_width >= 0 ? 0 : move_width;
    drawer.style[direction] = move_width + 'px';
    const move_percentage = (move_width + width) * 100 / width;
    background.style.opacity = move_percentage / 100; // cancel mouse onMove event if mouse pointer exceeded the drawer element

    if (direction === 'right') {
      if (e.clientX <= drawer_current_pos) drawer_handle_onMouseUp(e);
    } else {
      if (e.clientX >= drawer_current_pos - 1) drawer_handle_onMouseUp(e);
    }
  }, [handle_width, direction, width, isOpen]);

  const drawer_handle_onMouseDown = e => {
    // cancel transition animation.
    setUseAnimation(false); // register first click position to calculate swipe distance later (on mouse up event).

    x = e.clientX; // register first click time to calculate swipe duration later (on mouse up event).

    t = Date.now(); // add on mouse move event listener to the drawer element.

    const drawer = document.getElementById('Drawer_Wrapper');
    drawer.addEventListener('mousemove', drawer_handle_onMove);
  };

  const drawer_handle_onMouseUp = (0, _react.useCallback)(e => {
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background');
    const moving_distance = e.clientX - x;
    const moving_direction = moving_distance < 0 ? 'left' : 'right';
    const moving_time = Date.now() - t; // re-enable tranistion animation

    setUseAnimation(true);
    const drawer_current_pos = parseInt(window.getComputedStyle(drawer)[direction]); // hide the shaded background if swipe failed to open the drawer.

    if (Math.abs(moving_distance) <= 1 && !isOpen) background.style.display = 'none'; // open the drawer if more than half of it is opend or on fast swipe.

    if (drawer_current_pos > -width / 2 && moving_direction !== direction || moving_time > time_min && moving_time < time_max && moving_direction !== direction && Math.abs(moving_distance) > input_distance) {
      // position the drawer on the open state.
      drawer.style[direction] = '0px'; // the shaded background

      background.style.opacity = 1; // props callback

      on_open === null || on_open === void 0 ? void 0 : on_open();
      setIsOpen(true); // close the drawer if more than half of it is closed or on fast swipe.
    } else if (drawer_current_pos < -width / 2 && moving_direction === direction || moving_time > time_min && moving_time < time_max && moving_direction === direction && Math.abs(moving_distance) > input_distance) {
      // position the drawer on the close state.
      drawer.style[direction] = -(width - handle_width) + 'px'; // the shaded background

      background.style.opacity = 0; // props callback

      on_close === null || on_close === void 0 ? void 0 : on_close();
      setIsOpen(false); // if none of the above re-positoin the drawer on open or close state.
    } else {
      drawer.style[direction] = isOpen ? '0px' : -(width - handle_width) + 'px';
      background.style.opacity = isOpen ? 1 : 0;
    } // remove on mouse move event from the drawer element.


    drawer.removeEventListener('mousemove', drawer_handle_onMove);
  }, [drawer_handle_onMove, width, direction, handle_width, isOpen, on_open, on_close]); // Touch inputs

  const drawer_handle_onTouchStart = e => {
    // cancel transition animation.
    setUseAnimation(false); // register first touch position on the x-axis to calculate swipe distance later (on touch end event).

    x = e.targetTouches[0].pageX; // register first touch position on the y-axis to calculate swipe distance to enable or disable scrolling later (on touch end event).

    y = e.targetTouches[0].pageY; // register first touch time to calculate swipe duration later (on touch end event).

    t = Date.now(); // add on touch move event listener to the drawer element.

    const drawer = document.getElementById('Drawer_Wrapper');
    drawer.addEventListener('touchmove', drawer_handle_onTouchMove);
  };

  const drawer_handle_onTouchMove = (0, _react.useCallback)(e => {
    if (e.cancelable) e.preventDefault();
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background');
    background.style.display = 'block';
    const horizontal_distance = Math.abs(e.changedTouches[0].pageX - x);
    const verical_destance = Math.abs(e.changedTouches[0].pageY - y);
    isSwipe = isSwipe === true ? true : horizontal_distance > 10; // cancel touch move event if user is scrolling inside the drawer.

    if (verical_destance > 10 && !isSwipe && isOpen) {
      drawer.style[direction] = '0px';
      drawer.removeEventListener('touchmove', drawer_handle_onTouchMove);
      return;
    } // the value that change drawer position (track)


    let move_width = direction === 'left' ? -(width - handle_width) + e.targetTouches[0].pageX + (isOpen ? width + handle_width - x : -handle_width) : -(width + handle_width) + (window.innerWidth - e.targetTouches[0].pageX) + (isOpen ? width + handle_width - (window.innerWidth - x) : handle_width);
    move_width = move_width >= 0 ? 0 : move_width; // change shaded background on drawer move.

    const move_percentage = (move_width + width) * 100 / width;
    background.style.opacity = move_percentage / 100; // make the drawer tracks the touch.

    drawer.style[direction] = move_width + 'px';
  }, [handle_width, direction, width, isOpen]);
  const drawer_handle_onTouchEnd = (0, _react.useCallback)(e => {
    isSwipe = null;
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background');
    const moving_distance = e.changedTouches[0].pageX - x;
    const moving_direction = moving_distance < 0 ? 'left' : 'right';
    const moving_time = Date.now() - t; // re-enable tranistion animation

    setUseAnimation(true);
    const drawer_current_pos = parseInt(window.getComputedStyle(drawer)[direction]); // open the drawer if more than half of it is opend or on fast swipe.

    if (drawer_current_pos > -width / 2 && moving_direction !== direction || moving_time > time_min && moving_time < time_max && moving_direction !== direction && Math.abs(moving_distance) > input_distance) {
      // position the drawer on the open state.
      drawer.style[direction] = '0px'; // the shaded background

      background.style.opacity = 1; // props callback

      on_open === null || on_open === void 0 ? void 0 : on_open();
      setIsOpen(true);
    } else if (drawer_current_pos < -width / 2 && moving_direction === direction || moving_time > time_min && moving_time < time_max && moving_direction === direction && Math.abs(moving_distance) > input_distance) {
      // position the drawer on the close state.
      drawer.style[direction] = -(width - handle_width) + 'px'; // the shaded background

      background.style.opacity = 0; // props callback

      on_close === null || on_close === void 0 ? void 0 : on_close();
      setIsOpen(false); // if none of the above re-positoin the drawer on open or close state.
    } else {
      drawer.style[direction] = isOpen ? '0px' : -(width - handle_width) + 'px';
      background.style.opacity = isOpen ? 1 : 0;
    } // remove on touch move event from the drawer element.


    drawer.removeEventListener('touchmove', drawer_handle_onTouchMove);
  }, [drawer_handle_onTouchMove, width, direction, handle_width, isOpen, on_open, on_close]); // Shaded background touch inputs (only when the drawer is open)

  const shaded_onTouchStart = e => {
    // cancel transition animation.
    setUseAnimation(false); // register first touch position on the x-axis to calculate swipe distance later (on touch end event).

    x = e.targetTouches[0].pageX; // register first touch position on the y-axis to calculate swipe distance to enable or disable scrolling later (on touch end event).

    y = e.targetTouches[0].pageY; // register first touch time to calculate swipe duration later (on touch end event).

    t = Date.now(); // add on touch move event listener to the drawer element.

    const shaded = document.getElementById('Drawer-Background');
    shaded.addEventListener('touchmove', shaded_onTouchMove);
  };

  const shaded_onTouchMove = (0, _react.useCallback)(e => {
    if (e.cancelable) e.preventDefault();
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background'); // the value that change drawer position (track)

    let move_width = direction === 'left' ? -width + e.targetTouches[0].pageX : -width + (window.innerWidth - e.targetTouches[0].pageX);
    move_width = move_width >= 0 ? 0 : move_width; // change shaded background on drawer move.

    const move_percentage = (move_width + width) * 100 / width;
    background.style.opacity = move_percentage / 100; // make the drawer tracks the touch.

    drawer.style[direction] = move_width + 'px';
  }, [direction, width]);
  const shaded_onTouchEnd = (0, _react.useCallback)(e => {
    const shaded = document.getElementById('Drawer-Background');
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background');
    const moving_distance = e.changedTouches[0].pageX - x;
    const moving_direction = moving_distance < 0 ? 'left' : 'right';
    const moving_time = Date.now() - t; // re-enable tranistion animation

    setUseAnimation(true);
    const drawer_current_pos = parseInt(window.getComputedStyle(drawer)[direction]); // open the drawer if more than half of it is opend or on fast swipe.

    if (drawer_current_pos > -width / 2 && moving_direction !== direction || moving_time > time_min && moving_time < time_max && moving_direction !== direction && Math.abs(moving_distance) > input_distance) {
      // position the drawer on the open state.
      drawer.style[direction] = '0px'; // the shaded background

      background.style.opacity = 1; // props callback

      on_open === null || on_open === void 0 ? void 0 : on_open();
      setIsOpen(true);
    } else if (drawer_current_pos < -width / 2 && moving_direction === direction || moving_time > time_min && moving_time < time_max && moving_direction === direction && Math.abs(moving_distance) > input_distance) {
      // position the drawer on the close state.
      drawer.style[direction] = -(width - handle_width) + 'px'; // the shaded background

      background.style.opacity = 0; // props callback

      on_close === null || on_close === void 0 ? void 0 : on_close();
      setIsOpen(false); // if none of the above re-positoin the drawer on open or close state.
    } else {
      drawer.style[direction] = isOpen ? '0px' : -(width - handle_width) + 'px';
      background.style.opacity = isOpen ? 1 : 0;
    } // remove on touch move event from the drawer element.


    shaded.removeEventListener('touchmove', shaded_onTouchMove);
  }, [shaded_onTouchMove, width, direction, handle_width, isOpen, on_open, on_close]); // Methods that used with ref

  const wait = time => new Promise(e => setTimeout(e, time));

  const close = e => {
    e === null || e === void 0 ? void 0 : e.stopPropagation();
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background');
    drawer.style[direction] = -(width - handle_width) + 'px';
    background.style.opacity = 0;
    on_close === null || on_close === void 0 ? void 0 : on_close();
    setIsOpen(false);
  };

  const open = async () => {
    const drawer = document.getElementById('Drawer_Wrapper');
    const background = document.getElementById('Drawer-Background');
    drawer.style[direction] = '0px';
    background.style.display = 'block';
    await wait(10);
    background.style.opacity = 1;
    on_open === null || on_open === void 0 ? void 0 : on_open();
    setIsOpen(true);
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
      transitionDuration: (useAnimation ? duration : 0) + 'ms',
      transitionTimingFunction: ease,
      transitionProperty: direction + ''
    }, direction === 'left' ? wrapper_style_left : wrapper_style_right),
    onDrag: e => e.preventDefault(),
    onMouseDown: enable_mouse_gestures ? drawer_handle_onMouseDown : null,
    onMouseUp: enable_mouse_gestures ? drawer_handle_onMouseUp : null,
    onTouchStart: enable_touch_gestures ? drawer_handle_onTouchStart : null,
    onTouchEnd: enable_touch_gestures ? drawer_handle_onTouchEnd : null
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "Drawer_handle",
    style: {
      width: handle_width + 'px',
      backgroundColor: handle_background_color
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "Drawer_Container",
    style: _objectSpread(_objectSpread({}, drawer_style), {}, {
      width: width - handle_width + 'px'
    })
  }, props.children)), /*#__PURE__*/_react.default.createElement("div", {
    id: "Drawer-Background",
    style: {
      opacity: isOpen ? 1 : 0,
      transitionDuration: (useAnimation ? duration || 200 : 0) + 'ms',
      transitionProperty: 'opacity',
      backgroundColor: background_color,
      display: default_Status !== 'closed' ? 'block' : 'none'
    },
    onTransitionEnd: e => e.target.style.display = isOpen ? 'block' : 'none',
    onClick: close,
    onTouchStart: isOpen ? shaded_onTouchStart : null,
    onTouchEnd: isOpen ? shaded_onTouchEnd : null
  }));
});
var _default = Drawer;
exports.default = _default;