'use client'

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Table,
  Typography,
} from 'antd'
import {
  CalendarOutlined,
  DollarOutlined,
  PlusOutlined,
  UserOutlined,
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

export default function EventsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, checkRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  // Fetch events with organizer information
  const { data: events, refetch } = Api.event.findMany.useQuery({
    include: {
      organizer: true,
      eventRegistrations: {
        include: {
          user: true,
        },
      },
    },
  })

  // Create event mutation
  const { mutateAsync: createEvent } = Api.event.create.useMutation()

  // Event registration mutations
  const { mutateAsync: createRegistration } = Api.eventRegistration.create.useMutation()
  const { mutateAsync: deleteRegistration } = Api.eventRegistration.delete.useMutation()

  const handleCreateEvent = async (values: any) => {
    try {
      await createEvent({
        data: {
          name: values.name,
          description: values.description,
          date: values.date,
          budget: values.budget.toString(),
          cost: values.cost.toString(),
          status: 'UPCOMING',
          organizerId: user?.id,
        },
      })
      enqueueSnackbar('Event created successfully!', { variant: 'success' })
      setIsModalOpen(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to create event', { variant: 'error' })
    }
  }

  const handleRegister = async (eventId: string, cost: string) => {
    try {
      await createRegistration({
        data: {
          eventId,
          userId: user?.id,
          amountPaid: cost,
        },
      })
      enqueueSnackbar('Successfully registered for event!', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to register for event', { variant: 'error' })
    }
  }

  const handleUnregister = async (eventId: string) => {
    try {
      await deleteRegistration({
        data: {
          eventId,
          userId: user?.id,
        },
      })
      enqueueSnackbar('Successfully unregistered from event!', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to unregister from event', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: string) => `$${cost}`,
    },
    {
      title: 'Organizer',
      dataIndex: 'organizer',
      key: 'organizer',
      render: (organizer: any) => organizer?.name,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => {
        const isRegistered = record.eventRegistrations?.some(
          (reg: any) => reg.userId === user?.id,
        )
        return (
          <Button
            type={isRegistered ? 'default' : 'primary'}
            onClick={() => 
              isRegistered 
                ? handleUnregister(record.id)
                : handleRegister(record.id, record.cost)
            }
            style={
              isRegistered 
                ? {
                    backgroundColor: 'white',
                    color: 'red',
                    borderColor: 'red'
                  }
                : {}
            }
          >
            {isRegistered ? 'Unregister' : 'Register'}
          </Button>
        )
      },
    },
  ]

  const profitabilityColumns = [
    {
      title: 'Event Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget: string) => `$${budget}`,
    },
    {
      title: 'Total Revenue',
      key: 'revenue',
      render: (record: any) => {
        const revenue = record.eventRegistrations?.reduce(
          (acc: number, reg: any) => acc + Number(reg.amountPaid || 0),
          0,
        )
        return `$${revenue}`
      },
    },
    {
      title: 'Profit/Loss',
      key: 'profit',
      render: (record: any) => {
        const revenue = record.eventRegistrations?.reduce(
          (acc: number, reg: any) => acc + Number(reg.amountPaid || 0),
          0,
        )
        const profit = revenue - Number(record.budget || 0)
        return <Text type={profit >= 0 ? 'success' : 'danger'}>${profit}</Text>
      },
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ padding: '24px' }}>
        <Col span={24}>
          <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
            <Title level={2}>Events Management</Title>
            {checkRole('ORGANIZER') && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                Create Event
              </Button>
            )}
          </Row>

          <Card title="Upcoming Events" style={{ marginBottom: 24 }}>
            <Table
              dataSource={events}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>

          {checkRole('TREASURER') && (
            <Card title="Event Profitability">
              <Table
                dataSource={events}
                columns={profitabilityColumns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </Card>
          )}
        </Col>
      </Row>

      <Modal
        title="Create New Event"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateEvent} layout="vertical">
          <Form.Item name="name" label="Event Name" rules={[{ required: true }]}>
            <Input prefix={<CalendarOutlined />} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="budget" label="Budget" rules={[{ required: true }]}>
            <InputNumber prefix={<DollarOutlined />} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="cost" label="Registration Cost" rules={[{ required: true }]}>
            <InputNumber prefix={<DollarOutlined />} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Event
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}