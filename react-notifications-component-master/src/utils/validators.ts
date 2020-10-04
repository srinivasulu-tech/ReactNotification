import React from 'react';
import { iNotification, iNotificationCustomType } from 'src/types/Notification';
import { ERROR, NOTIFICATION_TYPE as NT } from 'src/utils/constants';

const isNull = (object: any) => object === null || object === undefined;
const isString = (object: any) => typeof object === 'string';
const isNumber = (object: any) => typeof object === 'number';
const isBoolean = (object: any) => typeof object === 'boolean';
const isFunction = (object: any) => !!(object && object.constructor && object.call && object.apply);
const isArray = (object: any) => !isNull(object) && object.constructor === Array;

function isClassComponent(component: any) {
  return typeof component === 'function' && component.prototype && !!component.prototype.isReactComponent;
}

function isFunctionComponent(component: any) {
  return typeof component === 'function';
}

const isReactElement = (value: any) => isFunctionComponent(value) || React.isValidElement(value);

export function validateTransition(notification: iNotification, transition: string) {
  const { TRANSITION_DURATION_NUMBER, TRANSITION_TIMING_FUNCTION, TRANSITION_DELAY_NUMBER } = ERROR;
  const { duration, timingFunction, delay } = notification[transition] || {};

  if (!isNull(duration) && !isNumber(duration)) {
    throw new Error(TRANSITION_DURATION_NUMBER.replace('transition', transition));
  }
  if (!isNull(timingFunction) && !isString(timingFunction)) {
    throw new Error(TRANSITION_TIMING_FUNCTION.replace('transition', transition));
  }
  if (!isNull(delay) && !isNumber(delay)) {
    throw new Error(TRANSITION_DELAY_NUMBER.replace('transition', transition));
  }
}

export const validators = [
  function title({ content, title }: iNotification) {
    if (content) {
      return;
    }
    if (isNull(title)) {
      return;
    }

    const isReactEl = isReactElement(title);
    if (isReactEl || typeof title === 'string') {
      return;
    }
    if (!isReactEl) {
      throw new Error(ERROR.TITLE_ELEMENT);
    }
    if (typeof title !== 'string') {
      throw new Error(ERROR.TITLE_STRING);
    }
  },

  function message({ content, message }: iNotification) {
    if (content) {
      return;
    }

    if (!message) {
      throw new Error(ERROR.MESSAGE_REQUIRED);
    }

    const isReactEl = isReactElement(message);
    if (isString(message) || isReactEl) {
      return;
    }
    if (!isString(message)) {
      throw new Error(ERROR.MESSAGE_STRING);
    }
    if (!isReactEl) {
      throw new Error(ERROR.MESSAGE_ELEMENT);
    }
  },

  function type({ content, type }: iNotification, userDefinedTypes: iNotificationCustomType[]) {
    if (content) {
      return;
    }
    if (!type) {
      throw new Error(ERROR.TYPE_REQUIRED);
    }
    if (!isString(type)) {
      throw new Error(ERROR.TYPE_STRING);
    }

    if (
      !userDefinedTypes &&
      type !== NT.SUCCESS &&
      type !== NT.DANGER &&
      type !== NT.INFO &&
      type !== NT.DEFAULT &&
      type !== NT.WARNING
    ) {
      throw new Error(ERROR.TYPE_NOT_EXISTENT);
    }
  },

  function container({ container }: iNotification) {
    if (isNull(container)) {
      throw new Error(ERROR.CONTAINER_REQUIRED);
    }
    if (!isString(container)) {
      throw new Error(ERROR.CONTAINER_STRING);
    }
  },

  function insert({ insert }: iNotification) {
    if (isNull(insert)) {
      return;
    }
    if (!isString(insert)) {
      throw new Error(ERROR.INSERT_STRING);
    }
  },

  function width({ width }: iNotification) {
    if (isNull(width)) {
      return;
    }
    if (!isNumber(width)) {
      throw new Error(ERROR.WIDTH_NUMBER);
    }
  },

  function userDefinedTypes(
    { type, content }: iNotification,
    userDefinedTypes: iNotificationCustomType[]
  ) {
    if (content) {
      return;
    }

    if (
      type === NT.SUCCESS ||
      type === NT.DANGER ||
      type === NT.INFO ||
      type === NT.DEFAULT ||
      type === NT.WARNING ||
      !userDefinedTypes
    ) {
      return;
    }

    if (!userDefinedTypes.find((p) => p.name === type)) {
      throw new Error(ERROR.TYPE_NOT_FOUND);
    }
  },

  function content({ content }: iNotification) {
    if (!content) {
      return;
    }
    const isClass = isClassComponent(content);
    const isFunction = isFunctionComponent(content);
    const isElem = React.isValidElement(content);
    if (!isClass && !isFunction && !isElem) {
      throw new Error(ERROR.CONTENT_INVALID);
    }
  },

  function animationIn({ animationIn }: iNotification) {
    if (isNull(animationIn)) {
      return;
    }
    if (!isArray(animationIn)) {
      throw new Error(ERROR.ANIMATION_IN);
    }
  },

  function animationOut({ animationOut }: iNotification) {
    if (isNull(animationOut)) {
      return;
    }
    if (!isArray(animationOut)) {
      throw new Error(ERROR.ANIMATION_OUT);
    }
  },

  function onRemoval({ onRemoval }: iNotification) {
    if (!onRemoval) {
      return;
    }
    if (!isFunction(onRemoval)) {
      throw new Error(ERROR.REMOVAL_FUNC);
    }
  },

  function dismiss({ dismiss }: iNotification) {
    if (!dismiss) {
      return;
    }

    const {
      duration,
      onScreen,
      showIcon,
      pauseOnHover,
      waitForAnimation: wait,
      click,
      touch
    } = dismiss;

    if (isNull(duration)) {
      throw new Error(ERROR.DISMISS_REQUIRED);
    }
    if (!isNumber(duration)) {
      throw new Error(ERROR.DISMISS_NUMBER);
    }
    if (duration < 0) {
      throw new Error(ERROR.DISMISS_POSITIVE);
    }
    if (!isNull(onScreen) && !isBoolean(onScreen)) {
      throw new Error(ERROR.DISMISS_ONSCREEN_BOOL);
    }
    if (!isNull(pauseOnHover) && !isBoolean(pauseOnHover)) {
      throw new Error(ERROR.DISMISS_PAUSE_BOOL);
    }
    if (!isNull(click) && !isBoolean(click)) {
      throw new Error(ERROR.DISMISS_CLICK_BOOL);
    }
    if (!isNull(touch) && !isBoolean(touch)) {
      throw new Error(ERROR.DISMISS_TOUCH_BOOL);
    }
    if (!isNull(showIcon) && !isBoolean(showIcon)) {
      throw new Error(ERROR.DISMISS_ICON);
    }
    if (!isNull(wait) && !isBoolean(wait)) {
      throw new Error(ERROR.DISMISS_WAIT);
    }
  }
];
