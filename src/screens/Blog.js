import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BottomNav from '../components/BottomNav/BottomNav'

export default function Blogs() {

    const [blog, setBlog] = React.useState()
    const { id } = useParams()

    const { blogs } = useSelector(state => state.blog)


    React.useEffect(() => {
        setBlog(...blogs.filter((blog) => blog.id === id))
    }, [blogs, id])

    return (
        <div>
            <div className="arrow-back">
                <Link to="/">
                    <ArrowBackIosIcon style={{ fill: "#fff" }} />
                </Link>
            </div>
            <div>
                <img className="blog-img" src={blog?.article_headerImg} alt='blog-background' />
            </div>
            <div className="blog-content">
                <h3>{blog?.article_title}</h3>

                <p>{blog?.article_content}</p>
            </div>

            <BottomNav />
        </div >
    )
}
