export interface ICategoryItem{
    id:number,
    name:string,
    image:string
}

export interface ICreateEditModel{
    name:string;
    image:File;
  }

  export interface IPaginationResultModel{
    data:ICategoryItem[];
    total:number;
    
  }