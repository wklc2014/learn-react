import navConfigs from '@layouts/common/nav-config.js';

const targetNav = navConfigs.filter(v => v.path === '/nest');

export default targetNav[0].children;
