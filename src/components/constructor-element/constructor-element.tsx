import React, { useRef, FC } from 'react';
import style from './constructor-element.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";
import type { Identifier, XYCoord } from 'dnd-core'
//import type { , DropResult, DraggableLocation } from 'react-beautiful-dnd';

interface IConstructorElementBox {
    type: "top" | "bottom" | undefined;
    isLocked: boolean;
    text: string;
    price: number;
    imgUrl: string;
    handleClose?: (() => void) | undefined;
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
    index?: number;
}

interface DragItem {
    index: number
    id: string
    type: string
}

const ConstructorElementBox: FC<IConstructorElementBox> = ({ type, isLocked, text, price, imgUrl, handleClose, moveCard, index }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<DragItem,
        unknown,
        { handlerId: Identifier | null }>({
        accept: type ? type : "middle",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!index || !item) return;
            if (type !== undefined) return;

            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            if (moveCard) moveCard(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
        })
    const [{ isDragging }, drag] = useDrag({
        type: type ? type : "middle",
        item: () => {
            return { index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))


    return (
        <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId} className={`pb-4 ${type} ${style.constructorElementBox}`}>
            <div className={`pr-2 ${isLocked && style.dragIcon}`}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={`${text} ${type === "top" ? "(верх)" : type === "bottom" ? "(низ)" : ""}`}
                price={price}
                thumbnail={imgUrl}
                handleClose={handleClose}
            />            
        </div>
    );
}

export default ConstructorElementBox;


