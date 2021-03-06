const AH = require('async_hooks');

const namespaces = new Map;

module.exports = class Namespace {
  constructor(name = 'default') {
    if (namespaces.has(name)) return namespaces.get(name);

    this.name = name;
    this.maps = new Map;
    this.hook = AH.createHook({
      init: this._init.bind(this),
      destroy: this._destroy.bind(this),
    });

    this.hook.enable();
    namespaces.set(name, this);
  }

  get map() {
    return this.maps.get(AH.executionAsyncId());
  }

  get(key) {
    const map = this.maps.get(AH.executionAsyncId());

    if(map) return map.get(key);
  }

  set(key, value) {
    const id = AH.executionAsyncId();

    const map = this.maps.get(id);
    if (this.maps.size === 0) this.hook.enable();

    if (map) map.set(key, value);
    else this.maps.set(id, new Map([ [key, value] ]))

    return value;
  }


  keys() {
    const map = this.maps.get(AH.executionAsyncId());

    if (map) return map.keys();
    else return new Map().keys();
  }

  values() {
    const map = this.maps.get(AH.executionAsyncId());

    if (map) return map.values();
    else return new Map().values();
  }

  entries() {
    const map = this.maps.get(AH.executionAsyncId());

    if (map) return map.entries();
    else return new Map().entries();
  }

  clear() {
    const map = this.maps.get(AH.executionAsyncId());

    if (map) return map.clear();
  }

  delete(key) {
    const map = this.maps.get(AH.executionAsyncId());
    
    return map ? map.delete(key) : false;
  }


  destroy() {
    this.maps.clear();
    this.hook.disable();
    namespaces.delete(this.name);
  }

  _init(id, type, trigger) {
    if (this.maps.has(trigger)) this.maps.set(id, this.maps.get(trigger));
  }

  _destroy(id) {
    this.maps.delete(id);
    if (this.maps.size === 0) this.hook.disable();
  }

  static for(name) {
    if (namespaces.has(name)) return namespaces.get(name);
    else {
      const namespace = new Namespace(name);
      namespaces.set(name, namespace);
      return namespace;
    }
  }
}
