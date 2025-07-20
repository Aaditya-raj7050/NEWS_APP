import React, { useEffect, useState } from 'react' ; 
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types' ;

const News = (props) => {

  const [articles ,  setArticles] = useState([]) ;
  const [loading ,  setLoading] = useState(true) ;
  const [page ,  setPage] = useState(1) ;
  const [totalResults ,  setTotalResults] = useState(0) ;
  
  const capital = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1) ;
  }
  
  useEffect(() => {
    document.title =   `${capital(props.category)} - NewsMonkey`;
     updates(page) ;
  } , []) ; 

  const updates = async(page) => {
    props.setProgress(10) ; 
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=f8a3661f929844b29d2bde233d13e420&pageSize=${props.pageSize}&page=${page}`;
    
    setLoading(true) ;
    let data = await fetch(url);
    props.setProgress(50) ; 
    let parsedData = await data.json();
    
    setArticles(parsedData.articles) ;
    setTotalResults(parsedData.totalResults) ;
    setLoading(false) ;

    props.setProgress(100) ; 
}

  const handlePrevClick = async () => {
    const prevPage = page - 1;
    setPage(prevPage);
    updates(prevPage); // ✅ use updated value
  };

  const handleNextClick = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    updates(nextPage); // ✅ use updated value
  };


    return (
      <div className="container my-3">
        <h1 className="text-center" style={{marginTop: '60px'}}>NewsMonkey - Top Headlines</h1>
        {loading && <Spinner/>}

        <div className="row">
          {!loading && articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                  <NewsItem  title={element.title ? element.title.slice(0,30) : ""} description={element.description ? element.description.slice(0,50) : ""} imageUrl={element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} />
              </div>
          })}
        </div> 
        <div className="container d-flex justify-content-between">
          <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
          <button disabled={page>= Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )

}

  News.defaultProps = {
    country : 'in' ,
    pageSize : 9 , 
    category : 'general'
  }

  News.propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
  }


export default News
