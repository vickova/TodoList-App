import { useState, useEffect } from 'react';
import Toggle from '../components/Toggle';
import ToggleIcon from '../images/chevron.svg';
import Delete from '../images/delete-icon.svg';
import Edit from '../images/edit-icon.svg';
import { useNavigate } from 'react-router-dom';
import { getCategoriesbyId } from '../utils/calls';
import { DeleteCategory } from '../utils/calls';
import { useDispatch, useSelector } from 'react-redux';

const Category = ({categories, category, setCategoryList, open, setOpen, categlist, setCategList, setCategName}) => {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    const buttonClickHandler = async (name)=>{
        setCategoryList({})
        console.log('happening')
        const MovieData = await getCategoriesbyId(name._id);
        // dispatch(SingleCategory(MovieData))
        setCategName(name.name);
        setCategoryList(MovieData);
        navigate(`/categories/${name._id}`)
    }
    const EditHandler = ()=>{
        setOpen(!open);
        setCategList(categories)
        navigate(`/categories`)
    }
  return (
    <div className='single-task'>
        <div className='toggle' onClick={()=>setToggle(!toggle)}>
            <div>
                <h3>{categories.name}</h3>
                <div className='category'>
                    <h4>{category}</h4>
                    <p>{categories.description}</p>
                </div>
            </div>
            <img src={ToggleIcon} alt="toggle-icon" style={{transform:`${toggle?'rotate(90deg)':'rotate(0deg)'}`}}/>
        </div>
        <Toggle toggle={toggle}>
        
        <div className='buttons'>
            <div className='action-button'>
                <img src={Edit} alt="edit-button" onClick={EditHandler}/>
                <img src={Delete} alt="delete-button" onClick={()=>DeleteCategory(categories._id)}/>
            </div>
            <button className='completed' onClick={()=>buttonClickHandler(categories)}>View</button>
        </div>
        </Toggle>
    </div>
  )
}

export default Category
