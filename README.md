# ReactNotification

A delightful, easy to use and highly configurable component to help you notify your users out of the box. No messy setup, just beautiful notifications!

## Demo


## Features

* Touch support
* Responsive notifications
* Standard notification types
* Custom notification types
* Custom notification content
* Dismissable (touch, click, timeout)
* Customizable transitions
* Small library

## Getting started
```
npm install react-notifications-component
```
The step below is only for typescript developers to install typed bindings:
```
npm install --save-dev @types/react-notifications-component
```
### Development

First build the library
```
npm run build:library:dev
```
then run the webpack server to see the app running
```
npm run start
```

## Usage

###

Import <code>react-notifications-component</code>
```js
import ReactNotification from 'react-notifications-component'
```
Import the <code>CSS</code> theme
```js
import 'react-notifications-component/dist/theme.css'
```

##### SASS
<code>SASS</code> files are located in `react-notifications-component/dist/scss`

Render <code>react-notifications-component</code> at the top of your application so that it does not conflict with other absolutely positioned DOM elements.
```jsx
const App = () => {
  return (
    <div className="app-container">
      <ReactNotification />
      <Application />
    </div>
  )
};
```

Import <code>store</code> where needed - will be used to access `addNotification` and `removeNotification` API methods
```js
import { store } from 'react-notifications-component';
```

Then call `addNotification` and watch the magic happens

```jsx
store.addNotification({
  title: "Wonderful!",
  message: "teodosii@react-notifications-component",
  type: "success",
  insert: "top",
  container: "top-right",
  animationIn: ["animate__animated", "animate__fadeIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 5000,
    onScreen: true
  }
});
```

Voila!

**Note**: We rely on `animate.css` in this example as `animate__fadeIn` and `animate__fadeOut` are part of `animate.css`. We recommend using it as it's an excellent animation library, but you're not forced to. If you prefer you may also use your custom animations as long as they're valid CSS animations.

**Note**: `animate.css` latest version has breaking changes. Import `animate.css` by importing as
```js
import 'animate.css/animate.compat.css'
```

## API

`store.addNotification(options)`

Render a new notification. Method returns a unique id for the rendered notification. Supplied options are internally validated and an exception will be thrown if validation fails.

`store.removeNotification(id)`

Manually remove a notification by id.


## Examples

In the following examples for brevity some options will not be mentioned. Strictly focusing on the needed options to present each example. For reference, we will be using Object spread operator on a `notification` object to have non relevant fields included as well.

```js
notification = {
  title: "Wonderful!",
  message: "Configurable",
  type: "success",
  insert: "top",
  container: "top-right",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"]
};
```

#### Notification container

You have in total 6 containers for desktop and 2 for mobile, if component is set to be responsive. List of containers:

* `top-left`
* `top-right`
* `top-center`
* `center`
* `bottom-left`
* `bottom-right`
* `bottom-center`

```js
store.addNotification({
  ...notification,
  container: 'top-right'
})
```

Will position the notification in top right of the screen.

#### Notification type

List of types:

* `success`
* `danger`
* `info`
* `default`
* `warning`


```js
store.addNotification({
  ...notification,
  type: 'danger'
})
```

Will trigger a `danger` notification.

#### Animating
  
```js
store.addNotification({
  ...notification,
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut']
})
```

`animationIn` and `animationOut` rely on CSS classes that toggle animations. On github pages we rely on `animate.css`, we suggest you to import that package and use their animations as they have plenty.

**Note**: Failing to have animations set properly will lead to bugs in some causes, as `react-notifications-component` relies on `onAnimationEnd` event to know when an animation has finished.

#### Dismiss notification automatically after timeout expires

```js
store.addNotification({
  ...notification,
  dismiss: {
    duration: 2000
  }
})
```

#### Dismiss notification automatically with the time left shown on UI

```js
store.addNotification({
  ...notification,
  dismiss: {
    duration: 2000,
    onScreen: true
  }
})
```

#### Subscribe to notification's removal

Easily subscribe to `onRemoval` by supplying callback as option to the notification object. Callback will get called after the removal animation finishes.

```js
store.addNotification({
  ...notification,
  onRemoval: (id, removedBy) => {
    ...
  }
})
```

#### Pause notification's timeout by hovering

```js
store.addNotification({
  ...notification,
  dismiss: {
    duration: 2000,
    pauseOnHover: true
  }
})
```

#### Change transition

```js
store.addNotification({
  ...notification,
  slidingExit: {
    duration: 800,
    timingFunction: 'ease-out',
    delay: 0
  }
})
```

`slidingEnter`, `touchRevert` and `touchSlidingExit` can all be configured in the same way, with the mention that `touchSlidingExit` has 2 transitions nested.

```js
store.addNotification({
  ...notification,
  touchSlidingExit: {
    swipe: {
      duration: 400,
      timingFunction: 'ease-out',
      delay: 0,
    },
    fade: {
      duration: 400,
      timingFunction: 'ease-out',
      delay: 0
    }
  }
})
```


