import React, { Fragment, useEffect, useState } from 'react'
import { filterOptions } from '@/config'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '@radix-ui/react-label'
import { Separator } from "@/components/ui/separator"
import { keyframes } from '@emotion/react'



const ProductFilter = ({ filters, handleFilters }) => {



    let isChecked = (keyItem, op) => {

        if (!filters) return false;
        if (!filters[keyItem]) return false;

        let ans = (
            filters
            && Object.keys(filters).length >= 1
            && filters[keyItem]
            && filters[keyItem].indexOf(op) > -1
        )
        return ans;
    }


    return (
        <div className='bg-background rounded-lg shadow-sm' >
            <div className='p-4 border-b' >
                <h2 className='text-lg font-semibold' >Filters</h2>
            </div>
            <div className='p-4 space-y-4' >
                {
                    Object.keys(filterOptions).map((keyItem) => {
                        return <Fragment>
                            <div>
                                <h3 className='text-base font-bold' >{keyItem}</h3>
                                <div className='grid  gap-2 mt-2' >
                                    {
                                        filterOptions[keyItem].map((option) => {
                                            return <Label className=' flex items-center gap-2 font-normal ' >
                                                <Checkbox
                                                    checked={
                                                        isChecked(keyItem, option.id)
                                                    }
                                                    onCheckedChange={() => { handleFilters(keyItem, option.id) }}
                                                ></Checkbox>
                                                {option.label}
                                            </Label>
                                        })
                                    }
                                </div>
                            </div>
                            <Separator />

                        </Fragment>
                    })
                }
            </div>
        </div>
    )
}

export default ProductFilter