export const TasksAction = ()=>{
    return{
        type:'FETCH_TASKS',
    }
}
export const CategoriesAction = (Id)=>{
    return{
        type:'FETCH_CATEGORIES',
        payload:Id
    }
}
export const SingleCategory = ()=>{
    return{
        type:'FETCH_INDIVIDUAL_CATEGORY',
    }
}
export const CategoryId = ()=>{
    console.log('Heyyyyy there')
    return{
        type:'CATEGORY_ID',
    }
}
