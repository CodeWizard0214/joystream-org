import quarters23_24 from './2023-2024.json';

import playIcon from '../../assets/svg/roadmap/play.svg';
import searchIcon from '../../assets/svg/roadmap/search.svg';
import visibilityIcon from '../../assets/svg/roadmap/visibility.svg';
import creatorTokensIcon from '../../assets/svg/roadmap/creator-tokens.svg';
import contentIcon from '../../assets/svg/roadmap/content.svg';
import monitorIcon from '../../assets/svg/roadmap/monitor.svg';
import listIcon from '../../assets/svg/roadmap/list.svg';
import dollarSignIcon from '../../assets/svg/roadmap/dollar-sign.svg';
import lockIcon from '../../assets/svg/roadmap/lock.svg';
import communityIcon from '../../assets/svg/roadmap/community.svg';
import gearIcon from '../../assets/svg/roadmap/gear.svg';

export const iconMap = {
  play: playIcon,
  search: searchIcon,
  visibility: visibilityIcon,
  'creator-tokens': creatorTokensIcon,
  content: contentIcon,
  monitor: monitorIcon,
  list: listIcon,
  'dollar-sign': dollarSignIcon,
  lock: lockIcon,
  community: communityIcon,
  gear: gearIcon,
};

export default [
  { select: { title: 'Version 1', subtitle: '2023-2024 (Current)' }, name: '2023-2024', value: quarters23_24, isNewest: true  },
];
