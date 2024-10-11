/* eslint-disable no-unsafe-optional-chaining */

'use client'

import React, { useState } from "react";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "../ButtonComponent";

import PlatformSelectComponent from "./PlatformSelectComponent";


type PropsType = {
    linksArray: {
        id: string;
        value: 'github' | 'youtube' | 'linkedIn' | '';
        label: string;
        platform: string;
        link: string;
    }[]
    setLinksArray: React.Dispatch<React.SetStateAction<{
        id: string;
        value: 'github' | 'youtube' | 'linkedIn' | '';
        label: string;
        platform: string;
        link: string;
    }[]>>
}

export default function CustomizeLinksSection(props: PropsType) {

    console.log("🚀 ~ CustomizeLinksSection ~ linksArray:", props?.linksArray)

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = props?.linksArray.findIndex(link => link.id === active.id);
            const newIndex = props?.linksArray.findIndex(link => link.id === over.id);
            props?.setLinksArray(arrayMove(props?.linksArray, oldIndex, newIndex));
        }
    }




    const addNewLinkItem = () => {
        props?.setLinksArray((prevState) => (
            [...prevState,
            { id: uuidv4(), value: '', label: '', platform: '', link: '' }
            ]
        ))
    }

    const removeItemFromList = (index: number) => {
    }





    const SortableItem = ({ link, index }: { link: any, index: number }) => {
        const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link.id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        return (
            <div ref={setNodeRef} style={style} {...attributes} className="bg-gray-100 rounded-md p-4">
                <div className="flex items-center">
                    <div className="text-textGray font-bold mr-auto" {...listeners}>
                        <span className="font-extralight mr-1 text-lg">=</span> Link #{index + 1}
                    </div>
                    {
                        props?.linksArray?.length > 0 ?
                            <div onClick={() => removeItemFromList(index)} className="ml-auto text-textGray text-sm">Remove</div> : null
                    }
                </div>
                <div>
                    <PlatformSelectComponent
                        linksArray={props?.linksArray}
                        setLinksArray={props?.setLinksArray}
                        index={index}
                    />
                </div>
                <div>
                    <div>Link</div>
                    <input
                        placeholder='Link'
                        value={link?.link}
                        onChange={(e) => {
                            const updatedArray = [...props?.linksArray];
                            updatedArray[index] = {
                                ...updatedArray[index],
                                link: e?.target?.value
                            };
                            props?.setLinksArray(updatedArray);
                        }}
                    />
                </div>
            </div>
        );
    };


    return (
        <section className="px-8 py-12 bg-white rounded-md">
            <h2 className="text-2xl font-bold">Customize your links</h2>
            <h4 className="text-md mt-2 text-gray-400">Add/edit/remove links below and then share all your profiles with the world!</h4>
            <Button
                onClick={addNewLinkItem}
                variant={'outline'}
                className="text-primary mt-8 font-bold w-full"
            >
                + Add new link
            </Button>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={props?.linksArray} strategy={verticalListSortingStrategy}>
                    <div className="flex flex-col gap-4 mt-4">
                        {
                            props?.linksArray.map((link, index) => (
                                <SortableItem key={link.id} link={link} index={index} />
                            ))
                        }
                    </div>
                </SortableContext>
            </DndContext>
        </section>
    );
}
