import React from 'react';
import { Card, Row, Col, Statistic, Button, Space } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import DashboardLayout from '../layouts/DashboardLayout';
import ExerciseAIChatBox from '../components/ExerciseAIChatBox';

const ExercisePage: React.FC = () => {
  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Exercise Guidance</h2>
      
      {/* Exercise Overview */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff7e6',
              color: '#fa8c16',
              fontSize: 28,
              marginRight: 16
            }}>
              <FireOutlined />
            </div>
            <span>Customized Exercise Guidance</span>
          </div>
        }
        style={{ marginBottom: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
        headStyle={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
      >
        <p>The system develops scientifically sound fitness plans based on users' exercise data and physical characteristics. It provides daily exercise amounts and summarizes weekly progress based on user feedback and data analysis for continuous improvement.</p>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="Daily Steps Goal" style={{ textAlign: 'center' }}>
              <Statistic value={10000} suffix="steps" valueStyle={{ color: '#fa8c16' }} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Weekly Aerobic Exercise" style={{ textAlign: 'center' }}>
              <Statistic value={150} suffix="min" valueStyle={{ color: '#1890ff' }} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Completion Rate" style={{ textAlign: 'center' }}>
              <Statistic value={78} suffix="%" valueStyle={{ color: '#52c41a' }} />
            </Card>
          </Col>
        </Row>
        
        <Space direction="vertical" size="large" style={{ width: '100%', marginTop: 16 }}>
          <Button type="primary" style={{ marginBottom: 16 }}>
            View Detailed Exercise Plan
          </Button>
          
          {/* AI Exercise ChatBox */}
          <div style={{ height: '700px' }}>
            <ExerciseAIChatBox />
          </div>
        </Space>
      </Card>
    </div>
  );
};

const ExerciseWithLayout: React.FC = () => {
  return (
    <DashboardLayout>
      <ExercisePage />
    </DashboardLayout>
  );
};

export default ExerciseWithLayout; 