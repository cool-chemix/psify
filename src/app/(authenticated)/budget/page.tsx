'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  CheckOutlined,
  CloseOutlined,
  DollarOutlined,
  InboxOutlined
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Empty,
  Row,
  Spin,
  Statistic,
  Table,
  Tag,
  Typography,
  Upload
} from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
const { Title, Text } = Typography

export default function BudgetDashboardPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [isLoadingGraphs, setIsLoadingGraphs] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [graphs, setGraphs] = useState<{
    membership_pie?: string
    dues_bar?: string
  }>({})
  const isTreasurer = user?.globalRole === 'TREASURER'

  // Fetch expense requests
  const { data: expenseRequests, refetch: refetchExpenses } =
    Api.expenseRequest.findMany.useQuery({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    })

  // Fetch transactions for financial overview
  const { data: transactions } = Api.transaction.findMany.useQuery({
    orderBy: { createdAt: 'desc' },
  })

  // Calculate financial metrics
  const totalIncome =
    transactions?.reduce(
      (acc, curr) =>
        curr.type === 'INCOME' ? acc + parseFloat(curr.amount || '0') : acc,
      0,
    ) || 0

  const totalExpenses =
    transactions?.reduce(
      (acc, curr) =>
        curr.type === 'EXPENSE' ? acc + parseFloat(curr.amount || '0') : acc,
      0,
    ) || 0

  const balance = totalIncome - totalExpenses

  const handleUpload = async (file: File) => {
    setIsLoadingGraphs(true)
    const formData = new FormData()
    formData.append('file', file)
  
    try {
      console.log('Uploading file:', file.name) // Debug log
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        // Add timeout and response type
        timeout: 30000,
        responseType: 'json'
      })
      
      if (response.data.graphs) {
        setGraphs(response.data.graphs)
        enqueueSnackbar('File uploaded successfully', { variant: 'success' })
      } else {
        throw new Error('No graphs data received')
      }
    } catch (error) {
      console.error('Upload error:', error) // Debug log
      enqueueSnackbar(error.response?.data?.error || 'Failed to upload file', { variant: 'error' })
    } finally {
      setIsLoadingGraphs(false)
    }
  }

  // Approve/Reject expense request
  const { mutateAsync: updateExpenseRequest } =
    Api.expenseRequest.update.useMutation()

  const handleExpenseAction = async (id: string, status: string) => {
    try {
      await updateExpenseRequest({
        where: { id },
        data: {
          status,
          approvedById: user?.id,
        },
      })
      await refetchExpenses()
      enqueueSnackbar(`Expense request ${status.toLowerCase()}`, {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to process request', { variant: 'error' })
    }
  }

  const expenseColumns = [
    {
      title: 'Requester',
      dataIndex: ['user', 'name'],
      key: 'requester',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => `$${amount}`,
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
      render: (status: string) => (
        <Tag
          color={
            status === 'APPROVED'
              ? 'green'
              : status === 'REJECTED'
                ? 'red'
                : 'gold'
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) =>
        record.status === 'PENDING' && isTreasurer ? (
          <Row gutter={8}>
            <Col>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleExpenseAction(record.id, 'APPROVED')}
              >
                Approve
              </Button>
            </Col>
            <Col>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => handleExpenseAction(record.id, 'REJECTED')}
              >
                Reject
              </Button>
            </Col>
          </Row>
        ) : null,
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
        <Title level={2}>Budget Dashboard</Title>
        <Text>Manage and track chapter finances in real-time</Text>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Income"
                value={totalIncome}
                prefix={<DollarOutlined />}
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Expenses"
                value={totalExpenses}
                prefix={<DollarOutlined />}
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Current Balance"
                value={balance}
                prefix={<DollarOutlined />}
                precision={2}
                valueStyle={{ color: balance >= 0 ? '#3f8600' : '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: 24 }}>
        <Upload.Dragger
  beforeUpload={(file) => {
    handleUpload(file)
    return false // Prevent default upload behavior
  }}
  accept=".xlsx,.xls"
>
  <p className="ant-upload-drag-icon">
    <InboxOutlined />
  </p>
  <p className="ant-upload-text">Click or drag Excel file to upload</p>
</Upload.Dragger>
        </Card>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} md={12}>
            <Card title="Membership Distribution">
              {isLoadingGraphs ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spin />
                  <div>Generating graph...</div>
                </div>
              ) : graphs.membership_pie ? (
                <img 
                  src={graphs.membership_pie} 
                  alt="Membership Distribution"
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                <Empty description="No data available" />
              )}
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Dues Breakdown">
              {isLoadingGraphs ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spin />
                  <div>Generating graph...</div>
                </div>
              ) : graphs.dues_bar ? (
                <img 
                  src={graphs.dues_bar} 
                  alt="Dues Breakdown"
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                <Empty description="No data available" />
              )}
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: 24 }}>
          <Title level={4}>Expense Requests</Title>
          <Table
            dataSource={expenseRequests}
            columns={expenseColumns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
