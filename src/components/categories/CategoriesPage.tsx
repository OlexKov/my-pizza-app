import React, { useEffect, useState } from 'react'
import { ICategoryItem } from './types'

import { categoryService } from '../../services/CategoryService'
import { useNavigate } from 'react-router-dom';
import { imageUrl } from '../../helpers/constants';

const CategoriesPage: React.FC = () => {

  const [list, setList] = useState<ICategoryItem[]>([]);
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      const responce = await categoryService.getAll();
      if (responce.status === 200) {
        setList(responce.data)
      }
    })()
  }, [])

  
  return (
    <>
      <div className={"md:container mx-auto"}>
        <button onClick={()=>navigate('create-edit')} type="button" className="fixed top-26 right-10 px-3 py-2 text-xl font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Додати категорію
        </button>
        <h1 className={"text-center my-[20px] text-3xl sm:text-3xl text-slate-900 tracking-tight dark:text-slate-200"}>Меню</h1>
        <div className={"grid  place-items-center grid-cols-1  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"}>
          {list.map(item => (
            <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full" src={imageUrl+'600_'+item.image} alt="Sunset in the mountains" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CategoriesPage