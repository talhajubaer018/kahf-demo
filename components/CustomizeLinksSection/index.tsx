/* eslint-disable no-unsafe-optional-chaining */

'use client'

import React, { useEffect, useRef, useState } from "react";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "../ButtonComponent";

import PlatformSelectComponent from "./PlatformSelectComponent";
import { useRouter } from "next/navigation";
import LinkInputComponent from "./LinkInputComponent";


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
    const router = useRouter()
    // const linkValidator = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
    const linkValidator = /^[^\s/$.?#].[^\s]*\.[^\s]{2,}$/

    const [focusedInputId, setFocusedInputId] = useState<string | null>(null)
    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        if (focusedInputId && inputRefs.current[focusedInputId]) {
            inputRefs.current[focusedInputId]?.focus()
        }
    }, [props.linksArray, focusedInputId])

    const validateLinks = () => {
        const newErrors: { [key: string]: string } = {}
        props.linksArray.forEach(link => {
            if (!link.link) {
                newErrors[link.id] = "Link is required"
            } else if (!linkValidator.test(link.link)) {
                newErrors[link.id] = "Invalid URL"
            }
        })
        return newErrors;
    }

    const onSubmit = (e: any) => {
        e?.preventDefault()
        console.log("🚀 ~ onSubmit ~ e:", e)

        const newErrors = validateLinks();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        if (props?.linksArray?.length) {
            localStorage.setItem('linksArray', JSON.stringify(props?.linksArray))
            router.push('/profile')
        }
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
                    <div className="text-textGray font-bold mr-auto cursor-pointer hover:text-primary" {...listeners}>
                        <span className="font-extralight  mr-1 text-lg">=</span> Link #{index + 1}
                    </div>
                    {
                        props?.linksArray?.length > 0 ? (
                            <div onClick={() => removeItemFromList(link?.id)} className="cursor-pointer hover:text-primary ml-auto text-textGray text-sm">Remove</div>
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
                    <LinkInputComponent
                        link={link}
                        inputRefs={inputRefs}
                        setFocusedInputId={setFocusedInputId}
                        index={index}
                        linksArray={props?.linksArray}
                        setLinksArray={props?.setLinksArray}
                        errors={errors}
                    />
                </div>
            </div>
        )
    }

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
    )
}