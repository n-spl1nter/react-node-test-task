import React from 'react';
import { Table, TableProps } from 'antd';
import { Transaction } from '@/shared/types/transaction';
import { useTransactionsQuery } from '@/features/transactions/model/use-transactions-query';

const columns: TableProps<Transaction>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Value',
        dataIndex: 'value',
    },
    {
        title: 'Created at',
        dataIndex: 'createdAt',
        render: (value) => new Intl.DateTimeFormat('en-US', {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
        }).format(new Date(value)),
    }
];

export const TransactionsList = () => {
    const { data, isError, isLoading } = useTransactionsQuery();
    return (
        <Table
            columns={columns}
            loading={isLoading}
            dataSource={data}
            rowKey={record => record.id}
        />
    );
}
