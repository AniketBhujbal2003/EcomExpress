import React, { useEffect, useState } from 'react'
import bannerOne from "../../assets/banner-1.webp"
import bannerTwo from "../../assets/banner-2.webp"
import bannerThree from "../../assets/banner-3.webp"
import { Button } from '../../components/ui/button'
import { Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Footprints, Heater, Images, MenuIcon, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFillteredProducts } from '@/store/shop/ProductSlice'
import { filterOptions, sortOptions } from '@/config'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'

// importing Icon Images
import Nike from '../../assets/nike.png'
import Levis from '../../assets/levis.png'
import Puma from '../../assets/cat.png'
import Adidas from '../../assets/adidas.png'
import Zara from '../../assets/letter-z.png'
import HM from '../../assets/letter-h.png'
import { useNavigate } from 'react-router-dom'

const slides = [bannerOne, bannerTwo, bannerThree];
const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ManIcon  },
  { id: "women", label: "Women", icon: WomanIcon },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt ,src: Nike},
  { id: "adidas", label: "Adidas", icon: WashingMachine ,src: Adidas  },
  { id: "puma", label: "Puma", icon: ShoppingBasket ,src: Puma  },
  { id: "levi", label: "Levi's", icon: Airplay ,src: Levis  },
  { id: "zara", label: "Zara", icon: Images ,src: Zara},
  { id: "h&m", label: "H&M", icon: Heater ,src: HM},
];

const ShoppingHome = () => {



  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productList } = useSelector((state) => {
    return state.shopProducts;
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        return (
          (prevSlide + 1 + slides.length) % (slides.length)
        )
      })
    }, 5000)
    return () => clearInterval(timer);
  }, [])


  useEffect(() => {
    dispatch(fetchAllFillteredProducts({ filterParams: {}, sortOptions: 'price-lowtohigh' }))
  }, [dispatch])

  const handleNavigateToListingPage = (getCurrentItem,section)=>{
      sessionStorage.removeItem('filters');
      const currentFilter={
        [section] :[getCurrentItem.id]
      }
      sessionStorage.setItem('filters',JSON.stringify(currentFilter))
      navigate('/shop/listing')
  }


  return (
    <div className='flex flex-col min-h-screen' >
      <div className="relative w-full h-[600px] overflow-hidden ">
        {
          slides.map((slide, index) => {
            return <img
              src={slide}
              key={index}
              className={`${(index == currentSlide) ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 `}
            >
            </img>
          })
        }

        <Button variant='outline' size='icon'
          className='absolute top-1/2 left-4 transform -translate-y-1/2'
          onClick={() =>
            setCurrentSlide((prevSlide) => {
              return (
                (prevSlide - 1 + slides.length) % (slides.length)
              )
            })
          }
        >
          <ChevronLeftIcon className='h-4 w-4' ></ChevronLeftIcon>
        </Button>
        <Button variant='outline' size='icon'
          className='absolute top-1/2 right-4 transform -translate-y-1/2'
          onClick={() =>
            setCurrentSlide((prevSlide) => {
              return (
                (prevSlide + 1 + slides.length) % (slides.length)
              )
            })
          }
        >
          <ChevronRightIcon className='h-4 w-4' ></ChevronRightIcon>
        </Button>
      </div>

      <section  className="py-12 bg-gray-50">
        <div className='container mx-auto px-4' >
          <h2 className='text-3xl font-bold text-center mb-8' >
            Shop By category
          </h2>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4' >
            {
              categoriesWithIcon.map((catItem) => {
                return <Card onClick={()=>handleNavigateToListingPage(catItem,'category')} className='cursor-pointer hover:shadow-lg transition-shadow' >
                  <CardContent className='flex flex-col items-center justify-center p-6' >
                    <catItem.icon className='w-12 h-12 mb-4 text-primary' sx={{ fontSize: '40px' }} />
                    <span className='font-bold' >{catItem.label}</span>
                  </CardContent>
                </Card>
              })
            }
          </div>


        </div>
      </section>


      <section className="py-12 bg-gray-50">
        <div className='container mx-auto px-4' >
          <h2 className='text-3xl font-bold text-center mb-8' >
            Shop By Brand
          </h2>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4' >
            {
              brandsWithIcon.map((brandItem) => {
                return <Card onClick={()=>handleNavigateToListingPage(brandItem,'brand')} className='cursor-pointer hover:shadow-lg transition-shadow' >
                  <CardContent className='flex flex-col items-center justify-center p-6' >
                    {/* <brandItem.icon className='w-12 h-12 mb-4 text-primary' sx={{ fontSize: '40px' }} /> */}
                    <img src={brandItem.src} className='w-12 h-12 ' alt="BrandIcon" />
                    <span className='font-bold' >{brandItem.label}</span>
                  </CardContent>
                </Card>
              })
            }
          </div>

        </div>
      </section>


      <section className="py-12 bg-gray-50">
        <div className='container mx-auto px-4' >
          <h2 className='text-3xl font-bold text-center mb-8' >
            Feature Products
          </h2>
          <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' >
            {
              productList && productList.length > 0 ?
                productList.slice(0,8).map((productItem) => {
                  return <ShoppingProductTile
                    // handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                  // handleAddtoCart={handleAddToCart}
                  >

                  </ShoppingProductTile>
                })
                : null

            }
          </div>

        </div>
      </section>
    </div>
  )
}

export default ShoppingHome