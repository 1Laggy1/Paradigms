'use strict';

const createPoint = (x, y) => {
  const SIZE = Int32Array.BYTES_PER_ELEMENT * 2;
  const buffer = new SharedArrayBuffer(SIZE);
  const view = new Int32Array(buffer);
  Atomics.store(view, 0, x);
  Atomics.store(view, 1, y);
  Object.freeze(view);
  const move = (dx, dy) => {
    if (view.length < 2) throw new Error('Invalid view length');
    Atomics.add(view, 0, dx);
    Atomics.add(view, 1, dy);
  };
  const clone = () => {
    const x = Atomics.load(view, 0);
    const y = Atomics.load(view, 1);
    return createPoint(x, y);
  };
  const toString = () => {
    const x = Atomics.load(view, 0);
    const y = Atomics.load(view, 1);
    return `(${x}, ${y})`;
  };
  return { move, clone, toString };
};

// Usage

const p1 = createPoint(10, 20);
console.log(p1.toString());
const c1 = p1.clone();
c1.move(-5, 10);
console.log(c1.toString());
