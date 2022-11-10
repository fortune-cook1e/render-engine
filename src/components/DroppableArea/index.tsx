import React from 'react';
import { Draggable, Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';

import EngineComponentMap from '../EngineComponentMap';

import styles from './index.module.less';

import { useEngineContext } from '@/context';
import { EngineComponentData, EngineComponentType } from '@/types';

const ENGINE_DROP_ID = 'engine';

const DroppableArea = (): JSX.Element => {
  const { eventEmitter, globalEngine } = useEngineContext();

  const engineRenderData = globalEngine.getEngineData();
  const { style: pageStyle } = globalEngine.getEnginePageConfig();

  const onDragStart = () => {};

  const onDragEnd = (result: DropResult) => {
    const engineData = globalEngine.getEngineData();
    const { draggableId, destination, source } = result;
    const dragItem = engineData.find(c => c.uniqueId === draggableId);
    if (!destination || !dragItem || !source) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const { index: destIndex } = destination;
    const { index: sourceIndex } = source;
    const newCmps: EngineComponentData[] = JSON.parse(JSON.stringify(engineData));
    // 先插入后删除旧数据
    // 插入待加入
    newCmps.splice(sourceIndex, 1);
    newCmps.splice(destIndex, 0, dragItem);
    globalEngine.updateCmps(newCmps);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId={ENGINE_DROP_ID}>
        {dropProvided => (
          <div
            ref={dropProvided.innerRef}
            className={styles.engine__core}
            style={pageStyle}
            {...dropProvided.droppableProps}
          >
            {engineRenderData.map((c: EngineComponentData, cIndex: number) => {
              return (
                <Draggable
                  isDragDisabled={c.cmpType === EngineComponentType.Page}
                  key={c.uniqueId}
                  draggableId={c.uniqueId}
                  index={cIndex}
                >
                  {dragProvided => (
                    <div
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      ref={dragProvided.innerRef}
                    >
                      <EngineComponentMap canvasCmpData={c} />
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DroppableArea;
