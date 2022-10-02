import React from 'react'
import './ProfileCard.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const { posts } = useSelector((state) => state.postReducer)
  const severPublic = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="ProfileCard">
      <div className="ProfileImage">
        <img
          src={
            user.coverPicture
              ? severPublic + user.coverPicture
              : severPublic + 'cover.jpg'
          }
          alt="" style={location==='profilePage'? {maxHeight: '15rem'}:{maxHeight: '12rem'}}
        />
        <img
          src={
            user.profilePicture
              ? severPublic + user.profilePicture
              : severPublic + 'user.png'
          }
          alt=""
        />
      </div>

      <div className="profileName">
        <span>{user.firstname + ' ' + user.lastname}</span>
        <span>{user.worksAt ? user.wordsAt : ''}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Followings</span>
          </div>

          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div>
                <div className="follow">
                  <span>
                    {posts.filter((post) => post.userId === user._id).length}
                  </span>
                  <span>Posts</span>
                </div>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location === 'profilePage' ? (
        ''
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            My profile
          </Link>
        </span>
      )}
    </div>
  )
}

export default ProfileCard
