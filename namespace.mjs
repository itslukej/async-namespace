import AH from 'async_hooks';

export default class Namespace {
  constructor() {
    this.maps = new Map;
    this.hook = AH.createHook({
      init: this._init.bind(this),
      destroy: this._destroy.bind(this),
    });

    this.hook.enable();
  }

  get map() {
    return this.maps.get(AH.executionAsyncId());
  }

  get(key) {
    return this.maps.get(AH.executionAsyncId())?.get(key);
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
    return this.maps.get(AH.executionAsyncId())?.clear();
  }

  delete(key) {
    return this.maps.get(AH.executionAsyncId())?.delete(key);
  }


  destroy() {
    this.maps.clear();
    this.hook.disable();
  }

  _init(id, type, trigger) {
    if (this.maps.has(trigger)) this.maps.set(id, this.maps.get(trigger));
  }

  _destroy(id) {
    this.maps.delete(id);
    if (this.maps.size === 0) this.hook.disable();
  }
}
