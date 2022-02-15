
import './App.css';
import * as React from "react";
import Selecto from "react-selecto";
import Moveable from "react-moveable";


export default function App() {
  const [targets, setTargets] = React.useState([]);
  const [frameMap] = React.useState(() => new Map());
  const moveableRef = React.useRef(null);
  const selectoRef = React.useRef(null);
  const cubes = [];

  for (let i = 0; i < 30; ++i) {
    cubes.push(i);
  }

  return <div className="moveable app">
    <div className="container">
      <Moveable
        ref={moveableRef}
        draggable={true}
        target={targets}
        onClickGroup={e => {
          selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
        }}
        onDragStart={e => {
          const target = e.target;

          if (!frameMap.has(target)) {
            frameMap.set(target, {
              translate: [0, 0],
              rotate:0,
            });
          }
          const frame = frameMap.get(target);

          e.set(frame.translate);
        }}
        onDrag={e => {
          const target = e.target;
          const frame = frameMap.get(target);

          frame.translate = e.beforeTranslate;
          target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`;
        }}
        onDragGroupStart={e => {
          e.events.forEach(ev => {
            const target = ev.target;

            if (!frameMap.has(target)) {
              frameMap.set(target, {
                translate: [0, 0],
                rotate:0,
              });
            }
            const frame = frameMap.get(target);

            ev.set(frame.translate);
          });
        }}
        onDragGroup={e => {
          e.events.forEach(ev => {
            const target = ev.target;
            const frame = frameMap.get(target);

            frame.translate = ev.beforeTranslate;
            target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`;
          });
        }}
        resizable={true}
        throttleResize={0}
        keepRatio={true}
        onResizeStart={({ target, set, setOrigin, dragStart }) => {
          // Set origin if transform-origin use %.
          const frame = frameMap.get(target);
          console.log(frame)
          setOrigin(["%", "%"]);

          // If cssSize and offsetSize are different, set cssSize. (no box-sizing)
          const style = window.getComputedStyle(target);
          const cssWidth = parseFloat(style.width);
          const cssHeight = parseFloat(style.height);
          set([cssWidth, cssHeight]);

          // If a drag event has already occurred, there is no dragStart.
          dragStart && dragStart.set(frame.translate);
        }}
        onResize={({ target, width, height, drag }) => {
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
          const frame = frameMap.get(target);
          // get drag event
          frame.translate = drag.beforeTranslate;
          target.style.transform
            = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px) rotate(${frame.rotate}deg) `;
        }}
        onResizeEnd={({ target, isDrag, clientX, clientY }) => {
          console.log("onResizeEnd", target, isDrag);
        }}
        rotatable={true}
        throttleRotate={0}
        rotationPosition="top"
        onRotateStart={({ set, target }) => {
          const frame = frameMap.get(target);
          set(frame.rotate);
          console.log(frame)
        }}
        onRotate={({ target, beforeRotate, drag }) => {
          const frame = frameMap.get(target);
          frame.rotate = beforeRotate;
          target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px) rotate(${beforeRotate}deg) `;
        }}
      ></Moveable>
      <Selecto
        ref={selectoRef}
        dragContainer={".elements"}
        selectableTargets={[".selecto-area .cube"]}
        hitRate={0}
        selectByClick={true}
        selectFromInside={false}
        toggleContinueSelect={["shift"]}
        ratio={0}
        onDragStart={e => {
          const moveable = moveableRef.current;
          const target = e.inputEvent.target;
          if (
            moveable.isMoveableElement(target)
            || targets.some(t => t === target || t.contains(target))
          ) {
            e.stop();
          }
        }}
        onSelectEnd={e => {
          const moveable = moveableRef.current;
          setTargets(e.selected);

          if (e.isDragStart) {
            e.inputEvent.preventDefault();

            setTimeout(() => {
              moveable.dragStart(e.inputEvent);
            });
          }
        }}
      ></Selecto>

      <div className="elements selecto-area">
        {cubes.map(i => <div className="cube target" key={i}></div>)}
      </div>
      <div className="elements">

      </div>
    </div>
  </div>;
}
