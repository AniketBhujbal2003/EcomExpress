

import React from 'react'

import { Label } from '@radix-ui/react-label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Input } from 'postcss';

import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

function CommonForm ({ formControls, formData, setFormData, onSubmit, buttonText }) {

   function  redenderInputByComponentType(getControlItem){
        let element = null;
        let value = formData[getControlItem.name] || '';

        switch (getControlItem.componentType) {
            case 'input':
                element =  (
                    <Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    type={getControlItem.type}
                    id={getControlItem.name}
                    value={value}
                    onChange={(event) => {
                        setFormData(
                            {
                                ...formData,
                                [getControlItem.name]: event.target.value
                            }
                        )
                    }}
                />
                );
                
                break;

            case 'select':
                element = (
                    <Select value={value} onValueChange={(value)=>{
                           setFormData({
                              ...formData,
                              [getControlItem.name]:value,
                           })
                    }} >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={getControlItem.placeholder} ></SelectValue>
                        </SelectTrigger>

                        <SelectContent>
                            {
                                (getControlItem.option &&
                                    getControlItem.option.length > 0 ?

                                    getControlItem.options.map((optionItem) => {
                                        return <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>
                                    })

                                    :

                                    null

                                )
                            }
                        </SelectContent>

                    </Select>
                );
                break;


            case 'textarea':
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
                        onChange={(event)=>{
                            setFormData(
                                {
                                    ...formData,
                                    [getControlItem.name]: event.target.value
                                }
                            )
                        }}

                    >

                    </Textarea>
                );

            default:
                element =  (<Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    type={getControlItem.type}
                    id={getControlItem.name}
                    onChange={(event) => {
                        setFormData(
                            {
                                ...formData,
                                [getControlItem.name]: event.target.value
                            }
                        )
                    }}
                />);
                
                break;
        }

        return element;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-1.5 '>
                {
                    formControls.map((controlItem) =>(
                            <div className=' grid w-full gap-1.5 ' key={controlItem.name}>
                                <Label>{controlItem.label}</Label>
                                {
                                    redenderInputByComponentType(controlItem)
                                }

                            </div>
                        )

                    )
                    
                }
            </div>

            <Button type='submit' className=" mt-2 w-full" >{buttonText || 'submit'}</Button>
        </form>
    )
}

export default CommonForm