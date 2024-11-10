'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { CheckOutlined, CloseOutlined, DollarOutlined, InboxOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Spin, Statistic, Table, Tag, Typography, Upload } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import * as XLSX from 'xlsx'
import DuesBreakdown from './DuesBreakdown'
import MembershipDistribution from './MembershipDistribution'

const { Title, Text } = Typography

interface ParsedData {
  dues: Array<{ label: string; amount: number }>;
  membership: Array<{ type: string; count: number }>;
}

export default function BudgetDashboardPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [isLoadingGraphs, setIsLoadingGraphs] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [parsedData, setParsedData] = useState<ParsedData>({ dues: [], membership: [] })

  const isTreasurer = user?.globalRole === 'TREASURER'

  const { data: expenseRequests, refetch: refetchExpenses } = Api.expenseRequest.findMany.useQuery({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  })

  const { data: transactions } = Api.transaction.findMany.useQuery({
    orderBy: { createdAt: 'desc' },
  })

  const totalIncome = transactions?.reduce(
    (acc, curr) => (curr.type === 'INCOME' ? acc + parseFloat(curr.amount || '0') : acc),
    0,
  ) || 0

  const totalExpenses = transactions?.reduce(
    (acc, curr) => (curr.type === 'EXPENSE' ? acc + parseFloat(curr.amount || '0') : acc),
    0,
  ) || 0

  const balance = totalIncome - totalExpenses

  const handleUpload = async (file: File) => {
    setIsLoadingGraphs(true)
    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        
        // Parse Sheet1
        const sheet1 = workbook.Sheets['Sheet1']
        const sheet1Data = XLSX.utils.sheet_to_json(sheet1, { header: 'A' })
        
        // Process dues data
        const duesData = []
        for (let i = 0; i < sheet1Data.length; i++) {
          const row = sheet1Data[i] as any
          if (row.A && row.B && row.A !== 'Total' && !row.A.includes('Total')) {
            duesData.push({
              label: row.A,
              amount: parseFloat(row.B) || 0
            })
          }
        }

        // Process membership data
        const membershipData = []
        let membershipStarted = false
        for (let i = 0; i < sheet1Data.length; i++) {
          const row = sheet1Data[i] as any
          if (row.K === 'Membership Breakdown') {
            membershipStarted = true
            continue
          }
          if (membershipStarted && row.K && row.L) {
            membershipData.push({
              type: row.K,
              count: parseInt(row.L) || 0
            })
          }
        }

        setParsedData({
          dues: duesData,
          membership: membershipData
        })
        console.log(membershipData)
        enqueueSnackbar('File processed successfully', { variant: 'success' })
      }
      reader.readAsArrayBuffer(file)
    } catch (error) {
      console.error('Upload error:', error)
      enqueueSnackbar('Failed to process file', { variant: 'error' })
    } finally {
      setIsLoadingGraphs(false)
    }
  }

  const { mutateAsync: updateExpenseRequest } = Api.expenseRequest.update.useMutation()

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
      enqueueSnackbar(`Expense request ${status.toLowerCase()}`, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to process request', { variant: 'error' })
    }
  }

  function findData(key: string){
    for(let i = 0; i < parsedData.dues.length; i++) {
      if(parsedData.dues[i].label === key) return parsedData.dues[i].amount;
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
                value={findData("Amount of Money to work with")}
                prefix={<DollarOutlined />}
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Expenses"
                value={findData("Amount of Money to work with") - findData("Remainder at End")}
                prefix={<DollarOutlined />}
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Current Balance"
                value={findData("Remainder at End")}
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
              return false
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
            {isLoadingGraphs ? (
              <Card>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spin />
                  <div>Processing membership data...</div>
                </div>
              </Card>
            ) : (
              <MembershipDistribution membershipData={parsedData.membership} />
            )}
          </Col>
          <Col xs={24} md={12}>
            {isLoadingGraphs ? (
              <Card>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spin />
                  <div>Processing dues data...</div>
                </div>
              </Card>
            ) : (
              <DuesBreakdown duesData={parsedData.dues} />
            )}
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
