import { v4 as uuidv4 } from 'uuid';

import { EngineComponentType } from '../types';

// 根据类型获取组件
export const getComponentByType = (type: EngineComponentType): string => {
  switch (type) {
    case EngineComponentType.Button:
      return 'Button';
    case EngineComponentType.Employee:
      return 'Employee';
    default:
      return '';
  }
};

// 根据组件获取组件类型
export const getTypeByComponent = (component: string): EngineComponentType => {
  switch (component) {
    case 'Button':
      return EngineComponentType.Button;
    case 'Employee':
      return EngineComponentType.Employee;
    default:
      return -1;
  }
};

// 获取随机字符串
export const getUniqueId = (): string => {
  return uuidv4();
};
