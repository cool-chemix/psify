'use client'

import {
  Button,
  Card,
  Col,
  Divider,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
  Form,
} from 'antd'
import {
  DollarOutlined,
  HistoryOutlined,
  PlusOutlined,
  SplitCellsOutlined,
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

export default function PaymentsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isInstallmentModalOpen, setIsInstallmentModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  // Fetch payments
  const { data: payments, refetch: refetchPayments } =
    Api.payment.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { createdAt: 'desc' },
    })

  // Fetch installment plans
  const { data: installmentPlans } = Api.installmentPlan.findMany.useQuery({
    where: { userId: user?.id },
    include: { payments: true },
  })

  // Mutations
  const { mutateAsync: createInstallmentPlan } =
    Api.installmentPlan.create.useMutation()
  const { mutateAsync: createPayment } = Api.payment.create.useMutation()
  const { mutateAsync: updatePayment } = Api.payment.update.useMutation()

  const handleCreateInstallmentPlan = async (values: any) => {
    try {
      await createInstallmentPlan({
        data: {
          totalAmount: values.totalAmount.toString(),
          numberOfInstallments: values.numberOfInstallments,
          frequency: values.frequency,
          startDate: dayjs().format('YYYY-MM-DD'),
          userId: user?.id,
        },
      })
      enqueueSnackbar('Installment plan created successfully', {
        variant: 'success',
      })
      setIsInstallmentModalOpen(false)
      refetchPayments()
    } catch (error) {
      enqueueSnackbar('Error creating installment plan', { variant: 'error' })
    }
  }

  const handleMakePayment = async (values: any) => {
    try {
      if (selectedPayment) {
        await updatePayment({
          where: { id: selectedPayment.id },
          data: { status: 'PAID', paymentMethod: values.paymentMethod },
        })
      } else {
        await createPayment({
          data: {
            amount: values.amount.toString(),
            status: 'PAID',
            type: 'DIRECT',
            paymentMethod: values.paymentMethod,
            userId: user?.id,
          },
        })
      }
      enqueueSnackbar('Payment processed successfully', { variant: 'success' })
      setIsPaymentModalOpen(false)
      setSelectedPayment(null)
      refetchPayments()
    } catch (error) {
      enqueueSnackbar('Error processing payment', { variant: 'error' })
    }
  }

  const paymentColumns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => `$${amount}`,
    },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) =>
        record.status === 'PENDING' && (
          <Button
            type="primary"
            onClick={() => {
              setSelectedPayment(record)
              setIsPaymentModalOpen(true)
            }}
          >
            Pay Now
          </Button>
        ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ padding: '24px' }}>
        <Col xs={24} lg={20}>
          <Title level={2}>Payments Management</Title>
          <Text>
            Manage your payments, installment plans, and view payment history
          </Text>

          <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
            <Col xs={24} md={8}>
              <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    block
                    onClick={() => setIsPaymentModalOpen(true)}
                  >
                    Make a Payment
                  </Button>
                  <Button
                    icon={<DollarOutlined />}
                    block
                    onClick={() => setIsInstallmentModalOpen(true)}
                  >
                    Setup Installment Plan
                  </Button>
                  <Button
                    icon={<SplitCellsOutlined />}
                    block
                    onClick={() => router.push('/events')}
                  >
                    Split Costs
                  </Button>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={16}>
              <Card
                title={
                  <>
                    <HistoryOutlined /> Payment History
                  </>
                }
              >
                <Table
                  dataSource={payments}
                  columns={paymentColumns}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Installment Plan Modal */}
      <Modal
        title="Create Installment Plan"
        open={isInstallmentModalOpen}
        onCancel={() => setIsInstallmentModalOpen(false)}
        footer={null}
      >
        <Form onFinish={handleCreateInstallmentPlan}>
          <Form.Item
            name="totalAmount"
            label="Total Amount"
            rules={[{ required: true }]}
          >
            <InputNumber prefix="$" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="numberOfInstallments"
            label="Number of Installments"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="frequency"
            label="Frequency"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="WEEKLY">Weekly</Select.Option>
              <Select.Option value="MONTHLY">Monthly</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Plan
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Payment Modal */}
      <Modal
        title={selectedPayment ? 'Process Payment' : 'Make a Payment'}
        open={isPaymentModalOpen}
        onCancel={() => {
          setIsPaymentModalOpen(false)
          setSelectedPayment(null)
        }}
        footer={null}
      >
        <Form onFinish={handleMakePayment}>
          {!selectedPayment && (
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true }]}
            >
              <InputNumber prefix="$" style={{ width: '100%' }} />
            </Form.Item>
          )}
          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="CREDIT_CARD">Credit Card</Select.Option>
              <Select.Option value="DEBIT_CARD">Debit Card</Select.Option>
              <Select.Option value="BANK_TRANSFER">Bank Transfer</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {selectedPayment ? 'Process Payment' : 'Pay Now'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
