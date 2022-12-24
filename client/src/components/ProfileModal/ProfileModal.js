import { Modal, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { uploadImage } from '../../action/UploadAction'
import { updateUser } from '../../action/UserAction'

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme()
  // Get Userdata  split password
  const { password, ...other } = data
  // State
  const [formData, setFormData] = useState(other)
  const [profileImage, setProfileImage] = useState(null)
  const [coverImage, setCoverImage] = useState(null)

  const dispatch = useDispatch()
  const params = useParams()

  //Func
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      event.target.name === 'profileImage'
        ? setProfileImage(img)
        : setCoverImage(img)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let UserData = formData
    if (profileImage) {
      const data = new FormData()
      const fileName = Date.now() + profileImage.name
      data.append('name', fileName)
      data.append('file', profileImage)
      UserData.profilePicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    if (coverImage) {
      const data = new FormData()
      const fileName = Date.now() + coverImage.name
      data.append('name', fileName)
      data.append('file', coverImage)
      UserData.coverPicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(updateUser(params.id, UserData))
    setModalOpened(false)
  }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      overflow="inside"
    >
      <form action="" className="infoForm" onSubmit={handleSubmit}>
        <h3>Thông tin của bạn</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="Họ"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Tên"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Nơi làm việc"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="Sống tại"
            onChange={handleChange}
            value={formData.livesin}
          />
          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Thành phố"
            onChange={handleChange}
            value={formData.country}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="Mối quan hệ"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>
        <div>
          Ảnh đại diện
          <input type="file" name="profileImage" onChange={onImageChange} />
          Ảnh bìa
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>
        <button className="button infobutton" type="submit">
          Cập nhật
        </button>
      </form>
    </Modal>
  )
}

export default ProfileModal
