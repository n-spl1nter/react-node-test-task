import React from 'react';
import { Button } from 'antd';
import { useSignOut } from '@/features/logout/model/use-sign-out';

export const LogoutButton = () => {
    const { mutate, isSuccess } = useSignOut();
    return (
        <Button danger type="primary" loading={isSuccess} onClick={() => mutate()}>
            Logout
        </Button>
    );
}
