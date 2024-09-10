'use client'
import React, { useEffect } from 'react';
import { Input, Form, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import InputPassword from 'antd/lib/input/Password';
import Title from 'antd/lib/typography/Title';
import { useSignInMutation } from '@/app/login/_queries/use-sign-in-mutation';
import { routes } from '@/shared/routes';
import { useRouter } from 'next/navigation';

type LoginFormValues = {
    password: string;
    email: string;
};

export const LoginForm = () => {
    const router = useRouter();
    const { mutate, isSuccess, isError, isLoading } = useSignInMutation();
    const onSubmit = (values: LoginFormValues) => {
        mutate(values);
    };

    useEffect(() => {
        if (isSuccess) {
            router.push(routes.home);
        }
    }, [isSuccess]);

    return (
        <Form<LoginFormValues>
            name="loginForm"
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, width: '100%' }}
            autoComplete="off"
            onFinish={onSubmit}
        >
            <Title level={3} style={{ textAlign: 'center' }}>Sign In</Title>
            <FormItem
                labelCol={{ span: 8 }}
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input type="email" />
            </FormItem>
            <FormItem
                labelCol={{ span: 8 }}
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <InputPassword />
            </FormItem>
            <FormItem wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </FormItem>
        </Form>
    );
}
