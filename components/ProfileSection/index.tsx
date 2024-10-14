import React from 'react'

import UploadPictureSection from './UploadPictureSection'
import { cn } from '@/utils/tailwind-merge';
import { useFormHook } from '@/utils/form-zod';
import { createProfileSchema } from '@/ZodSchemas/profileSchema';
import { FieldValues } from 'react-hook-form';
import InputFieldComponent from '../InputFieldComponent';
import { Button } from '../ButtonComponent';

type PropsType = {
    imagePreview: string | null
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>

    profileDetails: {
        firstName: string;
        lastName: string;
        email: string;
    }
    setProfileDetails: React.Dispatch<React.SetStateAction<{
        firstName: string;
        lastName: string;
        email: string;
    }>>
}

const ProfileSection = (props: PropsType) => {
    const { getValues, control, handleSubmit, formState: { errors } } = useFormHook(createProfileSchema);
    console.log("🚀 ~ ProfileSection ~ getValues:", getValues())
    console.log("🚀 ~ ProfileSection ~ errors:", errors)

    const create = (data: FieldValues) => {
        console.log('create - data:', data)
        //@ts-ignore
        props?.setProfileDetails(data)

        localStorage.setItem('profileDetails', JSON.stringify(data))
    }



    return (
        <section className="px-8 py-12 bg-white rounded-md">
            <h2 className="text-2xl font-bold">Profile Details</h2>
            <h4 className="text-md mt-2 text-gray-400">Add your details to add a personal touch to your profile</h4>
            <UploadPictureSection
                imagePreview={props?.imagePreview}
                setImagePreview={props?.setImagePreview}
            />
            <form autoComplete="new-password" onSubmit={handleSubmit(create)} className={cn("pt-10 pb-00 relative")}>
                <section className="profile-details-custom-grid gap-y-2 items-center bg-[#fafafa] p-4 rounded-md mt-8 text-sm text-gray-500">
                    <>
                        <div>First name*</div>
                        <InputFieldComponent
                            name={'firstName'}
                            control={control}
                            errors={errors}
                            placeholder={'First name'}
                        />
                    </>
                    <>
                        <div>Last name*</div>
                        <InputFieldComponent
                            name={'lastName'}
                            control={control}
                            errors={errors}
                            placeholder={'Last name'}
                        />
                    </>
                    <>
                        <div>Email*</div>
                        <InputFieldComponent
                            name={'email'}
                            control={control}
                            errors={errors}
                            placeholder={'Email address'}
                        />
                    </>


                </section>
                <Button className="mt-24 ml-auto text-xs" type="submit">Save</Button>
                <div className="dividerLineProfile"></div>
            </form>
        </section>
    )
}

export default ProfileSection;
