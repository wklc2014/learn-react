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
    },
    {
        id: 'nest',
        name: 'Nest',
        icon: <UserOutlined />,
        children: [{
                id: 'nest-a',
                name: 'Nest A',
                icon: <BarsOutlined />,
            },
            {
                id: 'nest-b',
                name: 'Nest B',
                icon: <BarsOutlined />,
                children: [{
                        id: 'nest-b-1',
                        name: 'Page B-1',
                        icon: <BarsOutlined />,
                    },
                    {
                        id: 'nest-b-2',
                        name: 'Page B-2',
                        icon: <BarsOutlined />,
                    },
                ]
            },
            {
                id: 'nest-c',
                name: 'Page C',
                icon: <BarsOutlined />,
                children: [{
                        id: 'nest-c-1',
                        name: 'Page C-1',
                        icon: <BarsOutlined />,
                    },
                    {
                        id: 'nest-c-2',
                        name: 'Page C-2',
                        icon: <BarsOutlined />,
                    },
                ]
            },
            {
                id: 'nest-d',
                name: 'Page D',
                icon: <BarsOutlined />,
                children: [{
                        id: 'nest-d-1',
                        name: 'Page D-1',
                        icon: <BarsOutlined />,
                    },
                    {
                        id: 'nest-d-2',
                        name: 'Page D-2',
                        icon: <BarsOutlined />,
                    },
                    {
                        id: 'nest-d-3',
                        name: 'Page D-3',
                        icon: <BarsOutlined />,
                    },
                ]
            },
            {
                id: 'nest-e',
                name: 'Page E',
                icon: <BarsOutlined />,
            },
        ]
    },
    {
        id: 'demo',
        name: 'Demo',
        icon: <MailOutlined />,
    },
    {
        id: 'example',
        name: 'Example',
        icon: <HomeOutlined />,
        children: [{
            id: 'example-a',
            name: 'Example A',
            icon: <BarsOutlined />,
            children: [{
                id: 'example-a-1',
                name: 'Page A-1',
                icon: <BarsOutlined />,
            }, {
                id: 'example-a-2',
                name: 'Page A-2',
                icon: <BarsOutlined />,
            }]
        }, {
            id: 'example-B',
            name: 'Example B',
            icon: <BarsOutlined />,
            children: [{
                id: 'example-b-1',
                name: 'Page B-1',
                icon: <BarsOutlined />,
            }, {
                id: 'example-b-2',
                name: 'Page B-2',
                icon: <BarsOutlined />,
            }]
        }]
    },
]
