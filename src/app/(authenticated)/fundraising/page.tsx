'use client'

import {
  Typography,
  Card,
  Button,
  Row,
  Col,
  Progress,
  Modal,
  Form,
  Input,
  InputNumber,
} from 'antd'
import {
  PlusOutlined,
  DollarOutlined,
  TeamOutlined,
  CalendarOutlined,
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

export default function FundraisingPage() {
  const router = useRouter()
  const {
    user,
  }: {
    user: {
      id: string
      name: string
      email: string
      checkRole: (roleName: string) => boolean
    }
  } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [contributionModal, setContributionModal] = useState<{
    visible: boolean
    campaignId: string
  }>({
    visible: false,
    campaignId: '',
  })
  const [form] = Form.useForm()
  const [contributionForm] = Form.useForm()

  const { data: campaigns, refetch } =
    Api.fundraisingCampaign.findMany.useQuery({
      orderBy: { createdAt: 'desc' },
    })

  const { mutateAsync: createCampaign } =
    Api.fundraisingCampaign.create.useMutation()
  const { mutateAsync: updateCampaign } =
    Api.fundraisingCampaign.update.useMutation()

  const handleCreateCampaign = async (values: any) => {
    try {
      await createCampaign({
        data: {
          name: values.name,
          description: values.description,
          goal: values.goal.toString(),
          currentAmount: '0',
          startDate: values.startDate,
          endDate: values.endDate,
          status: 'ACTIVE',
        },
      })
      enqueueSnackbar('Campaign created successfully!', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Error creating campaign', { variant: 'error' })
    }
  }

  const handleContribution = async (values: any) => {
    try {
      const campaign = campaigns?.find(
        c => c.id === contributionModal.campaignId,
      )
      if (campaign) {
        const newAmount = (
          parseFloat(campaign.currentAmount) + values.amount
        ).toString()
        await updateCampaign({
          where: { id: contributionModal.campaignId },
          data: { currentAmount: newAmount },
        })
        enqueueSnackbar('Contribution successful!', { variant: 'success' })
        setContributionModal({ visible: false, campaignId: '' })
        contributionForm.resetFields()
        refetch()
      }
    } catch (error) {
      enqueueSnackbar('Error processing contribution', { variant: 'error' })
    }
  }

  const isTreasurer = user?.checkRole('TREASURER')

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div
          style={{
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Title level={2}>Fundraising Campaigns</Title>
            <Text>
              Support our community by contributing to active fundraising
              campaigns
            </Text>
          </div>
          {isTreasurer && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              Create Campaign
            </Button>
          )}
        </div>

        <Row gutter={[16, 16]}>
          {campaigns?.map(campaign => (
            <Col xs={24} sm={12} lg={8} key={campaign.id}>
              <Card
                title={campaign.name}
                extra={
                  <Button
                    type="primary"
                    onClick={() =>
                      setContributionModal({
                        visible: true,
                        campaignId: campaign.id,
                      })
                    }
                  >
                    Contribute
                  </Button>
                }
              >
                <Text>{campaign.description}</Text>
                <div style={{ marginTop: 16 }}>
                  <Progress
                    percent={Math.min(
                      (parseFloat(campaign.currentAmount) /
                        parseFloat(campaign.goal || '1')) *
                        100,
                      100,
                    )}
                    status="active"
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 8,
                    }}
                  >
                    <Text>
                      <DollarOutlined /> ${campaign.currentAmount} raised
                    </Text>
                    <Text>
                      <DollarOutlined /> ${campaign.goal} goal
                    </Text>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <Text>
                      <CalendarOutlined />{' '}
                      {dayjs(campaign.startDate).format('MMM D, YYYY')} -{' '}
                      {dayjs(campaign.endDate).format('MMM D, YYYY')}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          title="Create New Campaign"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateCampaign} layout="vertical">
            <Form.Item
              name="name"
              label="Campaign Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="goal"
              label="Goal Amount ($)"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[{ required: true }]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="End Date"
              rules={[{ required: true }]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Campaign
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Make a Contribution"
          open={contributionModal.visible}
          onCancel={() =>
            setContributionModal({ visible: false, campaignId: '' })
          }
          footer={null}
        >
          <Form
            form={contributionForm}
            onFinish={handleContribution}
            layout="vertical"
          >
            <Form.Item
              name="amount"
              label="Contribution Amount ($)"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Contribute
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
