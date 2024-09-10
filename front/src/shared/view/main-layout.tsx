import React from 'react';
import { Layout } from 'antd';
import { Header, Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { LogoutButton } from '@/features/logout/view/logout-button';
import styles from './main-layout.module.css';

type Props = {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.userInfo}>
                    <LogoutButton />
                </div>
            </Header>
            <Layout>
                <Sider>
                    sider
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
