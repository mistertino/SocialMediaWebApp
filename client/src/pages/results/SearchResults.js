import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProfileSide from '../../components/profileSide/ProfileSide'
import ResultItem from '../../components/ResultItem/ResultItem'
import RightSide from '../../components/RightSide/RightSide'
import notfoundimg from '../../img/notfound2.svg'
import found from '../../img/notfound1.svg'
import './SearchResults.css'

const SearchResults = () => {
  const location = useLocation()
  const results = location?.state?.results
  // Set title
  useEffect(() => {
    document.title = 'TC Connect - Search'
  }, [])
  if (results?.length === 0) {
    return (
      <div className="Home">
        <ProfileSide location="searchPage" />
        <div className="search-result">
          <img src={notfoundimg} alt="" />
          <span>Không có kết quả phù hợp</span>
        </div>

        <RightSide />
      </div>
    )
  } else
    return (
      <div className="Home">
        <ProfileSide location="searchPage" />
        <div className="result">
          <img src={found} alt="" />
          <b>Kết quả tìm được: {results?.length}</b>
          {results?.map((result) => (
            <ResultItem result={result} />
          ))}
        </div>
        <RightSide />
      </div>
    )
}

export default SearchResults
