/*
 * Custom babelrc made possible by react-app-rewired & customize-cra
 * Needed for performance improvement for mui in dev environment
 */
/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc, override } = require('customize-cra');

module.exports = override(useBabelRc());
