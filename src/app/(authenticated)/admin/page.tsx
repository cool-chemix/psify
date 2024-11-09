'use client'

import {
  Typography,
  Tabs,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
} from 'antd'
import {
  UserOutlined,
  DollarOutlined,
  TeamOutlined,
  GiftOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const [form] = Form.useForm()

  // Fetch data
  const { data: users, refetch: refetchUsers } = Api.user.findMany.useQuery({})
  const { data: payments } = Api.payment.findMany.useQuery({})
  const { data: sponsors } = Api.sponsor.findMany.useQuery({})
  const { data: fundraisingCampaigns } =
    Api.fundraisingCampaign.findMany.useQuery({})

  // Mutations
  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: createSponsor } = Api.sponsor.create.useMutation()
  const { mutateAsync: updatePayment } = Api.payment.update.useMutation()

  const handleModalOpen = (type: string) => {
    setModalType(type)
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleModalSubmit = async (values: any) => {
    try {
      switch (modalType) {
        case 'role':
          await updateUser({
            where: { id: values.userId },
            data: { globalRole: values.role },
          })
          enqueueSnackbar('Role updated successfully', { variant: 'success' })
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
            form.setFieldsValue({ userId: record.id })
            handleModalOpen('role')
          }}
        >
          Manage Role
        </Button>
      ),
    },
  ]

  const sponsorColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Email', dataIndex: 'contactEmail', key: 'email' },
    { title: 'Amount', dataIndex: 'contributionAmount', key: 'amount' },
    { title: 'Renewal', dataIndex: 'renewalDate', key: 'renewal' },
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
                    {
                      title: 'Current',
                      dataIndex: 'currentAmount',
                      key: 'current',
                    },
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
              ? 'Update Role'
              : modalType === 'sponsor'
                ? 'Add Sponsor'
                : 'Update Payment'
          }
          open={isModalVisible}
          onOk={form.submit}
          onCancel={handleModalClose}
        >
          <Form form={form} onFinish={handleModalSubmit} layout="vertical">
            {modalType === 'role' && (
              <>
                <Form.Item name="userId" hidden>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Select.Option value="USER">User</Select.Option>
                    <Select.Option value="ADMIN">Admin</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}
            {modalType === 'sponsor' && (
              <>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[{ required: true }]}
                >
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
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true }]}
                >
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
