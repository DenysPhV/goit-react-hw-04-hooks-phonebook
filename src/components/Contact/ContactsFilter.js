import PropTypes from 'prop-types';
import s from './ContactsFilter.module.css';

const ContactsFilter = ({ value, onChange }) => {
  return (
    <label className={s.label}>
      Filter contacts by name
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={s.input}
      />
    </label>
  );
};

ContactsFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContactsFilter;
