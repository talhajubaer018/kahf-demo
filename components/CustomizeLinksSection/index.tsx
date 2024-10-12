/* eslint-disable no-unsafe-optional-chaining */

'use client'

import React, { useEffect, useRef, useState } from "react";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "../ButtonComponent";

import PlatformSelectComponent from "./PlatformSelectComponent";
import IconComponent from "../IconComponent";
import { COLOR_GRAY } from "@/utils/colorUtils";


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
    const [focusedInputId, setFocusedInputId] = useState<string | null>(null);
    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    console.log("🚀 ~ CustomizeLinksSection ~ inputRefs:", inputRefs)

    useEffect(() => {
        if (focusedInputId && inputRefs.current[focusedInputId]) {
            inputRefs.current[focusedInputId]?.focus();
        }
    }, [props.linksArray, focusedInputId]);

    const onSubmit = (e: any) => {
        e?.preventDefault()
        console.log("🚀 ~ onSubmit ~ e:", e)

        localStorage.setItem('linksArray', JSON.stringify(props?.linksArray))
    }

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

    const removeItemFromList = (id: string) => {
        const updatedLinksArray = props?.linksArray?.filter(item => item?.id !== id);
        props?.setLinksArray(updatedLinksArray);
    }

    const SortableItem = ({ link, index }: { link: any, index: number }) => {
        const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link.id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        return (
            <div ref={setNodeRef} style={style} {...attributes} className="bg-gray-100 rounded-md p-4 cursor-default">
                <div className="flex items-center">
                    <div className="text-textGray font-bold mr-auto cursor-pointer" {...listeners}>
                        <span className="font-extralight mr-1 text-lg">=</span> Link #{index + 1}
                    </div>
                    {
                        props?.linksArray?.length > 0 ? (
                            <div onClick={() => removeItemFromList(link?.id)} className="ml-auto text-textGray text-sm">Remove</div>
                        ) : null
                    }
                </div>
                <div>
                    <PlatformSelectComponent
                        linksArray={props?.linksArray}
                        setLinksArray={props?.setLinksArray}
                        index={index}
                    />
                </div>
                <div className='mt-2'>
                    <div className='text-xs text-textGray mb-1'>Link</div>
                    <div className="relative">
                        <IconComponent name={"Link"} color={COLOR_GRAY} className="absolute top-[15px] left-3" fontSize={14} />
                        <input
                            name={`${link?.id}`}
                            // type="url"
                            // required
                            // pattern="^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$"
                            className='mt-0 w-full pl-8 p-2 border-[1px] border-[#cccccc] rounded-md linkInput focus:outline-primary'
                            ref={(el) => {
                                inputRefs.current[link.id] = el;
                            }}
                            placeholder='Link'
                            value={link?.link}
                            onFocus={() => setFocusedInputId(link.id)}
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
            <form onSubmit={onSubmit}>
                <section className="relative">

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
                    <div className="dividerLine"></div>
                </section>
                <Button className="mt-12 ml-auto text-xs" type="submit">Save</Button>
            </form>
        </section>
    );
}