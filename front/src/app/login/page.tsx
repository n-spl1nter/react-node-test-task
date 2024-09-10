import { Input, Layout, Flex, Form, Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { LoginForm } from '@/app/login/_components/login-form';
import styles from './page.module.css';

export default function LoginPage() {
    return (
        <Layout>
            <Content>
                <div className={styles.content}>
                    <LoginForm />
                </div>
            </Content>
        </Layout>
    );
}
