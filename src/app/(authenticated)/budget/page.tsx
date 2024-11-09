'use client'

import {
  Typography,
  Card,
  Row,
  Col,
  Table,
  Button,
  Statistic,
  Modal,
  Tag,
} from 'antd'
import {
  DollarOutlined,
  CheckOutlined,
  CloseOutlined,
  FileTextOutlined,
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

export default function BudgetDashboardPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
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
          <Title level={4}>Expense Requests</Title>
          <Table
            dataSource={expenseRequests}
            columns={expenseColumns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>

        {isTreasurer && (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={{ marginTop: 24 }}
            onClick={() => router.push('/expenses')}
          >
            Manage Expense Requests
          </Button>
        )}
      </div>
    </PageLayout>
  )
}
