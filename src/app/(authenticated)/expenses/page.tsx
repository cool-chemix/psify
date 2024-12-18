'use client'

import { useUserContext } from '@/core/context'
import { useUploadPublic } from '@/core/hooks/upload'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  DollarOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
  Upload,
} from 'antd'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
const { Title, Text } = Typography

export default function ExpenseRequestsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, checkRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [showForm, setShowForm] = useState(false)
  const { mutateAsync: upload } = useUploadPublic()

  const { data: expenseRequests, refetch } =
    Api.expenseRequest.findMany.useQuery({
      include: {
        user: true,
        approvedBy: true,
      },
    })

  const { mutateAsync: createExpenseRequest } =
    Api.expenseRequest.create.useMutation()
  const { mutateAsync: updateExpenseRequest } =
    Api.expenseRequest.update.useMutation()
  const { mutateAsync: deleteExpenseRequest } =
    Api.expenseRequest.delete.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      let receiptUrl = ''
      if (values.receipt?.file) {
        const result = await upload({ file: values.receipt.file })
        receiptUrl = result.url
      }

      await createExpenseRequest({
        data: {
          amount: values.amount.toString(),
          description: values.description,
          category: values.category,
          receiptUrl,
          status: 'PENDING',
          userId: user?.id,
        },
      })

      enqueueSnackbar('Expense request submitted successfully', {
        variant: 'success',
      })
      form.resetFields()
      setShowForm(false)
      refetch()
    } catch (error) {
      enqueueSnackbar('Error submitting expense request', { variant: 'error' })
    }
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateExpenseRequest({
        where: { id },
        data: {
          status,
          approvedById: user?.id,
        },
      })
      enqueueSnackbar(`Expense request ${status.toLowerCase()}`, {
        variant: 'success',
      })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error updating expense request', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteExpenseRequest({
        where: { id },
      })
      enqueueSnackbar('Expense request removed successfully', {
        variant: 'success',
      })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error removing expense request', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => <Text strong>${amount}</Text>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusColors = {
          PENDING: '#faad14',
          APPROVED: '#52c41a',
          REJECTED: '#f5222d',
          COMPLETED: '#1890ff',
          'Under Review': '#faad14'
        }
        return <Text style={{ color: statusColors[status as keyof typeof statusColors] }}>{status}</Text>
      }
    },
    {
      title: 'Receipt',
      dataIndex: 'receiptUrl',
      key: 'receiptUrl',
      render: (url: string) =>
        url && (
          <Button type="link" href={url} target="_blank" rel="noopener noreferrer">
            View Receipt
          </Button>
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          {checkRole('treasurer') && record.status === 'PENDING' && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleStatusUpdate(record.id, 'APPROVED')}
              >
                Approve
              </Button>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => handleStatusUpdate(record.id, 'REJECTED')}
              >
                Reject
              </Button>
            </>
          )}
          <Popconfirm
            title="Are you sure you want to remove this expense request?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger 
              type="text"
              icon={<DeleteOutlined />}
            >
              Remove
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div style={{ textAlign: 'center', marginTop: 32, marginBottom: 24 }}>
          <Title level={2}>Expense Requests</Title>
          <Text>Submit and manage expense requests</Text>
        </div>

        {!showForm && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowForm(true)}
            style={{ marginBottom: 16 }}
          >
            New Expense Request
          </Button>
        )}

        {showForm && (
          <Card title="Submit Expense Request">
            <Form form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: 'Please enter amount' }]}
              >
                <InputNumber
                  prefix={<DollarOutlined />}
                  style={{ width: '100%' }}
                  min={0}
                  step={0.01}
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: 'Please enter description' },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select>
                  <Select.Option value="TRAVEL">Travel</Select.Option>
                  <Select.Option value="EVENT">Event</Select.Option>
                  <Select.Option value="MARKETING">Marketing</Select.Option>
                  <Select.Option value="RENTAL">Rental</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="receipt"
                label="Receipt"
                rules={[{ required: true, message: 'Please upload receipt' }]}
              >
                <Upload beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Receipt</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button onClick={() => setShowForm(false)}>Cancel</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        )}

        <Table
          columns={columns}
          dataSource={expenseRequests}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Space>
    </PageLayout>
  )
}