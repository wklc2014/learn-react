import React, { Fragment } from 'react';
import {
    BlockOutlined,
    UserOutlined,
    MailOutlined,
    HomeOutlined,
    BarsOutlined,
} from '@ant-design/icons';

export default [{
        id: 'home',
        name: 'Home',
        icon: <BlockOutlined />,
        path: '/',
    },
    {
        id: 'nest',
        name: 'Nest',
        icon: <UserOutlined />,
        path: '/nest',
        children: [{
                id: 'nest-a',
                name: 'Nest A',
                icon: <BarsOutlined />,
                path: '/nest/a',
            },
            {
                id: 'nest-b',
                name: 'Nest B',
                icon: <BarsOutlined />,
                path: '/nest/b',
                children: [{
                        id: 'nest-b-1',
                        name: 'Page B-1',
                        icon: <BarsOutlined />,
                        path: '/nest/b/1',
                    },
                    {
                        id: 'nest-b-2',
                        name: 'Page B-2',
                        icon: <BarsOutlined />,
                        path: '/nest/b/2',
                    },
                ]
            },
            {
                id: 'nest-c',
                name: 'Page C',
                icon: <BarsOutlined />,
                path: '/nest/c',
                children: [{
                        id: 'nest-c-1',
                        name: 'Page C-1',
                        icon: <BarsOutlined />,
                        path: '/nest/c/c-1',
                    },
                    {
                        id: 'nest-c-2',
                        name: 'Page C-2',
                        icon: <BarsOutlined />,
                        path: '/nest/c/c-2',
                    },
                ]
            },
            {
                id: 'nest-d',
                name: 'Page D',
                icon: <BarsOutlined />,
                path: '/nest/d',
                children: [{
                        id: 'nest-d-1',
                        name: 'Page D-1',
                        icon: <BarsOutlined />,
                        path: '/nest/d/1',
                    },
                    {
                        id: 'nest-d-2',
                        name: 'Page D-2',
                        icon: <BarsOutlined />,
                        path: '/nest/d/2',
                    },
                    {
                        id: 'nest-d-3',
                        name: 'Page D-3',
                        icon: <BarsOutlined />,
                        path: '/nest/d/3',
                    },
                ]
            },
            {
                id: 'nest-e',
                name: 'Page E',
                icon: <BarsOutlined />,
                path: '/nest/e',
            },
        ]
    },
    {
        id: 'demo',
        name: 'Demo',
        icon: <MailOutlined />,
        path: '/demo',
    },
    {
        id: 'example',
        name: 'Example',
        icon: <HomeOutlined />,
        path: '/example',
        active: ['/example/:id'],
    },
]
