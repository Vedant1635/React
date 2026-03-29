import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchPosts, postActions } from '../redux/slices/postSlice';

const Posts = () => {
    const dispatch = useDispatch()
    const { data, isLoading, message, page, limit, hasMore } = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(fetchPosts(limit, page))
    }, [])

     const handleRefresh = () => {
        dispatch(postActions.reset())
        dispatch(fetchPosts(limit,1))
    }

    return (
        <div>
            <h2>Posts</h2>
            <button onClick={handleRefresh}>Refresh</button>
            
            {isLoading && data?.length === 0 && <h3>Loading...</h3>}

            {message && <h3>Error: {message}</h3>}

            {!isLoading && data.length === 0 && !message && (
                <h3>No Data Found</h3>
            )}

            {data?.length > 0 && (
                <InfiniteScroll
                    dataLength={data?.length}
                    next={() => dispatch(fetchPosts(limit, page))}
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