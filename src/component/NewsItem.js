import React from 'react'
const NewsItem = (props) => {
    let {title , description , imageUrl , newsUrl , author , date} = props ;
    return (
      <div className='my-3'> 
            <div  className="card">
                <img src={imageUrl ? imageUrl : "https://via.placeholder.com/300x180?text=No+Image"}
                    className="card-img-top"
                    alt="news" />
                <div   className="card-body"> 
                    <h5   className="card-title">{title}...</h5>
                    <p   className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on {date}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank"  className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>
      </div>
    ) 
}
export default NewsItem
