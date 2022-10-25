import React, { useState, useRef } from 'react'
import './PostShare.css'
import { UilScenery } from '@iconscout/react-unicons'
import { UilPlayCircle } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import { UilSchedule } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../../action/UploadAction'

const PostShare = ({ setModalOpened }) => {
  const loading = useSelector((state) => state.postReducer.uploading)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const { user } = useSelector((state) => state.authReducer.authData)
  const desc = useRef()
  const imageRef = useRef()
  const dispatch = useDispatch()
  //State
  const [image, setImage] = useState(null)

  // Func
  const reset = () => {
    setImage(null)
    desc.current.value = ''
    setModalOpened(false)
  }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImage(img)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const hastag = desc.current.value.split('#', 10)
    const newPost = {
      userId: user._id,
      desc: hastag[0],
      hastag: hastag[1],
    }
    if (image) {
      const data = new FormData()
      const filename = Date.now() + image.name
      data.append('name', filename)
      data.append('file', image)
      newPost.image = filename
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(uploadPost(newPost))
    reset()
  }

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + 'user.png'
        }
        alt=""
      />
      <div className="">
        <input
          type="text"
          placeholder="Bạn đang nghĩ gì?"
          ref={desc}
          required
        />
        <div className="postOption">
          <div
            className="option"
            style={{ color: 'var(--photo)' }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery /> Ảnh
          </div>
          <div className="option" style={{ color: 'var(--video)' }}>
            <UilPlayCircle /> Video
          </div>
          <div className="option" style={{ color: 'var(--location)' }}>
            <UilLocationPoint /> Vị trí
          </div>
          <div className="option" style={{ color: 'var(--schedule)' }}>
            <UilSchedule /> Schedule
          </div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Đang đăng...' : 'Đăng'}
          </button>
          <div style={{ display: 'none' }}>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostShare
