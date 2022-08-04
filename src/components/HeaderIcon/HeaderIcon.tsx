import { Platform } from 'react-native';
import { HeaderButton, HeaderButtonProps } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import { Theme } from '../../constants/theme';

export default function HeaderIcon(props: HeaderButtonProps) {
  const {
    title = '',
    iconSize = 24,
    color = Platform.OS === 'android' ? '#FFF' : Theme.MAIN_COlOR,
    IconComponent = Ionicons,
    ...restProps
  } = props;

  return (
      <HeaderButton
          title={title}
          iconSize={iconSize}
          color={color}
          IconComponent={IconComponent}
          {...restProps}
      />
  );
}
