import React from 'react';
import { observer } from 'mobx-react-lite';
//私有常量

//可抽离的逻辑处理函数/组件

let test = (props: IProps) => {
    //变量声明、解构
    const {} = props;
    //组件状态

    //网络IO

    //数据转换

    //逻辑处理函数

    //组件Effect

    //组件渲染
    return (
        <div>
            <Icon name="icon-ic_changdi" />
        </div>
    );
};

//props类型定义
interface IProps {}

test = observer(test);
export { test };
