'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  CalendarOutlined,
  DollarOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
const { Title, Text } = Typography

export default function HomePage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  // Fetch payments
  const { data: payments } = Api.payment.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { dueDate: 'asc' },
  })

  // Fetch transactions
  const { data: transactions } = Api.transaction.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })

  // Calculate total dues
  const totalDues =
    payments?.reduce(
      (acc, payment) =>
        payment.status === 'PENDING'
          ? acc + parseFloat(payment.amount || '0')
          : acc,
      0,
    ) || 0

  const upcomingPayments = payments?.filter(
    payment =>
      payment.status === 'PENDING' && dayjs(payment.dueDate).isAfter(dayjs()),
  )

  const paymentColumns = [
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => `$${amount}`,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'PAID' ? 'success' : 'warning'}>{status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: any) =>
        record.status === 'PENDING' && (
          <Button
            type="primary"
            size="small"
            onClick={() => router.push('/payments')}
          >
            Pay Now
          </Button>
        ),
    },
  ]

  const transactionColumns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => `$${amount}`,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '16px' }}>
        <Title level={2}>Financial Summary</Title>
        <Text type="secondary">
          View your financial overview, upcoming payments, and transaction
          history
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title="Total Outstanding Dues"
                value={totalDues}
                prefix={<DollarOutlined />}
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title="Upcoming Payments"
                value={upcomingPayments?.length || 0}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card style={{ padding: 15 }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Text strong>Quick Actions</Text>
                <Button
                  type="primary"
                  icon={<DollarOutlined />}
                  onClick={() => router.push('/payments')}
                  className="w-full"
                >
                  Make a Payment
                </Button>
                <Button
                  icon={<ExclamationCircleOutlined />}
                  onClick={() => router.push('/expenses')}
                  className="w-full"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Submit Expense Request
                </Button>
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => router.push('/spreadsheet-upload')}
                  className="w-full"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Upload Spreadsheet
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: 24 }}>
          <Title level={4}>Upcoming Payments</Title>
          <Table
            dataSource={payments}
            columns={paymentColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>

        <Card style={{ marginTop: 24 }}>
          <Title level={4}>Recent Transactions</Title>
          <Table
            dataSource={transactions}
            columns={transactionColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
