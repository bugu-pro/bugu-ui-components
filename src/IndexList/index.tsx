import React from 'react';
import { Spin, Table } from 'antd';

export interface InsideListProps {
    list: any[];
    history: any;
    scroll?: any;
    total: number;
    location: any;
    columns: any[];
    rowKey?: string;
    loading: boolean;
    rowSelection?: any;
    scrollHeight?: number;
    pagination?: any;
    otherProps?: any;
}

const InsideList: React.FC<InsideListProps> = (props) => {
    const {
        total = 0,
        otherProps = {},
        pagination = {},
        rowKey,
        history,
        rowSelection,
        scroll = {},
        scrollHeight,
        columns,
        list = [],
        loading,
        location,
    } = props;
    const { query, pathname } = location;

    const p: number = Number(query.p) || 1;
    const s: number = Number(query.s) || 30;

    let _columns = [];

    const paginationPosition: any = 'bottomCenter';

    const onPageChange = (p: number, s?: number | undefined) => {
        if ((!query.s && s !== 30) || (query.s && Number(query.s) !== s)) {
            p = 1;
        }
        history.replace({
            pathname,
            query: {
                ...query,
                p,
                s,
            },
        });
    };

    if (columns && columns.length) {
        _columns = columns.map((it) => ({
            ...it,
            align: it.align || 'center',
        }));
    }

    const tableProps = {
        rowSelection,
        bordered: true,
        columns: _columns,
        rowKey: rowKey || 'id',
        dataSource: list || [],
        scroll: { ...scroll, y: scrollHeight || window.innerHeight - 120 },
        pagination: {
            total,
            current: p,
            pageSize: s,
            // onShowSizeChange,
            showSizeChanger: true,
            hideOnSinglePage: true,
            onChange: onPageChange,
            position: [paginationPosition],
            pageSizeOptions: ['10', '30', '50', '100'],
            ...pagination,
        },
        ...otherProps,
    };

    return (
        <Spin spinning={!!loading}>
            <section>
                {props.children}
                <Table {...tableProps} />
            </section>
        </Spin>
    );
};

export default InsideList;
