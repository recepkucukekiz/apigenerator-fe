'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Card, Space, Divider, Button, Modal } from 'antd';
import Link from 'next/link';

const ProjectDetailPage = ({ params }) => {
    const { id } = params;
    const [data, setData] = useState([]);
    const [modelData, setModelData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'İşlem',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => (
                <div className="flex gap-2">
                    <Button type="default" onClick={() => {
                        console.log(record)
                        setModalData(record?.properties);
                        showModal();
                    }}>
                        Detail
                    </Button>
                    <Button type="default" onClick={() => {
                        window.location.href = `/project/model/${record.id}`;
                    }}>
                        Edit
                    </Button>
                </div>
            ),
        }
    ];

    const downloadProject = () => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/projects/generate-project/' + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = (data?.name ?? "project" )+ '.zip'; // İndirilen dosyanın adını belirtin.
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
    }

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/projects/' + id, {
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

        fetch(process.env.NEXT_PUBLIC_API_URL + '/models/get-all-by-project-id/' + id, {
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
            .then((data) => {
                if (data) {
                    setModelData(data)
                }
            });

    }, [id]);

    return (
        <div>
            <Link href="/project">
                Back to projects
            </Link>

            <Button type="default" className="float-right" onClick = {downloadProject}>
                Download Project
            </Button>

            <div className='flex gap-3'>
                <Card title="Details" style={{ width: 400 }}>
                    <Space direction="vertical">
                        <p><strong>ID:</strong> {data?.id}</p>
                        <p><strong>User ID:</strong> {data?.user_id}</p>
                        <p><strong>Name:</strong> {data?.name}</p>
                        <p><strong>Description:</strong> {data?.description}</p>
                        <Divider orientation="left">Database Settings</Divider>
                        <p><strong>DB Name:</strong> {data?.database_settings?.dbName}</p>
                        <p><strong>DB Port:</strong> {data?.database_settings?.dbPort}</p>
                        <p><strong>DB User:</strong> {data?.database_settings?.dbUser}</p>
                        <p><strong>DB Server:</strong> {data?.database_settings?.dbServer}</p>
                        <p><strong>DB Dialect:</strong> {data?.database_settings?.dbDialect}</p>
                        <p><strong>DB Password:</strong> {data?.database_settings?.dbPassword}</p>
                        <Divider orientation="left">Created At</Divider>
                        <p>{data?.createdAt}</p>
                        <Divider orientation="left">Updated At</Divider>
                        <p>{data?.updatedAt}</p>
                    </Space>
                </Card>

                <Table style={{ width: 400 }} dataSource={modelData} columns={columns} />
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    {modalData?.forEach((item) => {
                        <>
                            <p>{item.name}</p>
                            <p>{item.type}</p>
                        </>
                    })}
                    {JSON.stringify(modalData)}
                </Modal>
            </div>
        </div>
    );
}

export default ProjectDetailPage;