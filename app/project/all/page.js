'use client';

import React from 'react';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'İşlem',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => (
            <span>
                <Link href={`/project/${record.id}`}>
                    Detay
                </Link>
            </span>
        ),
    }
];

const AllProjectPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/projects', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response;
        })
            .then((response) => response.json())
            .then((data) => setData(data));

    }, []);

    return (
        <div>
            <Link href="/project/create">
                Create Project
            </Link>
            <Table dataSource={data} columns={columns} />
        </div>
    );
}


export default AllProjectPage;