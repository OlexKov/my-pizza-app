import React, { useEffect, useState } from 'react'
import { ICategoryItem } from './types'

import { categoryService } from '../../services/CategoryService'
import { imageUrl } from '../../helpers/constants';
import { Empty, Progress} from 'antd';
import { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import { productService } from '../../services/ProductService';

const CategoriesPage: React.FC = () => {

  const [list, setList] = useState<ICategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0)

  const prog: AxiosRequestConfig = {
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total){
            setProgress(Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            ))
        }
    }
}

  useEffect(() => {
    (async () => {
      let response = await categoryService.getAll(prog);
      if (response.status === 200) {
        setList(response.data)
        setLoading(false)
      }
       response = await productService.getAll();
      if (response.status === 200) {
        console.log(response.data)
      }
    })()
  }, [])

  
  return (
    <>
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
      {!loading && list.length === 0 && <Empty className=' mx-auto mt-6' />}
      {loading &&  <Progress percent={progress} success={{ percent: progress }} />}
    </>
  )
}

export default CategoriesPage