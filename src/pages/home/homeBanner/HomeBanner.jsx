import React, { useEffect, useState } from 'react'
import './homeBanner.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFectch'
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImg/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper.jsx';


const HomeBanner = () => {
  const [background,setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const {data, loading} = useFetch('/movie/upcoming');
  const {url} = useSelector((state) => state.home);

  useEffect( () => {
    const bg = url.back_drop +  data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBackground(bg);
  },[data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(query.length > 0)  navigate(`/search/${query}`)
  }

  return (
    <div className="heroBanner">

      {!loading && (<div className="backdrop-img">
          <Img src={background}></Img>
      </div>)}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
          Flix Junction, your ultimate destination for all things entertainment!
          </span>

          <form onSubmit={handleSubmit}>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                />
              <button type="button" onClick={() => { (query.length > 0 )? navigate(`/search/${query}`) : "" }}>
                Search
              </button>
            </div>
          </form>

        </div>
      </ContentWrapper>
    </div>
    
  )
}

export default HomeBanner