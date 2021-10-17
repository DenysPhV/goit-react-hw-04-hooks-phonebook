import PropTypes from 'prop-types';
import s from './Contact.module.css';

const Contact = ({ contacts, onDelete }) => {
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          <span className={s.text}>{name}:</span>
          <span className={s.text}>{number}</span>

          <button
            onClick={() => {
              onDelete(id);
            }}
            type="button"
            className={s.button}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

Contact.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Contact;
