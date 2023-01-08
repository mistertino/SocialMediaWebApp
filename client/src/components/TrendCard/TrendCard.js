import React, { useEffect, useState } from 'react'
import './TrendCard.css'
import { getAllPosts, getPostLastWeek } from '../../api/PostRequest'
import Hastag from '../Hastag/Hastag'

const TrendCard = () => {
  const [listHastags, setListHastags] = useState([])
  const [listHastagsNoduplicate, setListHastagsNoDuplicate] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await getPostLastWeek()
      let listHastags = []
      // create new array field hastags of posts
      const listPost = data.map((post) => post.hastags)
      // get hastag in all posts then push to new array
      listPost.forEach((hastags) => {
        hastags.forEach((hastag) => {
          listHastags.push(hastag)
        })
      })
      // Remove array duplicate
      const listHastagsNoduplicate = listHastags.filter(
        (item, index) => listHastags.indexOf(item) === index,
      )
      setListHastags(listHastags)
      setListHastagsNoDuplicate(listHastagsNoduplicate)
    }
    fetchPosts()
  }, [])
  console.log(listHastags)
  return (
    <div className="TrendCard">
      <h5>Thịnh Hành</h5>
      {listHastagsNoduplicate.map((hastag) => (
        <Hastag hastag={hastag} listHastags={listHastags} />
      ))}
    </div>
  )
}

export default TrendCard
