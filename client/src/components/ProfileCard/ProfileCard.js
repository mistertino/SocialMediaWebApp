import React, { useEffect, useState } from 'react'
import './ProfileCard.css'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest'

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const { posts } = useSelector((state) => state.postReducer)
  const severPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const params = useParams()
  const profileUserId = params.id
  const [profileUser, setProfileUser] = useState(user)
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id || profileUserId === undefined) {
        setProfileUser(user)
        // console.log(profileUser)
      } else {
        const profileUser = await UserApi.getUser(profileUserId)
        // console.log(profileUser.data)
        setProfileUser(profileUser.data)
      }
    }
    fetchProfileUser()
  }, [params.id])
  return (
    <div className="ProfileCard">
      <div className="ProfileImage">
        <img
          src={
            profileUser.coverPicture
              ? severPublic + profileUser.coverPicture
              : severPublic + 'cover.jpg'
          }
          alt=""
          style={
            location === 'profilePage'
              ? { maxHeight: '15rem' }
              : { maxHeight: '12rem' }
          }
        />
        <img
          src={
            profileUser.profilePicture
              ? severPublic + profileUser.profilePicture
              : severPublic + 'user.png'
          }
          alt=""
        />
      </div>

      <div className="profileName">
        <span>{profileUser.firstname + ' ' + profileUser.lastname}</span>
        <span>{profileUser.about ? profileUser.about : ''}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>
              {profileUserId
                ? profileUser.followers.length
                : user.followers.length}
            </span>
            <span>Người theo dõi</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>
              {profileUserId
                ? profileUser.following.length
                : user.following.length}
            </span>
            <span>Đang theo dõi</span>
          </div>

          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div>
                <div className="follow">
                  <span>
                    {
                      posts.filter((post) => post.userId === profileUser._id)
                        .length
                    }
                  </span>
                  <span>Bài viết</span>
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
            Thông tin của bạn
          </Link>
        </span>
      )}
    </div>
  )
}

export default ProfileCard
