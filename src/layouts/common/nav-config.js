import React, { Fragment } from 'react';
import {
    BlockOutlined,
    UserOutlined,
    MailOutlined,
    HomeOutlined,
    BarsOutlined,
} from '@ant-design/icons';

export default [{
        name: 'Home',
        icon: <BlockOutlined />,
        path: '/',
    },
    {
        name: 'Nest',
        icon: <UserOutlined />,
        path: '/nest',
        children: [{
                name: 'Nest A',
                icon: <BarsOutlined />,
                path: '/nest/a',
            },
            {
                name: 'Nest B',
                icon: <BarsOutlined />,
                path: '/nest/b',
                children: [{
                        name: 'Page B-1',
                        icon: <BarsOutlined />,
                        path: '/nest/b/1',
                    },
                    {
                        name: 'Page B-2',
                        icon: <BarsOutlined />,
                        path: '/nest/b/2',
                    },
                ]
            },
            {
                name: 'Page C',
                icon: <BarsOutlined />,
                path: '/nest/c',
                children: [{
                        name: 'Page C-1',
                        icon: <BarsOutlined />,
                        path: '/nest/c/1',
                    },
                    {
                        name: 'Page C-2',
                        icon: <BarsOutlined />,
                        path: '/nest/c/2',
                    },
                ]
            },
            {
                name: 'Page D',
                icon: <BarsOutlined />,
                path: '/nest/d',
                children: [{
                        name: 'Page D-1',
                        icon: <BarsOutlined />,
                        path: '/nest/d/1',
                    },
                    {
                        name: 'Page D-2',
                        icon: <BarsOutlined />,
                        path: '/nest/d/2',
                    },
                    {
                        name: 'Page D-3',
                        icon: <BarsOutlined />,
                        path: '/nest/d/3',
                    },
                ]
            },
            {
                name: 'Page E',
                icon: <BarsOutlined />,
                path: '/nest/e',
            },
        ]
    },
    {
        name: 'Demo',
        icon: <MailOutlined />,
        path: '/demo',
    },
    {
        name: () => <a href="https://ant.design/" target="_blank">Antd</a>,
        icon: <MailOutlined />,
        path: 'antd',
    },
    {
        name: 'Example',
        icon: <HomeOutlined />,
        path: '/example',
        active: ['/example/:id'],
    },
]
