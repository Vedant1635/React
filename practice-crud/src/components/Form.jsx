import React, { useEffect, useState } from 'react'
import { postData, updatePost } from '../api/api';
import Loader from './ui/Loader';

const Form = ({ data, setdata, updateData, setupdateData }) => {
    const [loading, setLoading] = useState(false);
    const [addData, setaddData] = useState({
        title: "",
        body: ""
    })

    useEffect(() => {
        updateData && setaddData({
            title: updateData.title || "",
            body: updateData.body || ""
        })
    }, [updateData])

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setaddData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const addPostData = async () => {
        setLoading(true);
        try {
            const res = await postData(addData);
            setdata([...data, res.data])
            setaddData({ title: "", body: "" })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const updatePostData = async () => {
        setLoading(true);
        try {
            const res = await updatePost(updateData.id, addData);
            const updatedList = data.map((item) => {
                if (item.id === updateData.id) {
                    return res.data;
                }
                return item;
            });
            setdata(updatedList);
            setaddData({ title: "", body: "" });
            setupdateData({});
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (updateData && updateData.id) {
            updatePostData();
        } else {
            addPostData();
        }
    }
    return (
        <>
            <div className='form-container'>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="title"></label>
                        <input type="text" id='title' value={addData.title} name='title' placeholder='Add title' onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="body"></label>
                        <input type="text" id='body' value={addData.body} name='body' placeholder='Add Post' onChange={handleInputChange} />
                    </div>
                    <button type='submit' disabled={loading}>{loading ? <Loader className="small" /> : updateData && updateData.id ? "Update" : "Add"}</button>
                </form>
            </div>
        </>
    )
}

export default Form
