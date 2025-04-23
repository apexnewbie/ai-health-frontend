import React from 'react';
import { Avatar, Card, Row, Col, Button, Statistic } from 'antd';
import { UserOutlined, AppleOutlined, FireOutlined, SmileOutlined } from '@ant-design/icons';
import DashboardLayout from '../layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const goToExercisePage = () => {
    navigate('/dashboard/exercise');
  };
  
  return (
    <div>
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <Avatar src="https://via.placeholder.com/80" size={80} style={{ marginRight: '20px' }} />
        <div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Good morning, Dr. Smith</div>
          <div style={{ color: '#888' }}>Chief Physician | Phone: 555-1234 | Community Health Center</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div>Total Consultations</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>56</div>
        </div>
        <div style={{ marginLeft: '60px', textAlign: 'right' }}>
          <div>Review Progress</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>8<span style={{ fontSize: '16px', color: '#888' }}>/24</span></div>
        </div>
      </div>
      
      <h2 style={{ marginBottom: '20px' }}>Health Management Core Modules</h2>
      
      {/* Personalized Dietary Suggestions Module */}
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
              backgroundColor: '#e6f7ff',
              color: '#1890ff',
              fontSize: 28,
              marginRight: 16
            }}>
              <AppleOutlined />
            </div>
            <span>Dietary Suggestions</span>
          </div>
        }
        style={{ marginBottom: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
        headStyle={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
      >
        <p>Powered by AI technology and external datasets, the system analyzes users' daily eating behaviors and health conditions to produce real-time, tailored nutritional designs and dietary instructions.</p>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="Daily Calorie Intake" style={{ textAlign: 'center' }}>
              <Statistic value={2100} suffix="kcal" valueStyle={{ color: '#1890ff' }} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Protein Ratio" style={{ textAlign: 'center' }}>
              <Statistic value={25} suffix="%" valueStyle={{ color: '#52c41a' }} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Nutrition Balance" style={{ textAlign: 'center' }}>
              <Statistic value={85} suffix="/100" valueStyle={{ color: '#fa8c16' }} />
            </Card>
          </Col>
        </Row>
        <Button type="primary" style={{ marginTop: 16 }}>
          Get Personalized Diet Plan
        </Button>
      </Card>
      
      {/* Customized Exercise Guidance Module */}
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
        <Button type="primary" style={{ marginTop: 16 }} onClick={goToExercisePage}>
          View Exercise Plan
        </Button>
      </Card>
      
      {/* Mental Health Support Module */}
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
              backgroundColor: '#f6ffed',
              color: '#52c41a',
              fontSize: 28,
              marginRight: 16
            }}>
              <SmileOutlined />
            </div>
            <span>Mental Health Support</span>
          </div>
        }
        style={{ marginBottom: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
        headStyle={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
      >
        <p>Through fine-tuned LLM and an immersive 3D interactive interface, the system provides immediate emotional support and mental health advice to help users relieve stress, regulate emotions, and improve overall well-being.</p>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="Emotional State" style={{ textAlign: 'center' }}>
              <Statistic value="Stable" valueStyle={{ color: '#52c41a' }} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Stress Index" style={{ textAlign: 'center' }}>
              <Statistic value={35} suffix="/100" valueStyle={{ color: '#1890ff' }} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Today's Mood" style={{ textAlign: 'center' }}>
              <Statistic value="Good" valueStyle={{ color: '#fa8c16' }} />
            </Card>
          </Col>
        </Row>
        <Button type="primary" style={{ marginTop: 16 }}>
          Start Mental Health Consultation
        </Button>
      </Card>
    </div>
  );
};

const HomeWithLayout: React.FC = () => {
  return (
    <DashboardLayout>
      <Home />
    </DashboardLayout>
  );
};

export default HomeWithLayout; 