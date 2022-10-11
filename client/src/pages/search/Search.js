import React from 'react'

const Search = () => {
  // Set title
  useEffect(() => {
    document.title = 'TC - Search'
  })
  return (
    <div className="Search">
      <ProfileSide />

      <RightSide />
    </div>
  )
}

export default Search
