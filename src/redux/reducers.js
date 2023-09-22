const InitialState = {
    tasks:[],
    categories:[],
    singlecategory:[],
    category_id:null
}

const reducer = (state=InitialState, action)=>{
    switch(action.type){
        case 'FETCH_TASKS':
            return{
                ...state,
                tasks:action.payload
            }
        case 'FETCH_CATEGORIES':
            return{
                ...state,
                categories:action.payload
            }
        case 'FETCH_INDIVIDUAL_CATEGORY':
            return{
                ...state,
                singlecategory:action.payload
            }
        case 'CATEGORY_ID':
            return{
                ...state,
                category_id:action.payload
            }
    }
}

export default reducer