import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";
import { setLoading, setError, appendData, incrementPage, setHasMore } from '../redux/slices/postSlice'
import { getPost } from '../api/api'

const Posts = () => {
    const dispatch = useDispatch()
    const { data, isLoading, isError, page, limit, hasMore } = useSelector((state) => state.posts)

    const fetchPosts = async () => {
        try {
            dispatch(setLoading(true))
            dispatch(setError(false))

            const res = await getPost(limit, page);

            dispatch(appendData(res.data))

            if (res.data?.length < limit) {
                dispatch(setHasMore(false))
            } else {
                dispatch(incrementPage())
            }
        } catch (error) {
            dispatch(setError(true))
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div>
            <h2>Posts</h2>
            {isLoading && page === 1 && <h3>Loading...</h3>}

            {isError && <h3>Error occurred</h3>}

            {!isLoading && !isError && data?.length === 0 && (
                <h3>No Data Found</h3>
            )}

            {data?.length > 0 && (
                <InfiniteScroll
                    dataLength={data?.length}
                    next={fetchPosts}
                    hasMore={hasMore}
                    loader={<h4>Loading more...</h4>}
                >
                    <ol>
                        {data.map((post, idx) => (
                            <li key={idx}>
                                <p>{post.title}</p>
                            </li>
                        ))}
                    </ol>
                </InfiniteScroll>
            )}
        </div>
    )
}

export default Posts