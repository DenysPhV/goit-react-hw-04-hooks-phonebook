import PropTypes from 'prop-types';

import s from './Section.module.css';

const Section = ({ title, children }) => (
  <div className={s.container}>
    <h2 className={s.title}>{title}</h2>
    {children}
  </div>
);

Section.propTypes = {
  children: PropTypes.node,
};

export default Section;
