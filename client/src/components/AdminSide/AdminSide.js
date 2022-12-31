import React, { useState } from 'react'
import { Tabs } from '@mantine/core'

const AdminSide = () => {
  const [activeTab, setActiveTab] = useState('first')

  return (
    <Tabs
      color="grape"
      variant="pills"
      value={activeTab}
      onTabChange={setActiveTab}
    >
      <Tabs.List grow>
        <Tabs.Tab value="posts-ctrl">Quản lý bài viết</Tabs.Tab>
        <Tabs.Tab value="users-ctrl">Quản lý người dùng</Tabs.Tab>
        <Tabs.Tab value="posts-report">Báo cáo bài viết</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="posts-ctrl">Quản lý bài viết</Tabs.Panel>
      <Tabs.Panel value="users-ctrl">Quản lý người dùng</Tabs.Panel>
      <Tabs.Panel value="posts-report">Bái cáo bài viết</Tabs.Panel>
    </Tabs>
  )
}

export default AdminSide
