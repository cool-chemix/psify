'use client'
import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  DollarOutlined,
  GiftOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Modal, Select, Table, Tabs, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

const { Title, Text } = Typography

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const [emailError, setEmailError] = useState('')
  const [form] = Form.useForm()

  // Fetch data
  const { data: users, refetch: refetchUsers } = Api.user.findMany.useQuery({})
  const { data: payments } = Api.payment.findMany.useQuery({})
  const { data: sponsors, refetch: refetchSponsors } = Api.sponsor.findMany.useQuery({})
  const { data: fundraisingCampaigns } = Api.fundraisingCampaign.findMany.useQuery({})

  // Mutations
  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: createUser } = Api.user.create.useMutation()
  const { mutateAsync: deleteUser } = Api.user.delete.useMutation()
  const { mutateAsync: createSponsor } = Api.sponsor.create.useMutation()
  const { mutateAsync: deleteSponsor } = Api.sponsor.delete.useMutation()
  const { mutateAsync: updatePayment } = Api.payment.update.useMutation()

  const handleModalOpen = (type: string) => {
    setModalType(type)
    setIsModalVisible(true)
    setEmailError('')
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
    form.resetFields()
    setEmailError('')
  }

  const checkDuplicateEmail = async (email: string, userId?: string) => {
    try {
      const existingUser = users?.find(u => 
        u.email === email && (!userId || u.id !== userId)
      )
      return !!existingUser
    } catch (error) {
      return false
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser({ where: { id: userId } })
      enqueueSnackbar('User deleted successfully', { variant: 'success' })
      handleModalClose()
      refetchUsers()
    } catch (error) {
      enqueueSnackbar('An error occurred', { variant: 'error' })
    }
  }

  const handleRemoveSponsor = async (sponsorId: string) => {
    try {
      await deleteSponsor({ where: { id: sponsorId } })
      enqueueSnackbar('Sponsor removed successfully', { variant: 'success' })
      refetchSponsors()
    } catch (error) {
      enqueueSnackbar('An error occurred', { variant: 'error' })
    }
  }

  const exportToCSV = () => {
    if (!users) return

    // Headers based on the specification image
    const headers = [
      'Name,Email,Phone,Description,Address,Shipping Address,Metadata Parameters'
    ]
    
    // Map users to CSV format, only populating name and email
    const csvData = users.map(user => {
      // Escape any commas in the name and email fields
      const escapedName = user.name ? `"${user.name.replace(/"/g, '""')}"` : ''
      const escapedEmail = user.email ? `"${user.email.replace(/"/g, '""')}"` : ''
      
      // Return CSV row with empty fields for optional values
      return `${escapedName},${escapedEmail},,,,,""`
    })
    
    const csvString = [...headers, ...csvData].join('\n')
    
    // Create and trigger download
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `users-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleModalSubmit = async (values: any) => {
    try {
      if ((modalType === 'newUser' || modalType === 'role') && values.email) {
        const isDuplicate = await checkDuplicateEmail(
          values.email, 
          modalType === 'role' ? values.userId : undefined
        )
        
        if (isDuplicate) {
          setEmailError('This email is already in use')
          return
        }
      }

      setEmailError('')
      
      switch (modalType) {
        case 'role':
          await updateUser({
            where: { id: values.userId },
            data: { 
              globalRole: values.role,
              name: values.name,
              email: values.email 
            },
          })
          enqueueSnackbar('User updated successfully', { variant: 'success' })
          break
        case 'newUser':
          await createUser({
            data: {
              name: values.name,
              email: values.email,
              globalRole: values.role || 'USER'
            },
          })
          enqueueSnackbar('User created successfully', { variant: 'success' })
          break
        case 'sponsor':
          await createSponsor({
            data: {
              name: values.name,
              type: values.type,
              contactEmail: values.email,
              contributionAmount: values.amount,
              renewalDate: values.renewalDate,
              status: 'ACTIVE',
            },
          })
          enqueueSnackbar('Sponsor added successfully', { variant: 'success' })
          break
        case 'payment':
          await updatePayment({
            where: { id: values.paymentId },
            data: { dueDate: values.dueDate, status: values.status },
          })
          enqueueSnackbar('Payment settings updated', { variant: 'success' })
          break
      }
      handleModalClose()
      refetchUsers()
    } catch (error) {
      enqueueSnackbar('An error occurred', { variant: 'error' })
    }
  }

  const userColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'globalRole', key: 'role' },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          onClick={() => {
            form.setFieldsValue({ 
              userId: record.id,
              name: record.name,
              email: record.email,
              role: record.globalRole 
            })
            handleModalOpen('role')
          }}
        >
          Manage User
        </Button>
      ),
    },
  ]

  const sponsorColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Email', dataIndex: 'contactEmail', key: 'email' },
    { 
      title: 'Amount', 
      dataIndex: 'contributionAmount', 
      key: 'amount',
      render: (amount: number) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }).format(amount)
      }
    },
    { title: 'Renewal', dataIndex: 'renewalDate', key: 'renewal' },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button danger onClick={() => handleRemoveSponsor(record.id)}>
          Remove
        </Button>
      ),
    },
  ]

  const paymentColumns = [
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          onClick={() => {
            form.setFieldsValue({ paymentId: record.id })
            handleModalOpen('payment')
          }}
        >
          Update
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2}>Admin Dashboard</Title>
        <Text>
          Manage member accounts, payments, sponsors, and alumni giving program
        </Text>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: (
                <span>
                  <UserOutlined /> Member Accounts
                </span>
              ),
              children: (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <Button 
                      type="primary" 
                      onClick={() => handleModalOpen('newUser')}
                      style={{ marginRight: 16 }}
                    >
                      Add User
                    </Button>
                    <Button onClick={exportToCSV}>
                      Export to CSV
                    </Button>
                  </div>
                  <Table dataSource={users} columns={userColumns} />
                </>
              ),
            },
            {
              key: '2',
              label: (
                <span>
                  <DollarOutlined /> Payment Settings
                </span>
              ),
              children: (
                <>
                  <Table dataSource={payments} columns={paymentColumns} />
                </>
              ),
            },
            {
              key: '3',
              label: (
                <span>
                  <TeamOutlined /> Sponsors
                </span>
              ),
              children: (
                <>
                  <Button
                    type="primary"
                    onClick={() => handleModalOpen('sponsor')}
                    style={{ marginBottom: 16 }}
                  >
                    Add Sponsor
                  </Button>
                  <Table dataSource={sponsors} columns={sponsorColumns} />
                </>
              ),
            },
            {
              key: '4',
              label: (
                <span>
                  <GiftOutlined /> Alumni Giving
                </span>
              ),
              children: (
                <Table
                  dataSource={fundraisingCampaigns}
                  columns={[
                    { title: 'Campaign', dataIndex: 'name', key: 'name' },
                    { title: 'Goal', dataIndex: 'goal', key: 'goal' },
                    { title: 'Current', dataIndex: 'currentAmount', key: 'current' },
                    { title: 'Status', dataIndex: 'status', key: 'status' },
                  ]}
                />
              ),
            },
          ]}
        />
        <Modal
          title={
            modalType === 'role'
              ? 'Update User'
              : modalType === 'newUser'
              ? 'Add New User'
              : modalType === 'sponsor'
              ? 'Add Sponsor'
              : 'Update Payment'
          }
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={
            modalType === 'role' ? [
              <Button 
                key="delete" 
                danger 
                onClick={() => handleDeleteUser(form.getFieldValue('userId'))}
              >
                Delete User
              </Button>,
              <Button key="cancel" onClick={handleModalClose}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={form.submit}>
                Update
              </Button>,
            ] : [
              <Button key="cancel" onClick={handleModalClose}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={form.submit}>
                Submit
              </Button>,
            ]
          }
        >
          <Form form={form} onFinish={handleModalSubmit} layout="vertical">
            {(modalType === 'role' || modalType === 'newUser') && (
              <>
                <Form.Item name="userId" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item 
                  name="email" 
                  label="Email" 
                  rules={[
                    { required: true, type: 'email', message: 'Please enter a valid email' }
                  ]}
                  validateStatus={emailError ? 'error' : undefined}
                  help={emailError}
                >
                  <Input 
                    onChange={() => setEmailError('')}
                  />
                </Form.Item>
                <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                  <Select>
                    <Select.Option value="USER">User</Select.Option>
                    <Select.Option value="ADMIN">Admin</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}
            {modalType === 'sponsor' && (
              <>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                  <Select>
                    <Select.Option value="CORPORATE">Corporate</Select.Option>
                    <Select.Option value="INDIVIDUAL">Individual</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: 'email' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="amount"
                  label="Contribution Amount"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="renewalDate"
                  label="Renewal Date"
                  rules={[{ required: true }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </>
            )}
              {modalType === 'payment' && (
              <>
                <Form.Item name="paymentId" hidden>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="dueDate"
                  label="Due Date"
                  rules={[{ required: true }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                  <Select>
                    <Select.Option value="PENDING">Pending</Select.Option>
                    <Select.Option value="PAID">Paid</Select.Option>
                    <Select.Option value="OVERDUE">Overdue</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}