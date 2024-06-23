import { Card, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { ICategoryItem } from '../categories/types';
import { categoryService } from '../../services/CategoryService';
import { imageUrl } from '../../helpers/constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Empty, Pagination, PaginationProps, Popconfirm, Progress, message } from 'antd';
import { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import { SearchProps } from 'antd/es/input';
import Search from 'antd/es/input/Search';



const TABLE_HEAD = ["id", "Фото", "Назва", ""];


const CategoryTable: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(2)
    const [table, setTable] = useState<ICategoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const navigate = useNavigate()
    const [progress, setProgress] = useState<number>(0)

    const prog: AxiosRequestConfig = {
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.total) {
                setProgress(Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                ))
            }
        }
    }

    const loadData = async()=>{
        setLoading(true);
        setProgress(0);
        const search: string | null = searchParams.get("search")
        const response = await categoryService.getList(search || '', currentPage, perPage, prog);
        if (response.status === 200) {
            setTotal(response.data.total)
            setTable(response.data.data)
            setLoading(false)

        }
    }

    useEffect(() => {
        (async () => {
           await loadData();
        })()
    }, [searchParams, currentPage, perPage])

    const deleteCategory = async (id: number) => {
        setConfirmLoading(true);
        const result = await categoryService.delete(id);
        if (result.status === 204) {
            setConfirmLoading(false);
            setTotal(total-1);
            message.success('Категорію успішно видалено');
            await loadData();
        }
    }

    const onSearch: SearchProps['onSearch'] = (value) => {
        setSearchParams({ search: `${value}` })
      }
    
      const onPaginationChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        setCurrentPage(current);
        setPerPage(pageSize);
      }


    return (
        <>
            <button onClick={() => navigate('/create-edit/0')} type="button" className=" shadow-xl fixed top-20 right-10 px-3 py-2 text-xl font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Додати категорію
            </button>
            {!loading && table.length > 0 && 
            <div className='flex flex-col mt-16 mx-auto' style={{width:'70%'}}>
                <Search  size="large" placeholder="Пошук по назві" allowClear onSearch={onSearch} />
                <Card className="h-full w-full mt-10 " placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="h5"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                        placeholder={undefined}
                                        onPointerEnterCapture={undefined}
                                        onPointerLeaveCapture={undefined}
                                        children={head} />

                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody >
                        {table.map((item, index) => {
                            const isLast = index === table.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={item.id}>
                                    <td className={classes}>
                                        <Typography
                                            variant="h4"
                                            color="blue-gray"
                                            className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                                            {item.id}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <img className=' h-[100px] ' src={imageUrl + '150_' + item.image} />
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="h5"
                                            color="blue-gray"
                                            className="font-normal" children={item.name} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >

                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className=' flex gap-4 justify-end mr-24'>
                                            <button type='button' onClick={() => navigate(`/create-edit/${item.id}`)} className=" shadow-xl bg-green-400 hover:bg-green-600 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                            <Popconfirm
                                                title="Видалення категорії"
                                                description="Ви впевненні що бажаєте видалити цю категорію?"
                                                onConfirm={() => deleteCategory(item.id)}
                                                okButtonProps={{ loading: confirmLoading }}
                                                okText="Так"
                                                cancelText="Ні">
                                                <button type='button' className="shadow-xl bg-red-400 hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </Popconfirm>

                                        </div>
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>


            </Card>
            <Pagination
              current={currentPage}
              showSizeChanger
              onChange={onPaginationChange}
              defaultCurrent={1}
              total={total}
              pageSizeOptions={[2, 4, 8, 10]}
              pageSize={perPage}
              className=' mt-10  mr-14 self-end'
            />
            </div>}
            
            {!loading && table.length === 0 && <Empty className=' mx-auto mt-6' />}
            {loading && <Progress className=' mt-20' percent={progress} success={{ percent: progress }} />}
        </>

    )
}

export default CategoryTable