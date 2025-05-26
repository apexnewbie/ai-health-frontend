import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, Modal, DatePicker, Typography, Tag, Space, message } from 'antd';
import { HeartOutlined, FireOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { Title, Text } = Typography;

interface ExerciseFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: ExerciseData) => void;
}

export interface ExerciseData {
  height: number;
  weight: number;
  exerciseType: string;
  duration: number;
  steps: number;
  calories: number;
  maxHeartRate?: number;
  minHeartRate?: number;
  date: string;
}

const exerciseOptions = [
  'Running',
  'Walking',
  'Swimming',
  'Cycling',
  'Basketball',
  'Football',
  'Tennis',
  'Yoga',
  'Weightlifting',
  'Dancing',
  'Hiking',
  'Other'
];

const ExerciseForm: React.FC<ExerciseFormProps> = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiStatus, setBmiStatus] = useState<string>('');
  const [bmiColor, setBmiColor] = useState<string>('');

  // Calculate BMI when height or weight changes
  const calculateBMI = () => {
    const height = form.getFieldValue('height');
    const weight = form.getFieldValue('weight');
    
    if (height && weight) {
      // BMI = weight(kg) / (height(m))²
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(1)));
      
      // Set BMI status and color
      if (bmiValue < 18.5) {
        setBmiStatus('Underweight');
        setBmiColor('#fa8c16'); // Orange for underweight
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setBmiStatus('Healthy');
        setBmiColor('#52c41a'); // Green for healthy
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setBmiStatus('Overweight');
        setBmiColor('#fa8c16'); // Orange for overweight
      } else {
        setBmiStatus('Obese');
        setBmiColor('#f5222d'); // Red for obese
      }
    } else {
      setBmi(null);
      setBmiStatus('');
      setBmiColor('');
    }
  };

  // Update BMI when form values change
  useEffect(() => {
    calculateBMI();
  }, [form.getFieldValue('height'), form.getFieldValue('weight')]);

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        // Format date to string
        const formattedValues = {
          ...values,
          date: values.date.format('YYYY-MM-DD')
        };
        
        onSubmit(formattedValues);
        form.resetFields();
      })
      .catch(errorInfo => {
        console.error('Validation failed:', errorInfo);
        // 显示表单验证错误提示
        const errorFields = errorInfo.errorFields || [];
        if (errorFields.length > 0) {
          const errorMessages = errorFields.map((field: any) => field.errors[0]).join(', ');
          message.error(`Please complete all required fields: ${errorMessages}`);
        } else {
          message.error('Please complete all required fields');
        }
      });
  };

  const handleValuesChange = () => {
    calculateBMI();
  };

  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0 }}>
          <FireOutlined style={{ marginRight: 8, color: '#fa8c16' }} />
          Record Your Exercise
        </Title>
      }
      open={visible}
      onCancel={onClose}
      width={700}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Save Exercise Record
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="exerciseForm"
        initialValues={{ date: dayjs() }}
        onValuesChange={handleValuesChange}
      >
        <div style={{ 
          padding: '16px', 
          borderRadius: '8px', 
          backgroundColor: '#f9f9f9', 
          marginBottom: '20px' 
        }}>
          <Title level={5}>Physical Information</Title>
          <Form.Item
            name="height"
            label="Height (cm)"
            rules={[{ required: true, message: 'Please enter your height' }]}
          >
            <InputNumber min={50} max={250} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="weight"
            label="Weight (kg)"
            rules={[{ required: true, message: 'Please enter your weight' }]}
          >
            <InputNumber min={20} max={200} style={{ width: '100%' }} />
          </Form.Item>

          {bmi !== null && (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <Space>
                <Text strong>BMI:</Text>
                <Text strong style={{ fontSize: '18px' }}>{bmi}</Text>
                <Tag color={bmiColor}>{bmiStatus}</Tag>
              </Space>
            </div>
          )}
        </div>

        <div style={{ 
          padding: '16px', 
          borderRadius: '8px', 
          backgroundColor: '#f9f9f9', 
          marginBottom: '20px' 
        }}>
          <Title level={5}>Exercise Details</Title>
          <Form.Item
            name="date"
            label={<span><CalendarOutlined /> Exercise Date</span>}
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="exerciseType"
            label="Exercise Type"
            rules={[{ required: true, message: 'Please select an exercise type' }]}
          >
            <Select>
              {exerciseOptions.map(exercise => (
                <Option key={exercise} value={exercise}>{exercise}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="duration"
            label="Duration (minutes)"
            rules={[{ required: true, message: 'Please enter exercise duration' }]}
          >
            <InputNumber min={1} max={1440} style={{ width: '100%' }} />
          </Form.Item>
        </div>
        
        <div style={{ 
          padding: '16px', 
          borderRadius: '8px', 
          backgroundColor: '#f9f9f9'
        }}>
          <Title level={5}>Exercise Metrics</Title>
          <Form.Item
            name="steps"
            label="Steps"
            rules={[{ required: true, message: 'Please enter steps count' }]}
          >
            <InputNumber min={0} max={100000} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="calories"
            label="Calories Burned"
            rules={[{ required: true, message: 'Please enter calories burned' }]}
          >
            <InputNumber min={0} max={10000} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="maxHeartRate"
            label={<span><HeartOutlined /> Maximum Heart Rate (bpm)</span>}
          >
            <InputNumber min={40} max={220} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="minHeartRate"
            label={<span><HeartOutlined /> Minimum Heart Rate (bpm)</span>}
          >
            <InputNumber min={30} max={200} style={{ width: '100%' }} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ExerciseForm; 