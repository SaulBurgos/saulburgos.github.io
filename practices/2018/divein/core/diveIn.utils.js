function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4();
}

function loadDependencies(dependencies) {
  let dependenciesPromises = [];

  dependencies.forEach((element) => {
    if (element.type == 'css') {
      const linkElement = document.createElement('link');

      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('type', 'text/css');
      linkElement.setAttribute('href', element.url);

      document.querySelector('head').appendChild(linkElement);
    } else {
      //check this for future, I do not know if getscript is returning a promise
      dependenciesPromises.push(jQuery.getScript(element.url));
    }

  });

  return Promise.all(dependenciesPromises);
}

function loadTemplate(element, template) {
  return new Promise(resolve => {
    var request = new XMLHttpRequest();

    request.open('GET', template, true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var response = request.responseText;

        element.innerHTML = response;
        resolve();
      }
    };

    request.send();
  });
}

class EventObserver {
  constructor() {
    this.observers = {};
  }

  subscribe(nameEvt, fn) {
    if (!this.observers[nameEvt]) {
      this.observers[nameEvt] = [];
    }

    this.observers[nameEvt].push(fn);
  }

  unsubscribe(nameEvt, fn) {
    if (this.observers[nameEvt]) {
      this.observers[nameEvt] = this.observers[nameEvt].filter((subscriber) => subscriber !== fn);
    }
  }

  broadcast(nameEvt, data) {
    for (var key in this.observers) {
      if (nameEvt == key && this.observers[key]) {
        this.observers[key].forEach((subscriber) => subscriber(data));
      }
    }
  }
}

var Aggregation = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach((mixin) => {
        copyProps(this, (new mixin));
      });
    }
  }

  let copyProps = (target, source) => {  // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
          Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
      })
  }

  mixins.forEach((mixin) => { // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });

  return base;
}

export {
  guid,
  loadDependencies,
  loadTemplate,
  EventObserver,
  Aggregation
}
