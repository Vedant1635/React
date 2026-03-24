import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { deletePost, getPost } from '../api/api'
import '../App.css'
import Form from './Form'
import Loader from './ui/Loader'

const Posts = () => {

    const [data, setdata] = useState([])
    const [updateData, setupdateData] = useState({})
    const [loading, setLoading] = useState(false);
    const [deleteLoadingId, setDeleteLoadingId] = useState(null);
    const [page, setpage] = useState(1)
    const [hasMore, setHasMore] = useState(true);

    const getPostData = async () => {
        setLoading(true);
        try {
            const res = await getPost(20, page);
            if (res.data.length === 0) {
                setHasMore(false);
            } else {
                setdata((prev) => {
                    const newData = res.data.filter(
                        (newItem) => !prev.some((item) => item.id === newItem.id)
                    );
                    return [...prev, ...newData];
                });
                setpage((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPostData();
    }, [])

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

    return (
        <>
            <Form data={data} setdata={setdata} updateData={updateData} setupdateData={setupdateData} />
            <section>
                {loading && page === 1 ? (
                    <Loader wrapperClass="center-loader" />
                ) : data.length === 0 ? (
                    <p className="no-data">No Data Found</p>
                ) : (
                    <InfiniteScroll
                        dataLength={data.length}
                        next={getPostData}
                        hasMore={hasMore}
                        style={{ overflow: 'hidden' }}
                        loader={
                            <Loader wrapperClass="bottom-loader" />
                        }
                    >
                        <ol>
                            {data.map((d) => (
                                <li key={d.id}>
                                    <p>Title: {d.title}</p>
                                    <p>Body: {d.body}</p>

                                    <button onClick={() => handleUpdatePost(d)}>
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDeletePost(d.id)}
                                        disabled={deleteLoadingId === d.id}
                                    >
                                        {deleteLoadingId === d.id ? (
                                            <Loader className="small" />
                                        ) : (
                                            "Delete"
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </InfiniteScroll>
                )}
            </section>
        </>
    )
}

export default Posts
