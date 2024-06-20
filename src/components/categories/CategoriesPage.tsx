import React, { useEffect, useState } from 'react'
import { ICategoryItem } from './types'

import { categoryService } from '../../services/CategoryService'
import { imageUrl } from '../../helpers/constants';
import { Empty, Spin } from 'antd';

const CategoriesPage: React.FC = () => {

  const [list, setList] = useState<ICategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const responce = await categoryService.getAll();
      if (responce.status === 200) {
        setList(responce.data)
        setLoading(false)
      }
    })()
  }, [])

  
  return (
    <>
      <Spin spinning={loading} fullscreen size='large'/>
      <div className={"md:container mx-auto"}>
        <h1 className={"text-center my-[20px] text-3xl sm:text-3xl text-slate-900 tracking-tight dark:text-slate-700"}>Меню</h1>
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
      {!loading && list.length === 0 && <Empty className=' mx-auto' />}
    </>
  )
}

export default CategoriesPage