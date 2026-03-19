import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/api'
import '../App.css'
import Form from './Form'
import Loader from './ui/Loader'

const Posts = () => {

    const [data, setdata] = useState([])
    const [updateData, setupdateData] = useState({})
    const [loading, setLoading] = useState(false);
    const [deleteLoadingId, setDeleteLoadingId] = useState(null);
    const [limit, setLimit] = useState(30);

    const getPostData = async () => {
        setLoading(true);
        try {
            const res = await getPost(limit);
            // console.log(res.data);
            setdata(res.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handleDeletePost = async (id) => {
        setDeleteLoadingId(id);
        try {
            await deletePost(id);
            const newUpdatedPost = data.filter((d) => {
                return d.id !== id;
            })
            setdata(newUpdatedPost)
        } catch (error) {
            console.log(error);
        } finally {
            setDeleteLoadingId(null);
        }
    }

    const handleUpdatePost = (d) => {
        setupdateData(d)
    }

    useEffect(() => {
        getPostData();
    }, [])

    return (
        <>
            <Form data={data} setdata={setdata} updateData={updateData} setupdateData={setupdateData} />
            <section>
                <ol>
                    {loading ? (
                        <div className="center-loader">
                            <Loader />
                        </div>
                    ) : (
                        <ol>
                            {data.map((d) => (
                                <li key={d.id}>
                                    <p>Title: {d.title}</p>
                                    <p>Body: {d.body}</p>
                                    <button onClick={() => handleUpdatePost(d)}>Edit</button>
                                    <button onClick={() => handleDeletePost(d.id)} disabled={deleteLoadingId === d.id}>
                                        {deleteLoadingId === d.id ? (
                                            <div className="small"><Loader /></div>
                                        ) : (
                                            "Delete"
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ol>
                    )}
                </ol>
            </section>
        </>
    )
}

export default Posts
