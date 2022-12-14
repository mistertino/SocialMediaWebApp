import React, { useState, useRef } from 'react'
import './PostShare.css'
import { UilScenery } from '@iconscout/react-unicons'
import { UilPlayCircle } from '@iconscout/react-unicons'
// import { UilLocationPoint } from '@iconscout/react-unicons'
import { UilSmile } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPost } from '../../action/UploadAction'
import { Collapse } from '@mantine/core'
import { Radio } from '@mantine/core'
import Picker from 'emoji-picker-react'
import profilePicture from '../../img/user.png'

const PostShare = ({ setModalOpened }) => {
  const uploading = useSelector((state) => state.postReducer.uploading)
  const { user } = useSelector((state) => state.authReducer.authData)
  // const desc = useRef()
  const imageRef = useRef()
  const videoRef = useRef()
  const dispatch = useDispatch()
  //State
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState(null)
  const [video, setVideo] = useState(null)
  const [opened, setOpened] = useState(false)
  const [status, setStatus] = useState()
  const [showPicker, setShowPicker] = useState(false)

  // Func
  const reset = () => {
    setVideo(null)
    setImage(null)
    setOpened(false)
    setStatus(null)
    setDesc('')
    setModalOpened(false)
  }

  const handleChange = (e) => {
    setDesc(e.target.value)
  }

  const onEmojiClick = (emojiObject) => {
    setDesc((desc) => desc + emojiObject.emoji)
    setShowPicker(false)
  }

  const onImageChange = (event) => {
    setVideo(null)
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      // convert image to base64
      const reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onloadend = () => {
        setImage(reader.result)
      }
    }
  }

  const onVideoChange = (event) => {
    setImage(null)
    if (event.target.files && event.target.files[0]) {
      let vid = event.target.files[0]
      if (vid.size / 1024 / 1024 < 15) {
        // convert video to base64
        const reader = new FileReader()
        reader.readAsDataURL(vid)
        reader.onloadend = () => {
          setVideo(reader.result)
        }
      } else alert('Vui l??ng t???i l??n video c?? dung l?????ng nh??? h??n 15MB')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (desc !== '') {
      opened === false && setStatus()
      let hastags = []
      // let newDesc = ''
      const listText = desc.split(' ', 10)
      listText.map((text) => {
        if (text.includes('#')) {
          hastags.push(text.slice(1))
        }
      })
      const newPost = {
        userId: user._id,
        desc: desc,
        hastags: hastags,
        status: status,
      }
      if (video) {
        newPost.video = video
      }
      if (image) {
        newPost.image = image
      }
      dispatch(uploadPost(newPost))
      reset()
    }
    alert('Nh???p n???i dung b??i vi???t')
  }

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture?.url ? user.profilePicture?.url : profilePicture
        }
        alt=""
      />
      <div className="">
        <div className="input-desc">
          <input
            type="text"
            value={desc}
            placeholder="B???n ??ang ngh?? g???"
            onChange={handleChange}
            required
          />
          {showPicker && (
            <div className="emoji-container">
              <Picker
                pickerStyle={{ width: '100%' }}
                onEmojiClick={onEmojiClick}
              />
            </div>
          )}
          <UilSmile onClick={() => setShowPicker((prev) => !prev)} />
        </div>

        <Collapse
          in={opened}
          transitionDuration={300}
          transitionTimingFunction="linear"
        >
          <Radio.Group
            value={status}
            onChange={setStatus}
            name="status"
            label="B???n ??ang c???m th???y:"
            description="C???m x??c c???a b???n!"
            spacing="lg"
          >
            <Radio color="grape" value="funny" label="Vui v??? &#128515;" />
            <Radio color="grape" value="humor" label="H??i h?????c &#128514;" />
            <Radio color="grape" value="happy" label="H???nh ph??c &#128522;" />
            <Radio color="grape" value="inlove" label="????ng y??u &#128525;" />
            <Radio color="grape" value="angry" label="T???c gi???n &#128548;" />
            <Radio color="grape" value="sad" label="Bu???n &#128546;" />
            <Radio color="grape" value="scary" label="????ng s??? &#128561;" />
            <Radio color="grape" value="suprise" label="Ng???c nhi??n &#128562;" />
          </Radio.Group>
        </Collapse>
        <div className="postOption">
          <div
            className="option"
            style={{ color: 'var(--photo)' }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery /> ???nh
          </div>
          <div
            className="option"
            style={{ color: 'var(--video)' }}
            onClick={() => videoRef.current.click()}
          >
            <UilPlayCircle /> Video
          </div>
          {/* <div className="option" style={{ color: 'var(--location)' }}>
            <UilLocationPoint /> V??? tr??
          </div> */}
          <div
            className="option"
            style={{ color: 'var(--schedule)' }}
            onClick={() => setOpened((prev) => !prev)}
          >
            <UilSmile /> Tr???ng th??i
          </div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? '??ang ????ng...' : '????ng'}
          </button>
          <div style={{ display: 'none' }}>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
            <input
              type="file"
              accept=".mp4, .mkv"
              name="myVideo"
              ref={videoRef}
              onChange={onVideoChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={image} alt="" />
          </div>
        )}

        {video && (
          <div className="previewVideo">
            <UilTimes onClick={() => setVideo(null)} />
            <video src={video} controls></video>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostShare
